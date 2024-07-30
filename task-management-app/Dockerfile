# Stage 1: Build the Angular application
FROM node:20-alpine  as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g @angular/cli

COPY . .
RUN npm run build

# Stage 2: Serve the Angular application with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/task-management-app/browser /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
