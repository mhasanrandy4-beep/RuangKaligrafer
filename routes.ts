// Reference: blueprint:javascript_log_in_with_replit
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes (Reference: blueprint:javascript_log_in_with_replit)
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // User management routes
  app.post('/api/users/apply-tutor', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { specialization, experience, phone } = req.body;
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedUser = await storage.upsertUser({
        ...user,
        role: "tutor",
        tutorStatus: "pending",
        tutorSpecialization: specialization,
        tutorExperience: experience,
        tutorPhone: phone,
      });

      res.json(updatedUser);
    } catch (error) {
      console.error("Error applying as tutor:", error);
      res.status(500).json({ message: "Failed to apply as tutor" });
    }
  });

  app.get('/api/users/leaderboard', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const leaderboard = await storage.getLeaderboard(limit);
      res.json(leaderboard);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      res.status(500).json({ message: "Failed to fetch leaderboard" });
    }
  });

  // Admin routes - tutor verification
  app.get('/api/admin/pending-tutors', isAuthenticated, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.claims.sub);
      if (user?.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
      }

      const pendingTutors = await storage.getPendingTutors();
      res.json(pendingTutors);
    } catch (error) {
      console.error("Error fetching pending tutors:", error);
      res.status(500).json({ message: "Failed to fetch pending tutors" });
    }
  });

  app.post('/api/admin/verify-tutor', isAuthenticated, async (req: any, res) => {
    try {
      const adminUser = await storage.getUser(req.user.claims.sub);
      if (adminUser?.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
      }

      const { tutorId, status } = req.body;
      const updatedTutor = await storage.updateTutorStatus(tutorId, status);
      res.json(updatedTutor);
    } catch (error) {
      console.error("Error verifying tutor:", error);
      res.status(500).json({ message: "Failed to verify tutor" });
    }
  });

  // Submission routes
  app.post('/api/submissions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.credits < 5) {
        return res.status(400).json({ message: "Insufficient credits" });
      }

      const { tutorId, imageUrl } = req.body;

      // Create submission
      const submission = await storage.createSubmission({
        studentId: userId,
        tutorId,
        imageUrl,
        status: "pending",
      });

      // Deduct credits
      await storage.updateUserCredits(userId, user.credits - 5);

      // Create credit transaction
      await storage.createCreditTransaction({
        userId,
        amount: -5,
        type: "submission",
        description: "Submit hasil latihan",
      });

      res.json(submission);
    } catch (error) {
      console.error("Error creating submission:", error);
      res.status(500).json({ message: "Failed to create submission" });
    }
  });

  app.get('/api/submissions/student', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const submissions = await storage.getSubmissionsByStudent(userId);
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching student submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  app.get('/api/submissions/tutor', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== "tutor") {
        return res.status(403).json({ message: "Forbidden: Tutor access required" });
      }

      const submissions = await storage.getSubmissionsByTutor(userId);
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching tutor submissions:", error);
      res.status(500).json({ message: "Failed to fetch submissions" });
    }
  });

  app.patch('/api/submissions/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (user?.role !== "tutor") {
        return res.status(403).json({ message: "Forbidden: Tutor access required" });
      }

      const { id } = req.params;
      const { correctedImageUrl, score, feedback } = req.body;

      const submission = await storage.updateSubmission(id, {
        correctedImageUrl,
        score,
        feedback,
        status: "completed",
      });

      // Award points to student
      if (score) {
        const student = await storage.getUser(submission.studentId);
        if (student) {
          await storage.updateUserPoints(submission.studentId, student.points + score);
        }
      }

      res.json(submission);
    } catch (error) {
      console.error("Error updating submission:", error);
      res.status(500).json({ message: "Failed to update submission" });
    }
  });

  // Credit transaction routes
  app.get('/api/credits/transactions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const transactions = await storage.getCreditTransactionsByUser(userId);
      res.json(transactions);
    } catch (error) {
      console.error("Error fetching credit transactions:", error);
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  // Video routes
  app.get('/api/videos', async (req, res) => {
    try {
      const videos = await storage.getAllVideos();
      res.json(videos);
    } catch (error) {
      console.error("Error fetching videos:", error);
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
