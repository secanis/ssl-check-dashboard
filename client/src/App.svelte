<script lang="ts">
    import { onDestroy } from 'svelte';
    import { io } from 'socket.io-client';

    import Header from './components/Header.svelte';
    import Footer from './components/Footer.svelte';
    import Login from './components/Login.svelte';
    import SslList from './components/SslList.svelte';
    import Tailwind from './Tailwind.svelte';

    import { data, sslErrors, queuestate, user } from './shared/store';
    import { SslCheck, SslError, State } from '~/server/src/types';
    import { WS_URL } from './shared/url';

    let t: string;
    let loginErr: string;
    const unUser = user.subscribe((state) => {
        t = state.token;
        if (state.token) {
            const socket = io(WS_URL, {
                path: '/api/ws',
                extraHeaders: {
                    Authorization: `Baerer ${state.token}`,
                },
            });

            socket.on('connect', () => {
                socket.emit('events');
            });
            socket.on('conerr', (e) => {
                if (e && e.code === 401) user.signout();
                socket.disconnect();
            });

            socket.on('data', (res: SslCheck[]) => {
                data.set(res);
            });

            socket.on('sslerrors', (res: SslError[]) => {
                sslErrors.set(res);
            });

            socket.on('queuestate', (res: State) => {
                queuestate.set({ ...res, connected: socket.connected });
            });
        }

        if (state.error) {
            loginErr = state.error;
        }
    });
    onDestroy(unUser);
    $: isLoggedIn = !!t;
</script>

{#if isLoggedIn}
<div class="flex flex-col h-screen">
    <header>
        <Header />
    </header>
    <main class="flex-grow">
        <SslList />
    </main>
    <footer>
        <Footer />
    </footer>
</div>
{:else}
    <Login errorMessage={loginErr} />
{/if}

<Tailwind />
