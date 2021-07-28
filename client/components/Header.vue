<template>
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
                <button
                    class="
                        cursor-pointer
                        text-xl
                        leading-none
                        px-3
                        py-1
                        border border-solid border-transparent
                        rounded
                        bg-transparent
                        block
                        lg:hidden
                        outline-none
                        focus:outline-none
                    "
                    type="button"
                >
                    <span
                        class="block relative w-6 h-px rounded-sm bg-white"
                    ></span>
                    <span
                        class="block relative w-6 h-px rounded-sm bg-white mt-1"
                    ></span>
                    <span
                        class="block relative w-6 h-px rounded-sm bg-white mt-1"
                    ></span>
                </button>
            </div>
            <div
                class="lg:flex flex-grow items-center"
                id="example-navbar-warning"
            >
                <ul class="flex flex-col lg:flex-row list-none ml-auto">
                    <li class="nav-item">
                        <Status :data="state" :errors="errors" />
                    </li>
                    <!-- <li class="nav-item">
                        <a
                            class="
                                px-3
                                py-2
                                flex
                                items-center
                                text-xs
                                uppercase
                                font-bold
                                leading-snug
                                text-white
                                hover:opacity-75
                            "
                            href="#pablo"
                        >
                            Setting
                        </a>
                    </li> -->
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { SslError, State } from '~/server/src/types';

@Component({
    name: 'Header',
})
export default class Header extends Vue {
    @Prop()
    private state!: State;
    @Prop()
    private errors!: SslError[];
}
</script>
