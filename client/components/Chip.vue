<template>
    <span
        class="
            inline-flex
            items-center
            rounded-full
            bg-gray-100
            p-1
            pr-3
            pl-3
            mt-2
            ml-2
            mb-8
        "
    >
        {{ text }}
    </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
    name: 'Chip',
})
export default class Chip extends Vue {
    @Prop({ type: String })
    private text!: string;
}
</script>
