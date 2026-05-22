# syntax=docker/dockerfile:1.4

# --------- Build stage ---------
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (including dev for building)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source files
COPY . .

# Build the static assets
RUN npm run build

# --------- Production stage ---------
FROM nginx:stable-alpine AS production
# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html
# Optional: custom nginx config (if needed)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
