FROM nginx:alpine as app
COPY ./dist /root
COPY ./nginx.conf /etc/nginx/