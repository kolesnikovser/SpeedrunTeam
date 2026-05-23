# --------- Stage 1: Build the Frontend ---------
FROM node:24-alpine AS frontend-builder
WORKDIR /app/frontend

# Copy frontend packages and install all dependencies (including devDependencies for building)
COPY frontend/package*.json ./
RUN npm ci

# Copy frontend source files
COPY frontend/ ./

# Compile the Vite React app
RUN npm run build

# --------- Stage 2: Production Server ---------
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy backend packages and install only production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy backend source files and db
COPY src/ ./src/

# Copy the compiled production assets from Stage 1 into the backend's static directory
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Expose port 3000
EXPOSE 3000

# Start the Express server
CMD ["node", "src/server.js"]
