import { Queue } from "bullmq";
import redisConnection from "@/lib/redis/redis";

export interface ResumeJobData {
  candidateId: string;
  resumeUrl: string;
  companyId: string;
}

export const resumeQueue = new Queue<ResumeJobData>("resume-processing", {
  connection: redisConnection,
});
