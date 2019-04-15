ARG NODE_ENV=production
ARG NODE_VERSION=10.11.0-alpine

FROM node:${NODE_VERSION} as build
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ./package.json ./


RUN apk add --no-cache --virtual .deps \
  python \
  libtool \
  nasm \
  autoconf \
  automake \
  make \
  git \
  libpng-dev \
  bzip2-dev \
  libjpeg-turbo-dev \
  gettext-dev \
  g++ \
  && npm i --loglevel error

FROM node:${NODE_VERSION}
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules

COPY . .

RUN chmod +x ./opt/docker-entrypoint.sh \
  && ln -sf /dev/stdout ./opt/error.log \
  && ln -sf /dev/stderr ./opt/info.log

ENTRYPOINT [ "./opt/docker-entrypoint.sh" ]

EXPOSE 3000 9229

CMD [ "npm", "start" ]
