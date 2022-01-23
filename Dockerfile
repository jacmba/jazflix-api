FROM node:14-alpine as builder
RUN mkdir /src
RUN mkdir /static
WORKDIR /src

COPY . .

RUN npm i
RUN npm run build

RUN mv dist /app
RUN mv node_modules /app/

WORKDIR /app
RUN rm -rf /src

ENV STATIC_DIRECTORY /static

CMD ["node", "src/main.js"]