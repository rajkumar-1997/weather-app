FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install ALL dependencies (including dev) for building
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm prune --production

# Expose the port the app runs on
EXPOSE 3000

# Command to run the production build
CMD ["npm", "run", "start:prod"]