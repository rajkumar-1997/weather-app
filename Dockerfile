
# Production Dockerfile
FROM node:lts-alpine


#Make  working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the build artifacts
COPY dist ./dist

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["node", "/app/dist/main.js"]