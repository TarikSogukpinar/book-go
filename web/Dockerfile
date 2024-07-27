# Stage 1: Build the Next.js application
FROM node:20 AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Create the final image
FROM node:18

WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app ./

# Expose the application's port
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]