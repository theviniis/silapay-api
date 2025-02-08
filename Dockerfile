# Use an official Node.js runtime as the base image
FROM node:20.16.0-alpine

# Define build arguments
ARG APP_PORT=3333

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Copy prisma schema
COPY prisma ./prisma/   

# Clean npm cache 
RUN npm cache clean -f

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS app (if needed)
RUN npm run build

# Expose the port your app runs on
EXPOSE ${APP_PORT}

# Command to run the application
CMD ["npm", "run", "start:dev"]