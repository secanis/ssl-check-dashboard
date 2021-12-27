# ssl-check-dashboard

## Get Started

You have two possibilities how you can start/deploy SSL Check Dashboard:

### Docker

You can directly pull the official Docker image from Docker Hub.

```bash
docker pull secanis/ssl-check-dashboard
docker run -p 3000:3000 -e CRON="0 */12 * * *" -e HOST_LIST=secanis.ch,gemeindeverzeichnis.ch secanis/ssl-check-dashboard
```

_Note: Currently there is no internal auth system, if you want to protect the information (normally this is anyway public), you have to use an ingress proxy or other reverse proxy in front of this app._

### Environment Variables

| Variable  | Default        | Description                                                                       |
| --------- | -------------- | --------------------------------------------------------------------------------- |
| HOST_LIST | none           | comma separated list of domain names (example: secanis.ch,gemeindeverzeichnis.ch) |
| CRON      | 0 _/12 _ \* \* | Cron job definition to check the domains again                                    |
| USERNAME  | admin          | Your admin username                                                               |
| PASSWORD  | admin          | Your admin password                                                               |
| SECRET    | _random_       | JWT secret, some random secure string                                             |
| LOG_LEVEL | `error,warn`   | Loglevel, possible `error,warn,debug,log,verbose`                                 |

## API

### Socket

The Socket.io websocket is reachable under `/socket.io`.

| Topic      | Description                  |
| ---------- | ---------------------------- |
| data       | Returns SSL check results    |
| queuestate | Returns queue list           |
| sslerrors  | Returns the urls with errors |

### REST API

If you want to fetch data by over the REST API you can use the following paths

| Endpoint             | HTTP | Description                 |
| -------------------- | ---- | --------------------------- |
| /api/data/queue      | GET  | Returns queue list          |
| /api/data/processing | GET  | Returns processing list     |
| /api/data/cache      | GET  | Returns cache of SSL checks |

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Contribution

It would be very nice, when you give us a feedback or when you create issues if you detect problems or bugs.
If you want to fix it yourself or you have an idea for something new, please create a PR, that would help us a lot.

Happy Coding <3 ...
