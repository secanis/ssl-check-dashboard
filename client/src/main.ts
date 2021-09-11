import { io } from 'socket.io-client';
import App from './App.svelte';
import { data, sslErrors, queuestate } from './shared/store';
import { State, SslError, SslCheck } from '../../server/src/types';

const app = new App({
    target: document.body,
    props: {},
});

const socket = io('ws://localhost:3000', { path: '/api/ws' });

socket.emit('events');

socket.on('data', (res: SslCheck[]) => {
    data.set(res);
});

socket.on('sslerrors', (res: SslError[]) => {
    sslErrors.set(res);
});

socket.on('queuestate', (res: State) => {
    queuestate.set({ ...res, connected: socket.connected });
});

export default app;
