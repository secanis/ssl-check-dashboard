# basic
FROM node:alpine AS builder-basic

RUN apk update \
    && apk add --no-cache --virtual build-dependencies build-base openssl libgcc \
    libstdc++ g++ make python3

# client build
FROM builder-basic AS builder-client
WORKDIR /build

COPY . .
WORKDIR /build/client
RUN npm ci
RUN npm run build:prod

# server build
FROM builder-basic AS builder-server
WORKDIR /build

COPY . .
WORKDIR /build/server
RUN npm ci --force
RUN npm run build

# final image build
FROM node:slim
LABEL maintainer=support@secanis.ch

WORKDIR /app
ENV NODE_ENV=production

COPY server/package.json server/package-lock.json ./
RUN apt-get update && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/* \
    && npm ci --omit=dev

COPY --from=builder-server /build/server/.nest ./
COPY --from=builder-client /build/client/dist/ssl-check-dashboard/browser ./public

COPY server/healthcheck.mjs .

RUN useradd -ms /bin/bash myuser
USER myuser

ENV PORT=3000
EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=15s --start-period=5s --retries=3 CMD node /app/healthcheck.mjs || exit 1

CMD ["node", "main.js"]
