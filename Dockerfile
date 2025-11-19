# Use a lightweight LTS image instead of "latest"
FROM node:18-alpine

# Install only what is necessary
RUN apk add --no-cache curl

WORKDIR /app

# Copy only package files first (better Docker cache)
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Now copy the rest of the application
COPY . .

# Install PM2 globally (light version)
RUN npm install pm2 -g

EXPOSE 3000

# Start server using PM2 Runtime
CMD ["pm2-runtime", "server.js"]
