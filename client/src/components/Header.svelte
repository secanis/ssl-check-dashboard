<script lang="ts">
    import Status from './Status.svelte';
    import LogoutIcon from '../icons/logout-icon.svelte';
    import MinimizeIcon from '../icons/minimize-icon.svelte';
    import MaximizeIcon from '../icons/maximize-icon.svelte';
    import { user, appstate } from '../shared/store.js';
</script>

<nav
    class="
    relative
    flex flex-wrap
    items-center
    justify-between
    px-2
    py-3
    bg-gray-600
    shadow-xl
    mb-3
"
>
    <div
        class="
        container
        px-4
        mx-auto
        flex flex-wrap
        items-center
        justify-between
    "
    >
        <div
            class="
            w-full
            relative
            flex
            justify-between
            lg:w-auto
            px-4
            lg:static lg:block lg:justify-start
        "
        >
            <a
                class="
                text-sm
                font-bold
                leading-relaxed
                inline-block
                mr-4
                py-2
                whitespace-nowrap
                uppercase
                text-white
            "
                href="/"
            >
                SSL Dashboard
            </a>
        </div>
        <div
            class="lg:flex flex-grow items-center sm:width-full"
            id="example-navbar-warning"
        >
            <ul class="flex flex-row list-none ml-auto">
                <li class="nav-item">
                    <button
                        type="button"
                        title="Logout"
                        on:click={user.signout}
                        class="bg-gray-700 hover:bg-gray-500 text-white cursor-pointer relative rounded-full p-2 mr-3 focus:outline-none"
                    >
                        <LogoutIcon />
                    </button>
                </li>
                <li class="nav-item">
                    <button
                        type="button"
                        title="Change Style"
                        on:click={appstate.toggleMinified}
                        class="bg-gray-700 hover:bg-gray-500 text-white cursor-pointer relative rounded-full p-2 mr-3 focus:outline-none"
                    >
                        {#if $appstate.minified}
                            <MaximizeIcon />
                        {:else}
                            <MinimizeIcon />
                        {/if}
                    </button>
                </li>
                <li class="nav-item">
                    <Status />
                </li>
            </ul>
        </div>
    </div>
</nav>
