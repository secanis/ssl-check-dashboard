import { environment } from '../../environments/environment';

export const getUrlConfig = () => {
  const PORT = !environment.production ? 3000 : window.location.port;
  const WS_PROTOCOL = window.location.protocol === 'http:' ? 'ws:' : 'wss:';
  const HTTP_PROTOCOL =
    window.location.protocol === 'http:' ? 'http:' : 'https:';
  const WS_URL = `${WS_PROTOCOL}//${window.location.hostname}:${PORT}`;
  const API_URL = `${HTTP_PROTOCOL}//${window.location.hostname}:${PORT}`;
  const BASE_API_PATH = '/api';

  if (!environment.production) {
    console.log('WS_URL', WS_URL);
    console.log('API_URL', API_URL);
  }

  return { WS_URL, API_URL, BASE_API_PATH };
};
