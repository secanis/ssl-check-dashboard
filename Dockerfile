# server api server build
FROM node:alpine as builder
WORKDIR /nest

RUN apk update \
    && apk add --no-cache --virtual build-dependencies build-base openssl libgcc \
    libstdc++ g++ make python3

COPY . .
RUN npm install
RUN npm run build

# final image build
FROM node:alpine
LABEL maintainer=support@secanis.ch

WORKDIR /app
ENV NODE_ENV production

COPY package.json package-lock.json nuxt.config.js ./

# COPY --from=builder /nest/package.json /nest/package-lock.json ./
# COPY --from=builder /nest/.nuxt/dist /nest/package.json /nest/package-lock.json ./.nuxt/dist/
COPY --from=builder /nest/.nuxt ./.nuxt
COPY --from=builder /nest/.nest ./.nest

# COPY --from=builder /nest/.nuxt/dist /nest/package.json /nest/package-lock.json ./

# COPY --from=builder /nest/views-build /nest/views ./views/
# COPY healthcheck.js .

RUN adduser -D myuser \
    && apk add --no-cache openssl \
    && npm install --production
USER myuser

# HEALTHCHECK --interval=15s --timeout=15s --start-period=5s --retries=3 CMD node healthcheck.js

EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# CMD ["node", "server/server.js"]
CMD ["./node_modules/.bin/nuxt", "start"]
