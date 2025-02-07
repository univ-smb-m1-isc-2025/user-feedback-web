FROM node:20.12.1

WORKDIR /app

COPY . /app

RUN npm i -g @angular/cli

RUN cat package.json
RUN npm i

CMD ["ng", "serve", "--host", "0.0.0.0"]
