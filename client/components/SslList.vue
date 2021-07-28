<template>
    <div class="container my-12 mx-auto px-4 md:px-12">
        <!-- <div>data STATE: {{ getData }}</div> -->
        <div class="flex flex-wrap -mx-1 lg:-mx-4">
            <!-- // ---- -->

            <div
                class="
                    p-4
                    w-full
                    xl:w-1/4 xl:mb-6
                    lg:w-1/3 lg:mb-6
                    md:w-1/2 md:mb-6
                    sm:w-1/2 sm:mb-6
                    xs:w-1/1
                    sm:mb-6 sm:mb-6
                    mb-6
                    flex flex-col
                    justify-center
                    items-center
                    mx-auto
                "
                v-for="d in sslData"
                :key="d.host"
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
                        <Badge :success="d.valid" />
                        <div class="text-sm">
                            <span
                                :title="`${d.daysRemaining} days remaining until the certificate runs out`"
                                class="tag is-medium mt-2"
                                :class="`${
                                    d.daysRemaining > 30
                                        ? 'is-success'
                                        : d.daysRemaining < 5
                                        ? 'is-danger'
                                        : 'is-warning'
                                }`"
                            >
                                {{ d.daysRemaining }} days remaining
                            </span>
                        </div>
                    </div>
                    <div class="font-medium mt-2">
                        <a
                            class="has-text-white"
                            target="_blank"
                            :href="`//${d.host}`"
                        >
                            {{ d.host }}
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
                            {{ d.validFrom }}
                            -
                            {{ d.validTo }}
                        </span>
                        <div class="max-h-5 text-sm">
                            <p
                                class="pt-1 mb-2 block px-1"
                                v-if="d.state === SslCheckState.OK"
                            >
                                <Chip
                                    b
                                    :text="h"
                                    v-for="h in d.validFor.slice(
                                        0,
                                        d.validFor.length > 2
                                            ? 2
                                            : d.validFor.length
                                    )"
                                    :key="h.validFor"
                                />
                                {{ d.validFor.length > 2 ? '...' : '' }}
                            </p>
                            <p
                                class="mt-2 pt-1 mb-2 px-1"
                                v-if="d.state === SslCheckState.ERROR"
                            >
                                <code>
                                    {{ d.message }}
                                </code>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- // ---- -->

            <!-- <div
                class="
                    my-1
                    px-1
                    w-full
                    md:w-1/2
                    lg:my-4 lg:px-4 lg:w-1/3
                    overflow-hidden
                    rounded-lg
                    shadow-lg
                "
                v-for="d in getData"
                :key="d.host"
            >
                <header
                    class="
                        card-header
                        is-flex is-justify-content-space-between
                        {d.valid
                        ?
                        'has-background-success'
                        :
                        'has-background-danger'}
                    "
                >
                    <span class="card-header-title">
                        <i
                            class="has-text-white"
                            :data-feather="`${
                                d.valid ? 'check-circle' : 'alert-circle'
                            }`"
                        />
                        <a
                            class="has-text-white ml-3"
                            target="_blank"
                            :href="`//${d.host}`"
                            >{{ d.host }}</a
                        >
                    </span>
                    <span
                        :title="`${d.daysRemaining} days remaining until the certificate runs out`"
                        class="tag is-medium mt-2"
                        :class="`${
                            d.daysRemaining > 30
                                ? 'is-success'
                                : d.daysRemaining < 5
                                ? 'is-danger'
                                : 'is-warning'
                        }`"
                        >{{ d.daysRemaining }}</span
                    >
                </header>
                <div class="card-content">
                    <div class="content">
                        <p>
                            {{ d.validFrom }}
                            -
                            {{ d.validTo }}
                        </p>
                        <p>
                            {#each d.validFor.slice(0, d.validFor.length > 5 ? 4
                            : d.validFor.length) as h}
                            <span class="tag is-grey mr-1 mb-1">{h}</span>
                            {/each} {d.validFor.length > 5 ? '...' : ''}
                        </p>
                    </div>
                </div>
            </div> -->
        </div>
        <!-- {#if errors.length > 0}
        <div class="notification is-warning mt-5">
            {#each errors as e}
            <span
                >We got an error verifing
                <span class="has-text-weight-bold">{e}</span>, we try
                again</span
            ><br />
            {/each}
        </div>
        {/if} -->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { SslCheck, SslCheckState } from '../../server/src/types';

@Component({
    name: 'Cache',
})
export default class Cache extends Vue {
    @Prop()
    private sslData!: SslCheck[];

    SslCheckState = SslCheckState;
}
</script>
