<script lang="ts">
    import { user } from '../shared/store.js';
    import Footer from './Footer.svelte';

    export let errorMessage: string | null = null;

    let defaultUser = {
        username: '',
        password: '',
    };

    function onSubmit(e: SubmitEvent | any) {
        const formData = new FormData(e.target);
        const data = {
            username: formData.get('username')?.toString(),
            password: formData.get('password')?.toString(),
        };
        if (data.username && data.password) {
            user.signin(data.username, data.password);
        }
    }
</script>

<div class="flex flex-col h-screen">
    <div class="flex-grow flex justify-center items-center">
        <form
            on:submit|preventDefault={onSubmit}
            class="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6"
        >
            <h1
                class="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
                SSL Dashboard
            </h1>
            <div class="mb-2">
                <label
                    class="block text-gray-700 text-sm font-bold mb-1"
                    for="username">Username</label
                >
                <input
                    type="text"
                    name="username"
                    autocomplete="username"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    bind:value={defaultUser.username}
                />
            </div>
            <div class="mb-2">
                <label
                    class="block text-gray-700 text-sm font-bold mb-1"
                    for="password">Password</label
                >
                <input
                    type="password"
                    name="password"
                    autocomplete="password"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    bind:value={defaultUser.password}
                />
            </div>
            <div class="flex items-center justify-between">
                <button
                    type="submit"
                    class="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                >
                    Login
                </button>
                {#if errorMessage}
                    <span class="text-red-500 text-xs italic"
                        >{errorMessage}, wrong login?</span
                    >
                {/if}
            </div>
        </form>
    </div>
    <Footer />
</div>
