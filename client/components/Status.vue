<template>
    <div class="relative">
        <button
            @click="dropdownOpen = !dropdownOpen"
            class="relative rounded-full p-2 focus:outline-none"
            :class="`${getPulseColor()}`"
        >
            <svg
                class="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                />
            </svg>
        </button>
        <div
            v-if="dropdownOpen"
            @click="dropdownOpen = false"
            class="fixed inset-0 h-full w-full z-10"
        ></div>

        <div
            v-if="dropdownOpen"
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
                    <Badge :success="data.connectState === 'connected'" />
                    <p
                        class="
                            text-gray-600 text-sm
                            mx-2
                            w-full
                            flex
                            justify-between
                        "
                    >
                        <span class="font-bold">{{ data.connectState }}</span>
                    </p>
                </span>
                <a
                    href="#"
                    class="flex items-center px-4 py-3 hover:bg-gray-100 -mx-2"
                >
                    <Badge :success="data.queue === 0" error-color="blue" />
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
                        <span>{{ data.queue }} items</span>
                    </p>
                </a>
                <a
                    href="#"
                    class="flex items-center px-4 py-3 hover:bg-gray-100 -mx-2"
                >
                    <Badge
                        :success="data.processing === 0"
                        error-color="blue"
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
                        <span>{{ data.processing }} items</span>
                    </p>
                </a>
                <a
                    href="#"
                    class="flex items-center px-4 py-3 hover:bg-gray-100 -mx-2"
                >
                    <Badge class="self-start" :success="errors.length === 0" />
                    <p
                        class="
                            text-gray-600 text-sm
                            mx-2
                            w-full
                            flex
                            justify-between
                        "
                    >
                        <span class="font-bold">{{
                            errors.length === 0 ? 'No Errors' : 'Errors'
                        }}</span>
                        <span class="block">
                            <Chip
                                :text="e.host"
                                v-for="e in errors"
                                :key="e.host"
                                :title="e.message"
                            />
                        </span>
                    </p>
                </a>
                <!-- <a
                    href="#"
                    class="
                        flex
                        items-center
                        px-4
                        py-3
                        border-b
                        hover:bg-gray-100
                        -mx-2
                    "
                >
                    <img
                        class="h-8 w-8 rounded-full object-cover mx-1"
                        src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                        alt="avatar"
                    />
                    <p class="text-gray-600 text-sm mx-2">
                        <span class="font-bold" href="#">Slick Net</span> start
                        following you . 45m
                    </p>
                </a> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { SslError, State } from '~/server/src/types';

@Component({
    name: 'Status',
})
export default class Status extends Vue {
    @Prop()
    private data!: State;

    @Prop()
    private errors!: SslError[];

    private dropdownOpen: boolean = false;

    getPulseColor(): string {
        if (this.errors.length > 0) return 'bg-red-500 animate-pulse';
        return this.data.queue > 0 || this.data.processing > 0
            ? 'bg-blue-500 animate-pulse'
            : '';
    }
}
</script>
