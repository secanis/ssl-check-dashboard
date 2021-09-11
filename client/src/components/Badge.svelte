<script lang="ts">
    export let success: boolean;
    export let errorColor: string = 'red';

    function getColor(): string {
        return errorColor || 'red';
    }
</script>

<div
    class="h-4 w-4 m rounded-full m-1 {success
        ? 'bg-green-100'
        : 'bg-' + getColor() + '-100'}"
>
    <div
        class="h-2 w-2 rounded-full m-1 {success
            ? 'bg-green-500'
            : 'bg-' + getColor() + '-500'}"
    />
</div>
