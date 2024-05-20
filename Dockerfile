# Multi-stage build for both development and production

# Stage 1: Build stage
FROM node:20 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the app based on the argument
ARG BUILD_ENV=production
RUN if [ "$BUILD_ENV" = "production" ]; then npm run build; else npm run build:dev; fi

# Stage 2: Production stage
FROM nginx:alpine as production

# Copy the build output to the nginx html directory
COPY --from=builder /app/dist/monety-app/browser /usr/share/nginx/html

# Copy nginx configuration files
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# Stage 3: Development stage
FROM node:20 as development

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install project dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port 4200 for Angular development server
EXPOSE 4200

# Command for starting the development server
CMD ["npm", "run", "start"]
