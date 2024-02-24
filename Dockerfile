FROM node:20 as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve stage
FROM nginx:stable-alpine as serve-stage

COPY --from=build-stage /app/docs /usr/share/nginx/html

# Configure Nginx to forward requests to /index.html
RUN sed -i 's|index  index.html index.htm;|try_files $uri $uri/ /index.html;|' /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]