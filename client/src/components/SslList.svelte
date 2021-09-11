<script lang="ts">
    import { SslCheckState } from '../../../server/src/types';

    import Badge from './Badge.svelte';
    import Chip from './Chip.svelte';
    import { data, queuestate } from '../shared/store';
</script>

<div class="container my-12 mx-auto px-4 md:px-12">
    <div class="flex flex-wrap -mx-1 lg:-mx-4">
        {#each $data as d}
            <div
                class="
                p-4
                w-full
                xl:w-1/4 xl:mb-6
                lg:w-1/3 lg:mb-6
                md:w-1/2 md:mb-6
                sm:w-1/2 sm:mb-6
                xs:w-1/1
                mb-6
                flex flex-col
                justify-center
                items-center
                mx-auto
            "
            >
                <div
                    class="
                    w-70
                    bg-white
                    -mt-10
                    shadow-lg
                    rounded-lg
                    overflow-hidden
                    min-w-full
                    p-5
                "
                >
                    <div class="header-content flex w-full justify-between">
                        <Badge success={d.valid} />
                        <div class="text-sm">
                            <span
                                title="{d.daysRemaining} days remaining until the certificate runs out"
                                class="tag is-medium mt-2 {d.daysRemaining > 30
                                    ? 'is-success'
                                    : d.daysRemaining < 5
                                    ? 'is-danger'
                                    : 'is-warning'}"
                            >
                                {d.daysRemaining} days remaining
                            </span>
                        </div>
                    </div>
                    <div class="font-medium mt-2">
                        <a
                            class="has-text-white"
                            target="_blank"
                            href="//{d.host}"
                        >
                            {d.host}
                        </a>
                    </div>

                    <div
                        class="
                        text-base text-justify
                        divide-y divide-solid
                        pb-4
                    "
                    >
                        <span class="mt-1 mb-2 block">
                            {#if d.validFrom}
                                {new Date(d.validFrom).toLocaleDateString()}
                                -
                                {new Date(d.validTo).toLocaleDateString()}
                            {:else}
                                could not get dates
                            {/if}
                        </span>
                        <div class="max-h-5 text-sm">
                            {#if d.state === SslCheckState.OK}
                                <p class="pt-1 mb-2 block px-1">
                                    {#each d.validFor.slice(0, d.validFor.length > 2 ? 2 : d.validFor.length) as h}
                                        <Chip text={h} title={h} />
                                    {/each}
                                    {d.validFor.length > 2 ? '...' : ''}
                                </p>
                            {/if}

                            {#if d.state === SslCheckState.ERROR}
                                <p class="mt-2 pt-1 mb-2 px-1">
                                    <code>
                                        {d.message}
                                    </code>
                                </p>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        {/each}
        {#if !$data || $data.length < 1}
            <div
                class="
                w-70
                bg-yellow-500
                -mt-10
                shadow-lg
                rounded-lg
                overflow-hidden
                min-w-full
                p-5
                "
            >
                <p>
                    Currently there are no SSL entries we could list.
                    {#if !$queuestate.connected}
                    <br>There is no connection to the backend, please check that.
                    {/if}
                </p>
            </div>
        {/if}
    </div>
</div>
