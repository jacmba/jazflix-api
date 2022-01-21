FROM node:14-alpine as builder

RUN mkdir /app
RUN mkdir /src
RUN mkdir /static
WORKDIR /src

COPY . .

RUN npm run build

RUN cp package.json /app/
RUN cp node_modules /app/
RUN cp dist /app/

WORKDIR /app
RUN rm -rf /src

ENV STATIC_DIRECTORY /static

CMD ["node", "dist/main.js"]