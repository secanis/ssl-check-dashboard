# server api server build
FROM node:alpine as builder
WORKDIR /nest

RUN apk update \
    && apk add --no-cache --virtual build-dependencies build-base openssl libgcc \
    libstdc++ g++ make python3

COPY . .
RUN npm install
RUN npm run build:server
RUN npm run build:client

# final image build
FROM node:alpine
LABEL maintainer=support@secanis.ch

WORKDIR /app
ENV NODE_ENV production

COPY package.json package-lock.json ./

COPY --from=builder /nest/.nest ./
COPY --from=builder /nest/.svelte ./public

# COPY healthcheck.js .

RUN adduser -D myuser \
    && apk add --no-cache openssl \
    && npm install --production
USER myuser

# HEALTHCHECK --interval=15s --timeout=15s --start-period=5s --retries=3 CMD node healthcheck.js

EXPOSE 3000
ENV PORT=3000

CMD ["node", "main.js"]
