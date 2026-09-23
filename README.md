# HireFlowAI

**HireFlowAI** is an AI-powered recruitment platform designed to help recruiters and hiring teams manage candidates, job applications, recruitment workflows, and AI-assisted hiring processes from a single application.

The project combines **Next.js, PostgreSQL, Prisma, Cloudinary, Redis, BullMQ, and n8n** to create a full-stack recruitment system with automated background processing and workflow automation.

> 🚧 **Status:** Active development

---

## 🚀 Features

* 👤 Candidate management
* 💼 Job and recruitment management
* 📄 Resume/application handling
* 🤖 AI-assisted recruitment workflows
* 🔐 Authentication and authorization
* ☁️ Cloud-based file/image storage with Cloudinary
* ⚡ Background job processing with BullMQ
* 🔴 Redis-backed queues
* 🔄 Workflow automation using n8n
* 🗄️ PostgreSQL database
* 🧩 Prisma ORM
* 🎨 Modern responsive UI
* 🧱 Component-based frontend architecture
* 📦 Docker-based supporting services

---

## 🏗️ Architecture

The repository is organized into separate parts for the main application, workflow automation, and supporting AI/embedding functionality.

```text
HireflowAi/
│
├── hireflowai/              # Main Next.js application
│   │
│   ├── app/                 # Next.js application routes
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Application utilities
│   ├── prisma/              # Prisma schema and database configuration
│   ├── public/              # Static assets
│   └── ...
│
├── N8N/                     # n8n Docker Compose setup
│   └── docker-compose.yml
│
├── embedding/               # Embedding / AI-related functionality
│
└── README.md
```

### Main Application

The `hireflowai` directory contains the main recruitment application.

```text
Next.js
   │
   ├── Authentication
   │
   ├── Recruitment Management
   │
   ├── Candidate Management
   │
   ├── AI Features
   │
   ├── File Management
   │
   └── Background Jobs
          │
          ├── Redis
          └── BullMQ
```

### Automation Layer

The `N8N` directory contains a Docker Compose configuration for running **n8n**, which is used as the workflow automation layer.

n8n can be used to connect external services, trigger recruitment workflows, process data, and automate repetitive tasks.

The official n8n documentation also supports running n8n using Docker Compose and persistent Docker volumes.

---

## 🛠️ Tech Stack

### Frontend / Full Stack

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**

### Backend

* **Next.js server-side functionality**
* **Auth.js**
* **Prisma ORM**

### Database

* **PostgreSQL**
* **Neon PostgreSQL**

### Authentication

* **Auth.js / NextAuth**

### File Storage

* **Cloudinary**

Used for storing and managing uploaded media/files.

### Background Processing

* **Redis**
* **BullMQ**

Redis is used as the backing store for asynchronous jobs, while BullMQ manages the job queues and workers.

### Workflow Automation

* **n8n**
* **Docker**
* **Docker Compose**

### AI / Embeddings

* AI-powered recruitment functionality
* Embedding-related processing
* AI workflow automation through n8n

---

## 🔄 How the System Works

A simplified recruitment workflow looks like this:

```text
                    ┌──────────────────┐
                    │      Recruiter   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    HireFlowAI    │
                    │    Next.js App   │
                    └────────┬─────────┘
                             │
             ┌───────────────┼────────────────┐
             │               │                │
             ▼               ▼                ▼
       PostgreSQL         Cloudinary        Auth.js
             │
             ▼
          Prisma
             │
             ▼
       Application Data
             │
             ▼
        Background Jobs
             │
             ▼
        Redis + BullMQ
             │
             ▼
           n8n
             │
             ▼
      Automated Workflows
             │
             ▼
       AI / Integrations
```

---

# 📁 Project Structure

## `hireflowai`

This is the primary application.

```text
hireflowai/
├── app/
├── components/
├── lib/
├── prisma/
├── public/
├── package.json
├── next.config.*
├── tsconfig.json
└── ...
```

The application is responsible for the main recruitment platform, UI, authentication, database interaction, and application logic.

---

## `N8N`

The `N8N` directory contains the Docker Compose configuration used to run n8n separately from the main application.

```text
N8N/
└── docker-compose.yml
```

Start it with:

```bash
cd N8N

docker compose up -d
```

Check the running containers:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

Stop the services:

```bash
docker compose down
```

> Keep persistent n8n volumes when stopping/restarting the stack if you want your workflows and instance data to remain available.

---

# ⚙️ Main Application Setup

## Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git
* Docker
* Docker Compose

You will also need accounts/services for the external dependencies used by the application, such as:

* PostgreSQL / Neon
* Cloudinary
* Any AI provider used by your configuration

---

## 1. Clone the Repository

```bash
git clone https://github.com/hdevs0001/HireflowAi.git

cd HireflowAi
```

---

## 2. Enter the Application

```bash
cd hireflowai
```

Install dependencies:

```bash
npm install
```

---

## 3. Configure Environment Variables

Create:

```text
.env
```

inside the `hireflowai` directory.

Example:

```env
DATABASE_URL="your_database_url"

AUTH_SECRET="your_auth_secret"

NEXTAUTH_URL="http://localhost:3000"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

REDIS_URL="redis://localhost:6379"

# Add AI-related environment variables required by your implementation
```

### ⚠️ Important

Never commit real secrets to GitHub.

Add `.env` to `.gitignore`:

```gitignore
.env
.env.local
.env.production
```

---

# 🗄️ Database Setup

HireFlowAI uses Prisma for database access.

After configuring `DATABASE_URL`, generate the Prisma client:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

You can inspect the database using:

```bash
npx prisma studio
```

Prisma Studio will open a browser interface for viewing and managing database records.

---

# 🔴 Redis

Redis is used by the application for background job processing.

If Redis is running locally:

```bash
redis-server
```

Or use Docker:

```bash
docker run -d \
  --name hireflowai-redis \
  -p 6379:6379 \
  redis
```

Check the container:

```bash
docker ps
```

---

# ⚡ BullMQ

BullMQ is used to process asynchronous jobs through Redis.

A simplified architecture is:

```text
HireFlowAI
     │
     ▼
  Create Job
     │
     ▼
   BullMQ
     │
     ▼
    Redis
     │
     ▼
   Worker
     │
     ▼
 Process Job
```

This allows expensive or time-consuming tasks to run outside the main request/response cycle.

For example:

```text
Candidate Upload
       │
       ▼
Create Background Job
       │
       ▼
Redis Queue
       │
       ▼
BullMQ Worker
       │
       ▼
Resume Processing
       │
       ▼
AI / Embedding Processing
```

---

# 🤖 AI & Embeddings

The repository also contains an `embedding` directory for embedding-related functionality.

Embeddings can be used to represent candidate/resume information as vectors, enabling functionality such as:

* Semantic candidate search
* Resume similarity
* Job-to-candidate matching
* Candidate ranking based on relevance
* Retrieval-based AI workflows

A conceptual flow:

```text
Resume
  │
  ▼
Text Extraction
  │
  ▼
Embedding Model
  │
  ▼
Vector Representation
  │
  ▼
Search / Matching
  │
  ▼
Relevant Candidates
```

---

# 🔄 n8n Automation

n8n provides a visual workflow automation layer for HireFlowAI.

A typical workflow could look like:

```text
Application Event
       │
       ▼
     n8n
       │
       ├── Process Candidate
       │
       ├── Call AI Service
       │
       ├── Store Results
       │
       └── Trigger Notification
```

The n8n instance can be started independently using the Compose configuration inside the `N8N` directory.

```bash
cd N8N

docker compose up -d
```

Then open:

```text
http://localhost:5678
```

The exact URL/port depends on the Compose configuration.

For production deployments, n8n also supports persistent storage and PostgreSQL-backed setups through Docker Compose.

---

# ▶️ Run HireFlowAI

From the `hireflowai` directory:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:3000
```

---

# 🏭 Production Build

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

---

# 🐳 Docker Services

The project uses Docker for supporting infrastructure such as Redis and n8n.

Example architecture:

```text
┌───────────────────────────────┐
│        HireFlowAI             │
│          Next.js              │
│         :3000                 │
└───────────────┬───────────────┘
                │
       ┌────────┴────────┐
       │                 │
       ▼                 ▼
 PostgreSQL           Redis
  / Neon              :6379
                        │
                        ▼
                    BullMQ
                        │
                        ▼
                     Workers

                ┌───────────────┐
                │      n8n      │
                │     :5678     │
                └───────────────┘
```

---

# 🔐 Security

Do not commit:

```text
.env
.env.local
API keys
Database passwords
Auth secrets
Cloudinary credentials
Redis credentials
AI provider API keys
```

Use environment variables or a secrets-management solution for production deployments.

---

# 📈 Future Improvements

Possible future improvements include:

* [ ] AI resume parsing
* [ ] Semantic candidate search
* [ ] Automated candidate-job matching
* [ ] AI-powered candidate summaries
* [ ] Automated interview scheduling
* [ ] Email automation
* [ ] Candidate notification workflows
* [ ] Advanced recruiter dashboard
* [ ] Resume scoring based on configurable criteria
* [ ] More n8n recruitment workflows
* [ ] Production Docker deployment
* [ ] CI/CD pipeline
* [ ] Monitoring with Prometheus and Grafana
* [ ] Automated testing

---

# 🎯 Why I Built This

HireFlowAI was built as a practical full-stack project to explore how modern web applications can combine:

* Full-stack development
* AI integrations
* Background job processing
* Vector embeddings
* Workflow automation
* Cloud services
* PostgreSQL
* Redis
* Docker

The project focuses on solving real recruitment workflow problems while providing hands-on experience with production-oriented technologies.

---

# 🧑‍💻 Development

Clone the repository:

```bash
git clone https://github.com/hdevs0001/HireflowAi.git
```

Enter the application:

```bash
cd HireflowAi/hireflowai
```

Install dependencies:

```bash
npm install
```

Configure environment variables:

```text
.env
```

Generate Prisma:

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run dev
```

For n8n:

```bash
cd ../N8N
docker compose up -d
```

---

# 📌 Project Links

**Repository:**
https://github.com/hdevs0001/HireflowAi

**Main Application:**
https://github.com/hdevs0001/HireflowAi/tree/main/hireflowai

**n8n Configuration:**
https://github.com/hdevs0001/HireflowAi/tree/main/N8N

---

# 📄 License

This project is currently intended for learning and development purposes.

See the repository for licensing information.
