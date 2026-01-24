# Docker & CI/CD Setup Guide

## Docker Build & Run

### Build the Docker Image
```bash
docker build -t mamdani-computers:latest .
```

### Run the Container
```bash
docker run -p 3000:3000 mamdani-computers:latest
```

The application will be available at `http://localhost:3000`

---

## Docker Compose (Recommended for Development)

### Start the Application
```bash
docker-compose up
```

### Stop the Application
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f
```

### Rebuild the Image
```bash
docker-compose up --build
```

---

## GitHub Actions Workflows

Two workflows are configured:

### 1. **docker-build.yml** - Build and Push Docker Image
- Triggers on: `push` to main/develop branches, tags (v*.*.*)
- Builds multi-stage Docker image
- Pushes to GitHub Container Registry (ghcr.io)
- Caches layers for faster builds
- Adds semantic versioning tags

**Tags created:**
- `latest` - Latest from main branch
- `branch-name` - Latest from any branch
- `v1.0.0` - From Git tags
- `sha-abc123def` - Commit SHA

### 2. **ci.yml** - Code Quality & Tests
- Triggers on: `push` and `pull_request` to main/develop
- Tests on Node.js 18.x and 20.x
- Security checks (npm audit)
- Dependency validation
- Docker build verification (no push)

---

## Environment Variables

Create a `.env` file if needed:
```bash
NODE_ENV=production
PORT=3000
```

---

## Production Deployment

### Manual Push to Registry
```bash
# Build with custom tag
docker build -t ghcr.io/yourusername/mamdanicomputers:1.0.0 .

# Push to registry
docker push ghcr.io/yourusername/mamdanicomputers:1.0.0
```

### Using GitHub Releases
1. Create a Git tag: `git tag v1.0.0`
2. Push tag: `git push origin v1.0.0`
3. GitHub Actions automatically builds and pushes with version tags

---

## Health Check

The container includes a health check that verifies the app is running:
- **Interval**: 30 seconds
- **Timeout**: 3 seconds
- **Retries**: 3
- **Start period**: 5 seconds

Check health:
```bash
docker ps  # Look for (healthy) status
```

---

## Security Features

✅ Multi-stage builds (reduces image size)
✅ Non-root user (nodejs)
✅ Health checks
✅ npm audit in CI/CD
✅ Proper signal handling (dumb-init)
✅ Security headers

---

## Image Size Optimization

Current optimizations:
- Alpine base image (~150MB)
- Multi-stage builds
- Production-only dependencies
- Removed unnecessary files

---

## Troubleshooting

### Container won't start
```bash
docker logs <container-id>
```

### Port already in use
```bash
docker run -p 8000:3000 mamdani-computers:latest
# Access at http://localhost:8000
```

### Clear Docker cache
```bash
docker system prune -a
```

---

## Next Steps

1. Push to GitHub with `git push origin main`
2. GitHub Actions will automatically run CI/CD
3. Monitor workflow status in Actions tab
4. Docker image will be pushed to ghcr.io automatically
