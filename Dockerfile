FROM nginx

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./dist /www/
EXPOSE 80
