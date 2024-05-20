# Use a node image as the builder
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

# Build the Angular project
RUN npm run build

# Use an nginx image to serve the application
FROM nginx:alpine

# Copy the build output to the nginx html directory
COPY --from=builder /app/dist/monety-app/browser /usr/share/nginx/html

# Copy nginx configuration files
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
