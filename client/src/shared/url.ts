const PORT =
    window.location.hostname === 'localhost' ? 3000 : window.location.port;
const WS_PROTOCOL = window.location.protocol === 'http:' ? 'ws:' : 'wss:';
const HTTP_PROTOCOL = window.location.protocol === 'http:' ? 'http:' : 'https:';
const WS_URL = `${WS_PROTOCOL}//${window.location.hostname}:${PORT}`;
const API_URL = `${HTTP_PROTOCOL}//${window.location.hostname}:${PORT}`;

export { WS_URL, API_URL };
