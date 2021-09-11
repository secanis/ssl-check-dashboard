import { writable, Writable } from 'svelte/store';

import type { SslError, SslCheck, State } from '../../../server/src/types';

export const data: Writable<SslCheck[]> = writable([]);
export const sslErrors: Writable<SslError[]> = writable([]);
export const queuestate: Writable<State> = writable({
    processing: -1,
    queue: -1,
    connected: false,
});
