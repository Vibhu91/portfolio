# Free Cloud Deployment Guide: Docker & Kubernetes

Here are the complete files and steps to containerize your portfolio with Docker and deploy it to a free Kubernetes / cloud container cluster.

---

## 1. Files Created in Your Project

1. **[Dockerfile](file:///c:/Users/Vibhu-Kavi/OneDrive/Desktop/portfolio/Dockerfile)**: Uses a super-lightweight `nginx:alpine` image (~20MB) to serve your portfolio files on port 80.
2. **[.dockerignore](file:///c:/Users/Vibhu-Kavi/OneDrive/Desktop/portfolio/.dockerignore)**: Excludes unnecessary folders (`node_modules`, `.git`, etc.) to keep your image tiny.
3. **[k8s-deployment.yaml](file:///c:/Users/Vibhu-Kavi/OneDrive/Desktop/portfolio/k8s-deployment.yaml)**: Complete Kubernetes Deployment and LoadBalancer Service definition (runs 2 redundant replicas).

---

## 2. Step 1: Build & Push Your Docker Image (Free)

Create a free account on [Docker Hub](https://hub.docker.com/) if you haven't already. Then open PowerShell or your terminal in this directory and run:

```bash
# 1. Log in to Docker Hub
docker login

# 2. Build your container image (replace <dockerhub-username> with your username)
docker build -t <dockerhub-username>/portfolio:latest .

# 3. Test it locally
docker run -d -p 8080:80 <dockerhub-username>/portfolio:latest
# (Open http://localhost:8080 to test)

# 4. Push the image to the cloud registry
docker push <dockerhub-username>/portfolio:latest
```

---

## 3. Step 2: Deploy to Kubernetes for Free

Managed Kubernetes services (like AWS EKS or GCP GKE) charge control-plane fees, but you have great **100% free cloud options**:

### Option A: Civo Cloud Free K8s Credit (Easiest Full K8s)
- **What it is**: [Civo.com](https://www.civo.com/) offers **\$250 free cloud credits** for developers and students. They run lightweight, blazing-fast K3s Kubernetes.
- **Steps**:
  1. Sign up on [civo.com](https://www.civo.com/) and create a free K3s cluster from the dashboard.
  2. Download the `kubeconfig` file or run:
     ```bash
     civo k3s config <cluster-name> --save
     ```
  3. In [k8s-deployment.yaml](file:///c:/Users/Vibhu-Kavi/OneDrive/Desktop/portfolio/k8s-deployment.yaml), replace `<YOUR_DOCKERHUB_USERNAME>` with your Docker Hub handle.
  4. Deploy:
     ```bash
     kubectl apply -f k8s-deployment.yaml
     kubectl get svc portfolio-service
     ```
  5. The `EXTERNAL-IP` column will give you your live public website URL!

---

### Option B: Oketo / Okteto Cloud Free Tier
- **What it is**: [Okteto.com](https://www.okteto.com/) gives a free Kubernetes developer namespace directly connected to `kubectl`.
- **Steps**:
  1. Sign in with your GitHub account at `cloud.okteto.com`.
  2. Run `okteto context` to connect your local `kubectl`.
  3. Run `kubectl apply -f k8s-deployment.yaml`.

---

### Option C: Deploy Your Docker Image to Free Container Clouds (Render / Koyeb)
If you want zero Kubernetes configuration hassle while still deploying your Docker container:
- **[Koyeb](https://www.koyeb.com/)** (Free Tier): Supports native Docker deployments with global CDN and automatic SSL. Simply select "Deploy Docker Image" and input `<dockerhub-username>/portfolio:latest`.
- **[Render](https://render.com/)** (Free Tier): Choose "New Web Service" -> "Deploy an existing image" -> enter your Docker Hub image.
