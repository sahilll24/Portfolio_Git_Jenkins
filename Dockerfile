# ---------------------------------------
# FRONTEND BUILD STAGE
# ---------------------------------------
FROM node:20 AS frontend-builder
WORKDIR /app

# Copy ONLY frontend package files (root)
COPY package*.json ./

# Install frontend deps
RUN npm install

# Copy all frontend files
COPY . .

# Build Vite React
RUN npm run build


# ---------------------------------------
# BACKEND BUILD STAGE
# ---------------------------------------
FROM node:20 AS backend-builder
WORKDIR /app/server

# Copy backend package files
COPY server/package*.json ./

# Install backend deps
RUN npm install

# Copy backend source
COPY server/. .


# ---------------------------------------
# FINAL STAGE — NGINX + BACKEND
# ---------------------------------------
FROM nginx:1.25

# Copy built frontend to nginx
COPY --from=frontend-builder /app/dist /usr/share/nginx/html

# Replace default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Install Node.js so backend can run
RUN apt update && apt install -y nodejs npm && rm -rf /var/lib/apt/lists/*

# Copy backend server
COPY --from=backend-builder /app/server /app/server

WORKDIR /app/server

EXPOSE 80
EXPOSE 3001

# Run backend + Nginx together
CMD ["sh", "-c", "node index.js & nginx -g 'daemon off;'"]
