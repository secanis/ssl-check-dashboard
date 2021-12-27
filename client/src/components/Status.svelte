<script lang="ts">
    import { onDestroy } from 'svelte';
    import { SslError, State } from '../../../server/src/types';

    import Badge from './Badge.svelte';
    import Chip from './Chip.svelte';
    import BellIcon from '../icons/bell-icon.svelte';
    import { sslErrors, queuestate } from '../shared/store';

    let dropdownOpen = false;

    let qState: number;
    let pState: number;
    let generalState: State;
    let textColor: string;
    let pulseColor: string;
    let errors: SslError[] = [];

    const errorSubs = sslErrors.subscribe((e) => {
        pulseColor = getPulseColor(e);
        errors = e;
    });

    const queueSubs = queuestate.subscribe((i) => {
        qState = i.queue;
        pState = i.processing;
        generalState = i;
        textColor = getTextColor(i);
    });

    function getPulseColor(e: SslError[]): string {
        if (e.length > 0) return 'bg-red-200 animate-pulse';
        return pState > 0 || qState > 0
            ? 'bg-blue-200 animate-pulse'
            : 'bg-gray-700';
    }

    function toggleDropdown() {
        dropdownOpen = !dropdownOpen;
    }

    function closeDropdown() {
        dropdownOpen = false;
    }

    function getTextColor(state: State): string {
        if (errors && errors.length > 0) return 'text-red-500';
        if (state.connected && state.queue === 0 && state.processing === 0)
            return 'text-white';
        return 'text-blue-500';
    }

    onDestroy(queueSubs);
    onDestroy(errorSubs);
</script>

<div class="relative">
    <button
        on:click={toggleDropdown}
        class={pulseColor + ' relative rounded-full p-2 focus:outline-none'}
    >
        <span class="h-5 w-5 {textColor}">
            <BellIcon />
        </span>
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
                    <Badge success={!!generalState.connected} />
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
                            >{generalState.connected
                                ? 'Conntected'
                                : 'Disconnected'}</span
                        >
                    </p>
                </span>
                <span
                    href="#"
                    class="flex items-center px-4 py-3 hover:bg-gray-100 -mx-2"
                >
                    <Badge success={qState === 0} errorColor="blue" />
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
                        <span>{qState} items</span>
                    </p>
                </span>
                <span
                    class="flex items-center px-4 py-3 hover:bg-gray-100 -mx-2"
                >
                    <Badge success={pState === 0} errorColor="blue" />
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
                        <span>{pState} items</span>
                    </p>
                </span>
                <span
                    class="flex items-center px-4 py-3 hover:bg-gray-100 -mx-2"
                >
                    <div class="self-start">
                        <Badge success={errors.length === 0} />
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
                            >{errors.length === 0
                                ? 'No Errors'
                                : 'Errors'}</span
                        >
                        <span class="block">
                            {#each errors as { host, message }}
                                <Chip text={host} title={message} />
                            {/each}
                        </span>
                    </p>
                </span>
            </div>
        </div>
    {/if}
</div>
