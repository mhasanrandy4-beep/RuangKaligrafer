// Reference: blueprint:javascript_log_in_with_replit
import {
  users,
  submissions,
  creditTransactions,
  videos,
  type User,
  type UpsertUser,
  type Submission,
  type InsertSubmission,
  type CreditTransaction,
  type InsertCreditTransaction,
  type Video,
  type InsertVideo,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations (IMPORTANT: mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // User management
  updateUserRole(userId: string, role: "student" | "tutor" | "admin"): Promise<User>;
  updateUserCredits(userId: string, credits: number): Promise<User>;
  updateUserPoints(userId: string, points: number): Promise<User>;
  updateTutorStatus(userId: string, status: "pending" | "approved" | "rejected"): Promise<User>;
  getPendingTutors(): Promise<User[]>;
  getLeaderboard(limit: number): Promise<User[]>;
  
  // Submission operations
  createSubmission(submission: InsertSubmission): Promise<Submission>;
  getSubmission(id: string): Promise<Submission | undefined>;
  getSubmissionsByStudent(studentId: string): Promise<Submission[]>;
  getSubmissionsByTutor(tutorId: string): Promise<Submission[]>;
  getPendingSubmissions(): Promise<Submission[]>;
  updateSubmission(id: string, data: Partial<Submission>): Promise<Submission>;
  
  // Credit transaction operations
  createCreditTransaction(transaction: InsertCreditTransaction): Promise<CreditTransaction>;
  getCreditTransactionsByUser(userId: string): Promise<CreditTransaction[]>;
  
  // Video operations
  createVideo(video: InsertVideo): Promise<Video>;
  getAllVideos(): Promise<Video[]>;
  getVideo(id: string): Promise<Video | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations (IMPORTANT: mandatory for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // User management
  async updateUserRole(userId: string, role: "student" | "tutor" | "admin"): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ role, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserCredits(userId: string, credits: number): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ credits, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserPoints(userId: string, points: number): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ points, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateTutorStatus(userId: string, status: "pending" | "approved" | "rejected"): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ tutorStatus: status, updatedAt: new Date() })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async getPendingTutors(): Promise<User[]> {
    return db
      .select()
      .from(users)
      .where(and(eq(users.role, "tutor"), eq(users.tutorStatus, "pending")));
  }

  async getLeaderboard(limit: number = 10): Promise<User[]> {
    return db
      .select()
      .from(users)
      .where(eq(users.role, "student"))
      .orderBy(desc(users.points))
      .limit(limit);
  }

  // Submission operations
  async createSubmission(submission: InsertSubmission): Promise<Submission> {
    const [newSubmission] = await db
      .insert(submissions)
      .values(submission)
      .returning();
    return newSubmission;
  }

  async getSubmission(id: string): Promise<Submission | undefined> {
    const [submission] = await db
      .select()
      .from(submissions)
      .where(eq(submissions.id, id));
    return submission;
  }

  async getSubmissionsByStudent(studentId: string): Promise<Submission[]> {
    return db
      .select()
      .from(submissions)
      .where(eq(submissions.studentId, studentId))
      .orderBy(desc(submissions.createdAt));
  }

  async getSubmissionsByTutor(tutorId: string): Promise<Submission[]> {
    return db
      .select()
      .from(submissions)
      .where(eq(submissions.tutorId, tutorId))
      .orderBy(desc(submissions.createdAt));
  }

  async getPendingSubmissions(): Promise<Submission[]> {
    return db
      .select()
      .from(submissions)
      .where(eq(submissions.status, "pending"))
      .orderBy(desc(submissions.createdAt));
  }

  async updateSubmission(id: string, data: Partial<Submission>): Promise<Submission> {
    const [submission] = await db
      .update(submissions)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(submissions.id, id))
      .returning();
    return submission;
  }

  // Credit transaction operations
  async createCreditTransaction(transaction: InsertCreditTransaction): Promise<CreditTransaction> {
    const [newTransaction] = await db
      .insert(creditTransactions)
      .values(transaction)
      .returning();
    return newTransaction;
  }

  async getCreditTransactionsByUser(userId: string): Promise<CreditTransaction[]> {
    return db
      .select()
      .from(creditTransactions)
      .where(eq(creditTransactions.userId, userId))
      .orderBy(desc(creditTransactions.createdAt));
  }

  // Video operations
  async createVideo(video: InsertVideo): Promise<Video> {
    const [newVideo] = await db
      .insert(videos)
      .values(video)
      .returning();
    return newVideo;
  }

  async getAllVideos(): Promise<Video[]> {
    return db
      .select()
      .from(videos)
      .orderBy(videos.order);
  }

  async getVideo(id: string): Promise<Video | undefined> {
    const [video] = await db
      .select()
      .from(videos)
      .where(eq(videos.id, id));
    return video;
  }
}

export const storage = new DatabaseStorage();
