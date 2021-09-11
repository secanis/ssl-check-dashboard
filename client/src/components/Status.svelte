<script lang="ts">
    import { State } from '../../../server/src/types';

    import Badge from './Badge.svelte';
    import Chip from './Chip.svelte';
    import { sslErrors, queuestate } from '../shared/store';

    let dropdownOpen = false;

    function getPulseColor(): string {
        if ($sslErrors.length > 0) return 'bg-red-500 animate-pulse';
        return $queuestate.queue > 0 || $queuestate.processing > 0
            ? 'bg-blue-500 animate-pulse'
            : '';
    }

    function toggleDropdown() {
        dropdownOpen = !dropdownOpen;
    }

    function closeDropdown() {
        dropdownOpen = false;
    }

    function calculateCurrentTotalStatus(state: State): string {
        if (state.connected && state.queue === 0 && state.processing === 0) return 'text-white';
        if (state.connected && state.queue === 0 && state.processing > 0) return 'text-blue-500 animate-pulse';
        return 'text-red-500 animate-pulse';
    }
</script>

<div class="relative">
    <button
        on:click={toggleDropdown}
        class="relative rounded-full p-2 focus:outline-none {getPulseColor()}"
    >
        <svg
            class="h-5 w-5 {calculateCurrentTotalStatus($queuestate)}"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
            />
        </svg>
    </button>
    {#if dropdownOpen}
        <div
            on:click={closeDropdown}
            class="fixed inset-0 h-full w-full z-10"
        />
    {/if}

    {#if dropdownOpen}
        <div
            class="
            absolute
            right-0
            mt-2
            bg-white
            rounded-md
            shadow-lg
            overflow-hidden
            z-20
        "
            style="width: 20rem"
        >
            <div class="py-2">
                <span
                    class="flex items-center px-4 py-3 hover:bg-gray-100 -mx-2"
                >
                    <Badge success={!!$queuestate.connected} />
                    <p
                        class="
                        text-gray-600 text-sm
                        mx-2
                        w-full
                        flex
                        justify-between
                    "
                    >
                        <span class="font-bold"
                            >{$queuestate.connected
                                ? 'Conntected'
                                : 'Disconnected'}</span
                        >
                    </p>
                </span>
                <span
                    href="#"
                    class="flex items-center px-4 py-3 hover:bg-gray-100 -mx-2"
                >
                    <Badge
                        success={$queuestate.queue === 0}
                        errorColor="blue"
                    />
                    <p
                        class="
                        text-gray-600 text-sm
                        mx-2
                        w-full
                        flex
                        justify-between
                    "
                    >
                        <span class="font-bold">Queue</span>
                        <span>{$queuestate.queue} items</span>
                    </p>
                </span>
                <span
                    class="flex items-center px-4 py-3 hover:bg-gray-100 -mx-2"
                >
                    <Badge
                        success={$queuestate.processing === 0}
                        errorColor="blue"
                    />
                    <p
                        class="
                        text-gray-600 text-sm
                        mx-2
                        w-full
                        flex
                        justify-between
                    "
                    >
                        <span class="font-bold">Processing</span>
                        <span>{$queuestate.processing} items</span>
                    </p>
                </span>
                <span
                    class="flex items-center px-4 py-3 hover:bg-gray-100 -mx-2"
                >
                    <div class="self-start">
                        <Badge success={$sslErrors.length === 0} />
                    </div>
                    <p
                        class="
                        text-gray-600 text-sm
                        mx-2
                        w-full
                        flex
                        justify-between
                    "
                    >
                        <span class="font-bold"
                            >{$sslErrors.length === 0
                                ? 'No Errors'
                                : 'Errors'}</span
                        >
                        <span class="block">
                            {#each $sslErrors as { host, message }}
                                <Chip text={host} title={message} />
                            {/each}
                        </span>
                    </p>
                </span>
            </div>
        </div>
    {/if}
</div>
