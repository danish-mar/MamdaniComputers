# Mamdani Computers Shop

> [!IMPORTANT]
> This is a paid work for **Mamdani Computers Shop**.

A modern, responsive web application for Mamdani Computers Shop, providing a premium interface for computer sales, repair services, and customer interaction.

## 🚀 Overview

This project is a full-featured website built with Node.js and Express, designed to showcase the products and services offered by Mamdani Computers. It includes a robust backend with Docker containerization and automated CI/CD workflows.

## 🛠️ Tech Stack

- **Backend**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Templating**: [EJS](https://ejs.co/) with [Express EJS Layouts](https://github.com/spatools/express-ejs-layouts)
- **Styling**: Vanilla CSS (Modern, premium aesthetics)
- **Containerization**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **CI/CD**: GitHub Actions (Docker builds, Security audits)

## ✨ Features

- **Home Page**: Engaging hero section and shop overview.
- **Service Listings**: Detailed information about repair and maintenance services.
- **Product Catalog**: Dynamic product display using a secure API proxy.
- **Repair Services**: Dedicated section for computer and laptop repairs.
- **Contact & About**: Seamless communication and brand story.
- **Dockerized Environment**: Ready for production-grade deployment.

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- Docker (Optional)

### Local Development
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Docker Setup
Run the application using Docker Compose:
```bash
docker-compose up --build
```

## 🚢 CI/CD & Deployment

The project includes automated GitHub Actions workflows for:
- Building and pushing multi-stage Docker images to GHCR.
- Running security audits and dependency validation.
- Verifying builds on multiple Node.js versions.

Refer to [DOCKER_SETUP.md](DOCKER_SETUP.md) for detailed deployment instructions.

## 📄 License

This project is a private work for Mamdani Computers.
