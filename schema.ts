// Reference: blueprint:javascript_log_in_with_replit
import { sql } from 'drizzle-orm';
import {
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (IMPORTANT: mandatory for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User role enum
export const userRoleEnum = pgEnum("user_role", ["student", "tutor", "admin"]);
export const tutorStatusEnum = pgEnum("tutor_status", ["pending", "approved", "rejected"]);
export const submissionStatusEnum = pgEnum("submission_status", ["pending", "in_review", "completed"]);

// Users table (IMPORTANT: mandatory for Replit Auth, keep id default config)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: userRoleEnum("role").notNull().default("student"),
  credits: integer("credits").notNull().default(30), // 30 kredit gratis untuk siswa baru
  points: integer("points").notNull().default(0), // untuk leaderboard
  tutorStatus: tutorStatusEnum("tutor_status"), // hanya untuk role tutor
  tutorSpecialization: varchar("tutor_specialization"),
  tutorExperience: text("tutor_experience"),
  tutorPhone: varchar("tutor_phone"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Submissions table - untuk hasil latihan siswa
export const submissions = pgTable("submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").notNull().references(() => users.id),
  tutorId: varchar("tutor_id").references(() => users.id),
  imageUrl: text("image_url").notNull(),
  correctedImageUrl: text("corrected_image_url"),
  status: submissionStatusEnum("status").notNull().default("pending"),
  score: integer("score"),
  feedback: text("feedback"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSubmissionSchema = createInsertSchema(submissions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type Submission = typeof submissions.$inferSelect;

// Credit transactions table - untuk tracking pembelian dan penggunaan kredit
export const creditTransactions = pgTable("credit_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  amount: integer("amount").notNull(), // positif untuk pembelian, negatif untuk penggunaan
  type: varchar("type").notNull(), // "purchase", "submission", "bonus"
  description: text("description"),
  stripePaymentId: varchar("stripe_payment_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCreditTransactionSchema = createInsertSchema(creditTransactions).omit({
  id: true,
  createdAt: true,
});

export type InsertCreditTransaction = z.infer<typeof insertCreditTransactionSchema>;
export type CreditTransaction = typeof creditTransactions.$inferSelect;

// Videos table - untuk menyimpan video pembelajaran
export const videos = pgTable("videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  youtubeId: varchar("youtube_id").notNull(),
  duration: varchar("duration").notNull(),
  level: varchar("level").notNull(), // "Pemula", "Menengah", "Lanjutan"
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  createdAt: true,
});

export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type Video = typeof videos.$inferSelect;
