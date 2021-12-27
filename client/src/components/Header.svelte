<script lang="ts">
    import Status from './Status.svelte';
    import LogoutIcon from '../icons/logout-icon.svelte';
    import { user } from '../shared/store.js';
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
        <div class="lg:flex flex-grow items-center" id="example-navbar-warning">
            <ul class="flex flex-col lg:flex-row list-none ml-auto">
                <li class="nav-item">
                    <button
                        type="button"
                        title="Logout"
                        on:click={user.signout}
                        class="bg-gray-700 text-white cursor-pointer relative rounded-full p-2 mr-3 focus:outline-none"
                    >
                        <LogoutIcon />
                    </button>
                </li>
                <li class="nav-item">
                    <Status />
                </li>
            </ul>
        </div>
    </div>
</nav>
