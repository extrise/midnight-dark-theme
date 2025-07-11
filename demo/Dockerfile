# Midnight Dark Theme Demo - Docker
# Demonstrates Docker syntax highlighting with multi-stage builds and best practices

# Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy source code
COPY src/ ./src/
COPY public/ ./public/
COPY tsconfig.json ./

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Install additional packages
RUN apk add --no-cache \
    curl \
    bash \
    tzdata

# Set timezone
ENV TZ=UTC

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create log directory
RUN mkdir -p /var/log/nginx && \
    chown -R nextjs:nodejs /var/log/nginx

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Expose port
EXPOSE 80

# Switch to non-root user
USER nextjs

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# Development stage (for local development)
FROM node:18-alpine AS development

WORKDIR /app

# Install development dependencies
RUN apk add --no-cache git

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm install

# Copy source code
COPY . .

# Expose development port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]

# Testing stage
FROM builder AS testing

# Install testing dependencies
RUN npm install --only=dev

# Copy test files
COPY tests/ ./tests/
COPY jest.config.js ./

# Run tests
RUN npm test

# Multi-architecture build example
FROM --platform=$BUILDPLATFORM node:18-alpine AS cross-build

ARG TARGETPLATFORM
ARG BUILDPLATFORM

RUN echo "Building on $BUILDPLATFORM for $TARGETPLATFORM"

WORKDIR /app

# Platform-specific optimizations
RUN if [ "$TARGETPLATFORM" = "linux/arm64" ]; then \
        echo "Optimizing for ARM64"; \
    elif [ "$TARGETPLATFORM" = "linux/amd64" ]; then \
        echo "Optimizing for AMD64"; \
    fi

COPY . .
RUN npm ci && npm run build