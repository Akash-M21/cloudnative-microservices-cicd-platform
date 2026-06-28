# CloudNative Microservices CI/CD Platform

## Overview

This project demonstrates a complete enterprise-level CI/CD implementation for deploying containerized Node.js microservices on AWS Kubernetes infrastructure.

The solution automates the complete software delivery lifecycle:

* Source code management
* Automated code quality validation
* Container image creation
* Artifact storage
* Kubernetes deployment
* Cloud-based application hosting

The platform follows modern DevOps practices using:

* Jenkins Pipeline automation
* SonarQube static code analysis
* Docker containerization
* JFrog Artifactory image management
* Kubernetes orchestration
* AWS Elastic Kubernetes Service (EKS)

---

# Architecture Overview

```text
                 Developer

                     |

                     |

                GitHub Repository

                     |

                     |

                  Jenkins

                     |

        ----------------------------

        |                          |

    SonarQube                 Docker Build

        |                          |

        |                          |

   Quality Gate             Docker Images

                                  |

                                  |

                         JFrog Artifactory

                                  |

                                  |

                              AWS EKS

                                  |

                                  |

                         Kubernetes Pods

                                  |

                                  |

                         Running Services

```

---

# Project Objective

The goal of this project is to implement a scalable microservices deployment platform where:

* Each service can be developed independently
* Each service can be built independently
* Each service can be deployed independently
* Code quality is automatically validated
* Docker images are securely stored
* Applications are automatically deployed into Kubernetes

---

# Technology Stack

| Category                | Technology        |
| ----------------------- | ----------------- |
| Programming Language    | Node.js           |
| Backend Framework       | Express.js        |
| Version Control         | GitHub            |
| CI/CD Tool              | Jenkins           |
| Code Quality            | SonarQube         |
| Container Platform      | Docker            |
| Image Registry          | JFrog Artifactory |
| Container Orchestration | Kubernetes        |
| Cloud Platform          | AWS EKS           |
| Deployment Tool         | kubectl           |

---

# Microservices Architecture

The application is divided into independent services.

## API Gateway

Responsible for routing external requests to internal services.

Port:

```
8080
```

---

## Users Service

Handles user-related operations.

Port:

```
3001
```

---

## Products Service

Handles product operations.

Port:

```
3002
```

---

## Orders Service

Handles order processing.

Port:

```
3003
```

---

## Payments Service

Handles payment operations.

Port:

```
3004
```

---

# Repository Structure

```
cicd-microservices/


├── Jenkinsfile

├── sonar-project.properties

├── README.md



├── api-gateway

│   ├── Dockerfile

│   ├── package.json

│   ├── server.js

│   └── k8s

│       ├── deployment.yaml

│       └── service.yaml



├── users

├── products

├── orders

└── payments

```

Each microservice contains:

* Application source code
* Docker build instructions
* Kubernetes deployment configuration

This provides:

* Service ownership
* Independent deployment
* Easier troubleshooting
* Better scalability

---

# CI/CD Pipeline Workflow

## Stage 1: Source Checkout

Jenkins automatically pulls the latest application code from GitHub.

Process:

```
GitHub
   |
Jenkins
```

---

# Stage 2: SonarQube Code Analysis

Before building containers, Jenkins performs static code analysis.

Checks:

* Code quality
* Bugs
* Vulnerabilities
* Code smells
* Maintainability issues

If the Quality Gate fails:

```
Pipeline stops
```

---

# Stage 3: Docker Image Build

Jenkins builds Docker images for selected services.

Example:

```
users:BUILD_NUMBER

products:BUILD_NUMBER

orders:BUILD_NUMBER
```

Benefits:

* Immutable application versions
* Faster deployments
* Consistent runtime environment

---

# Stage 4: Push Images To JFrog Artifactory

Docker images are stored in a private registry.

Example:

```
mycompany.jfrog.io/docker-local
```

Advantages:

* Secure image storage
* Version control
* Centralized artifact management

---

# Stage 5: Deploy To AWS EKS

Jenkins connects to the EKS cluster:

```
aws eks update-kubeconfig
```

Deployment:

```
kubectl apply -f service/k8s/
```

Kubernetes creates:

* Deployments
* ReplicaSets
* Pods
* Services

---

# Parameterized Jenkins Deployment

The pipeline supports service selection.

Available options:

```
all

api-gateway

users

products

orders

payments

```

Example:

Selecting:

```
users
```

Only:

```
users Docker Image

users Kubernetes Deployment

```

will be processed.

---

# Kubernetes Design

Each service owns its Kubernetes configuration.

Example:

```
users/


k8s/

├── deployment.yaml

└── service.yaml

```

Benefits:

* Independent scaling
* Easy rollback
* Microservice isolation

---

# Docker Image Flow

```
Developer Code

      |

Docker Build

      |

Docker Image

      |

JFrog Artifactory

      |

Kubernetes Pull

      |

Running Container

```

---

# AWS EKS Deployment Requirements

Install:

* AWS CLI
* kubectl
* eksctl

Configure cluster:

```bash
aws eks update-kubeconfig \
--region us-east-1 \
--name my-eks-cluster
```

Verify nodes:

```bash
kubectl get nodes
```

---

# JFrog Authentication Setup

Create Kubernetes registry secret:

```bash
kubectl create secret docker-registry jfrog-secret \
--docker-server=mycompany.jfrog.io \
--docker-username=<username> \
--docker-password=<token> \
-n microservices
```

Kubernetes uses:

```yaml
imagePullSecrets:

- name: jfrog-secret
```

---

# Jenkins Configuration

Required plugins:

```
Pipeline

Git

Docker Pipeline

SonarQube Scanner

Kubernetes CLI

AWS Credentials

```

Required credentials:

| Credential  | Purpose                  |
| ----------- | ------------------------ |
| jfrog-creds | Push Docker images       |
| aws-creds   | Access AWS EKS           |
| sonar-token | SonarQube authentication |

---

# Deployment Verification

Check pods:

```bash
kubectl get pods -n microservices
```

Check services:

```bash
kubectl get svc -n microservices
```

View logs:

```bash
kubectl logs <pod-name> -n microservices
```

---

# Troubleshooting

## Image Pull Failure

Check:

```bash
kubectl describe pod <pod-name> -n microservices
```

Possible causes:

* Invalid JFrog credentials
* Missing imagePullSecret
* Incorrect image URL

---

## Pod Failure

Check logs:

```bash
kubectl logs <pod-name> -n microservices
```

---

## Restart Deployment

```bash
kubectl rollout restart deployment <service> \
-n microservices
```

---

# Future Enhancements

Possible improvements:

* Helm chart implementation
* Kubernetes Ingress
* Prometheus monitoring
* Grafana dashboards
* Horizontal Pod Autoscaling
* ArgoCD GitOps deployment
* AWS Secrets Manager integration

---

# Complete DevOps Flow

```
Developer Commit

        |

        |

GitHub

        |

        |

Jenkins Pipeline

        |

        |

SonarQube Quality Check

        |

        |

Docker Image Build

        |

        |

JFrog Artifactory

        |

        |

AWS EKS Deployment

        |

        |

Production Application

```

---

# Project Outcome

This project demonstrates a complete cloud-native CI/CD implementation with:
```
Automated software delivery
Containerized microservices
Secure artifact management
Kubernetes orchestration
AWS cloud deployment
```
```
# End-to-End Flow
GitHub → Jenkins → SonarQube → Docker → JFrog → AWS EKS
```
