import { writable, Writable, get } from 'svelte/store';

import { API_URL, BASE_API_PATH } from './url';
import type {
    SslError,
    SslCheck,
    State,
    UserStore,
} from '../../../server/src/types';

export const data: Writable<SslCheck[]> = writable([]);
export const sslErrors: Writable<SslError[]> = writable([]);
export const queuestate: Writable<State> = writable({
    processing: -1,
    queue: -1,
    connected: false,
});

export const appstate = (function () {
    const store = writable({ minified: true });
    const { subscribe, set } = store;

    return {
        subscribe,
        toggleMinified: (): void => {
            set({ minified: !get(store).minified });
        },
    };
})();

// user
const emptyUserStore: UserStore = { token: '', error: '' };
const token = sessionStorage.token;
export const user = (function () {
    const { subscribe, set } = writable(
        token ? { token, error: '' } : emptyUserStore
    );

    subscribe(({ token }) => (sessionStorage.token = token || ''));

    return {
        subscribe,
        signout: (): undefined => {
            set(emptyUserStore);
            return;
        },
        signin: async (username: string, password: string) => {
            const res = await fetch(`${API_URL}${BASE_API_PATH}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({
                    username,
                    password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const json = await res.json();
            if (res.ok) {
                set({ token: json.access_token, error: '' });
            } else {
                set({ token: '', error: json.message });
            }
        },
    };
})();
