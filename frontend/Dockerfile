# Description: Dockerfile for the frontend application
# Building: docker build --no-cache --tag "job-tracker-frontend" . 
# Running: docker run -d -p 80:80 --name frontend job-tracker-frontend
# Stopping: docker stop frontend

# Building the frontend 
FROM node:latest AS build
WORKDIR /app
COPY package*.json ./

# Make sure npm is up to date 
RUN npm install -g npm@latest

# Install dependencies, copy the source code and build the application
RUN npm install
COPY . .
RUN npm run build:docker

# Hosting frontend for production
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod -R 755 /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]