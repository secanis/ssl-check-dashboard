<script lang="ts">
    export let success: boolean = false;
    export let errorColor: string = 'red';

    function getColorClass(opacity: number): string {
        return 'bg-' + errorColor + '-' + opacity;
    }
</script>

<div class={(success ? 'bg-green-100' : getColorClass(100)) + ' h-4 w-4 m rounded-full m-1'}>
    <div class={(success ? 'bg-green-500' : getColorClass(500)) + ' h-2 w-2 rounded-full m-1'}/>
</div>
