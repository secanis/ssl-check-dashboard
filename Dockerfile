# basic
FROM node:alpine as builder-basic

RUN apk update \
    && apk add --no-cache --virtual build-dependencies build-base openssl libgcc \
    libstdc++ g++ make python3

# client build
FROM builder-basic as builder-client
WORKDIR /build

COPY . .
WORKDIR /build/client
RUN npm ci
RUN npm run build:prod

# server build
FROM builder-basic as builder-server
WORKDIR /build

COPY . .
WORKDIR /build/server
RUN npm ci
RUN npm run build

# final image build
FROM node:slim
LABEL maintainer=support@secanis.ch

WORKDIR /app
ENV NODE_ENV production

COPY server/package.json server/package-lock.json ./
RUN apt-get update && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/* \
    && npm ci --omit=dev

COPY --from=builder-server /build/server/.nest ./
COPY --from=builder-client /build/client/dist/ssl-check-dashboard ./public

# COPY healthcheck.js .

RUN useradd -ms /bin/bash myuser
USER myuser

# HEALTHCHECK --interval=15s --timeout=15s --start-period=5s --retries=3 CMD node healthcheck.js

EXPOSE 3000
ENV PORT=3000

CMD ["node", "main.js"]
