# Stage 1
FROM node:12 as angular
WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

# Stage 2 
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=angular /app/dist/angular-proyecto/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]