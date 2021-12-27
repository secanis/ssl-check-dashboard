<script lang="ts">
    export let text: string;
    export let title: string;
</script>

<span
    class="
    inline-block
    items-center
    rounded-full
    bg-gray-100
    p-1
    pr-3
    pl-3
    mt-2
    ml-2
    mb-8
    truncate
    max-w-xs
"
    {title}
>
    { text }
</span>
