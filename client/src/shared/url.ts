const PORT =
    window.location.hostname === 'localhost' ? 3000 : window.location.port;
const PROTOCOL = window.location.protocol === 'http:' ? 'ws:' : 'wss:';
const WS_URL = `${PROTOCOL}//${window.location.hostname}:${PORT}`;

export { WS_URL };
