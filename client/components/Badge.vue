<template>
    <div
        class="h-4 w-4 m rounded-full m-1"
        :class="`${success ? 'bg-green-100' : 'bg-' + getColor() + '-100'}`"
    >
        <div
            class="h-2 w-2 rounded-full m-1"
            :class="`${success ? 'bg-green-500' : 'bg-' + getColor() + '-500'}`"
        ></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
    name: 'Badge',
})
export default class Badge extends Vue {
    @Prop({ type: Boolean })
    private success!: boolean;

    @Prop({ type: String })
    private errorColor!: string;

    getColor(): string {
        return this.errorColor || 'red';
    }
}
</script>
