FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY dist/user-feedback-web/browser /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
