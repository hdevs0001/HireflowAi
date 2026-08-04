import { Worker } from "bullmq";
import redisConnection from "@/lib/redis/redis";
import type { ResumeJobData } from "@/lib/queue/resume.queue";
import { extractText } from "unpdf";
const worker = new Worker<ResumeJobData>(
  "resume-processing",
  async (job) => {
    console.log("Processing Job", job.id);

    const { candidateId, resumeUrl, companyId } = job.data;
    console.log("Candidate Id", candidateId);
    // cms8tei3t0005sznsfv0casfm
    console.log("Resume:", resumeUrl);
    // 
    console.log("Company:", companyId);
// cms8sq0yl0000szn090o3iwbt
    // fetching the data form the pdf so that n8n will not have to do it fucking awesome thing this is to work with Love it .
    const response = await fetch(resumeUrl);

    if (!response.ok) {
      throw new Error(`Failed to download PDF: ${response.status}`);
    }

    const bytes = await response.arrayBuffer();

    const uint8Array = new Uint8Array(bytes);

    const text = await extractText(uint8Array);
    const resumeText = text.text.join("\n");

    const cleanedText = resumeText
      .replace(/\r\n/g, "\n")
      .replace(/[ \t]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    console.log(cleanedText);


// import crypto from "node:crypto";

// const body = JSON.stringify({
//   candidateId,
//   resumeText,
//   companyId,
// });

// const timestamp = Date.now().toString();

// const signature = crypto
//   .createHmac("sha256", process.env.N8N_WEBHOOK_SECRET!)
//   .update(`${timestamp}.${body}`)
//   .digest("hex");


// const response = await fetch(process.env.N8N_WEBHOOK_URL!, {
//   method: "POST",

//   headers: {
//     "Content-Type": "application/json",
//     "X-Hireflow-Timestamp": timestamp,
//     "X-Hireflow-Signature": signature,
//   },

//   body,
// });

// if (!response.ok) {
//   throw new Error(`n8n request failed: ${response.status}`);
// }


// cms8sq0yl0000szn090o3iwbt companyid

    //what to send to n8n 
    //candidateid,cleantext,companyid how he will accept it 

//     Anubhav Choubey
// +91 6268XXXXXX | choubey.anubhav253@gmail.com | anubhavchoubey.com | LinkedIn | GitHub
// Technical Skills
// Languages & Core: Python (Expert), JavaScript/TypeScript, SQL, HTML/CSS, OOP
// Web Technologies: React.js, Django, FastAPI, Prisma, REST APIs, Tailwind CSS
// AI & Machine Learning: Generative AI, PyTorch, OpenCV, Hugging Face, ComfyUI, LangChain, LangGraph
// Infrastructure & DevOps: Terraform, Helm, Docker, Kubernetes, AWS, GCP, CI/CD, Linux, Nginx, Git/GitHub
// Concepts: Code Management, PR Management, System Design, DSA, Computer Networks
// Experience
// Software Engineering Intern (SWE+AI) Jan 2026 – Present
// Urumi.ai (Onsite) Goa, India
// • Infrastructure as Code (IaC): Architected a complete staging environment using Terraform and Helm; engineered
// CI/CD workflows and resolved foundational network, IAM, and SMTP bottlenecks.
// • Advanced Routing & Auth: Engineered an Nginx service to route single GitHub OAuth callbacks to dynamic
// sandboxes via state-prefixed JWTs; bypassed GKE L7 limitations to deploy a raw TCP SSH/SFTP proxy using SSHPiper
// and host networking.
// • Security & Access Control: Hardened platform security by implementing CASL-based Role-Based Access Control
// (RBAC), MFA (TOTP/2FA), and encrypted KMS backups for environment variables.
// • AI Service Layer: Developed a multi-provider AI orchestration layer to power workspace chat and automated email
// summarization; refactored chat architecture to a route-based system for improved scalability.
// Technical Intern (Full Stack Focus) Jul 2025 – Oct 2025
//  Replenishment System using React.js (Frontend) and Django
//  nventory processing time by 80%.
//  Integrated Gemini API (Generative AI) to automate metadata tagging and implemented
// Typesense indexing, significantly optimizing search query speeds for thousands of SKUs.
// • Cross-Functional Collaboration: Partnered with logistics teams to deploy a dynamic geofencing system using Google
// Earth Studio coordinates, ensuring real-time accuracy for delivery zones.
// Deep Learning Intern Sep 2024 – Jul 2025
// Devnex Technologies Remote
// • AI Pipeline Optimization: Built an automated image editing pipeline using SmolVLM and SAM2, leveraging Python
// multithreading to achieve an 8x increase in throughput at the same cost.
// • Production Deployment: Converted experimental workflows into optimized, object-oriented Python scripts and
// deployed them to Dockerized endpoints, ensuring stability for end-users.
    console.log("Resume processing completed");
  },
  { connection: redisConnection },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed:`, error);
});

worker.on("error", (error) => {
  console.error("Worker error:", error);
});

console.log("🚀 Resume worker is running...");
