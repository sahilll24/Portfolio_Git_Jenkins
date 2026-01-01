## 🚀 End-to-End MERN Stack CI/CD Deployment using Jenkins, SonarQube & AWS EC2

Production-style CI/CD automation project demonstrating how a full-stack MERN application is built, tested, quality-checked, containerized, and deployed to AWS EC2 using Jenkins pipelines.
From GitHub commit → live production deployment with automated quality gates

## 👀 Recruiter Summary (30-Second Read)

✔ Built a real Jenkins Declarative Pipeline
✔ Automated frontend & backend testing
✔ Integrated SonarQube Quality Gates
✔ Dockerized full application using multi-stage build
✔ Deployed container to AWS EC2 via pipeline (no manual steps)

This project reflects how CI/CD works in real companies, not tutorials.

## 🧑‍💻 What I Built

A production-ready MERN stack portfolio application with a fully automated CI/CD pipeline that:
Runs tests for frontend & backend
Enforces code quality using SonarQube
Builds and pushes Docker images
Deploys the application automatically to AWS EC2

## 🔄 CI/CD Pipeline Flow (Actual Implementation)
GitHub Commit
   ↓
Jenkins Pipeline
   ├─ Checkout Code
   ├─ Install Frontend Dependencies
   ├─ Run Frontend Tests (JUnit + Coverage)
   ├─ Install Backend Dependencies
   ├─ Run Backend Tests (JUnit + Coverage)
   ├─ Build Vite Frontend
   ├─ SonarQube Static Code Analysis
   ├─ Quality Gate Validation (Fail Pipeline if Failed)
   ├─ Build Docker Image (Multi-Stage)
   ├─ Push Image to DockerHub
   ├─ SSH Deployment to AWS EC2
   ├─ Run Docker Container
   └─ Archive Reports & Send Email Notifications

## 🛠️ Tech Stack (ATS-Optimized)
DevOps & Cloud
Jenkins (Declarative Pipeline)
SonarQube (Static Code Analysis, Quality Gates)
Docker (Multi-Stage Builds)
DockerHub
AWS EC2
Linux
Git & GitHub
Application
React (Vite)
Node.js
Express.js
MongoDB
Tailwind CSS
Nginx

## 🧪 Testing & Code Quality

Frontend & backend tests executed inside Jenkins
Test reports generated in JUnit XML format
Code coverage archived as pipeline artifacts
SonarQube enforces:
Bugs
Code smells
Vulnerabilities
Pipeline automatically stops deployment if quality gate fails

## 🐳 Dockerization Strategy

Multi-stage Dockerfile for optimized image size
Application runs inside a Docker container
Exposed ports:
80 – Frontend (Nginx)
3001 – Backend API

## ☁️ AWS Deployment

Deployed on AWS EC2
Jenkins connects via SSH using credentials
Deployment steps:
Pull latest Docker image
Stop & remove old container
Run new container with restart policy
No manual server deployment required after setup.

📂 Repository Structure
├── server/                    # Backend (Node.js / Express)
├── src/                       # Frontend source
├── Dockerfile                 # Multi-stage Docker build
├── Jenkinsfile                # CI/CD Pipeline
├── nginx.conf                 # Nginx configuration
├── sonar-project.properties   # SonarQube config
├── coverage/                  # Test coverage reports
└── README.md

## 🔐 Pipeline Security

Credentials managed via Jenkins Credentials Manager
Secure handling of:
SonarQube token
DockerHub credentials
EC2 SSH key

## 📈 Why This Project Stands Out

❌ Not a basic MERN app
❌ Not manual deployment
❌ Not theory

✅ Real CI/CD
✅ Real quality gates
✅ Real AWS deployment
✅ Real Jenkins pipeline errors & fixes

This project demonstrates hands-on DevOps ownership.

## 🧠 Key Learnings

Jenkins pipeline design & debugging
SonarQube integration with CI/CD
Docker multi-stage builds
Secure credential management
AWS EC2 production deployments
Handling pipeline failures & rollbacks

## 👤 Author
Sahil Mahesh Saykar
DevOps Engineer 

GitHub: https://github.com/sahilll24

LinkedIn: https://www.linkedin.com/in/sahil-saykar-9a11a3264/

## 💬 Recruiter Note
This repository shows how I think and work as a DevOps engineer, not just tools I’ve used.