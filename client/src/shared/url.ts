const PORT =
    window.location.hostname === 'localhost' ? 3000 : window.location.port;
const WS_URL = `ws://${window.location.hostname}:${PORT}`;

export { WS_URL };
