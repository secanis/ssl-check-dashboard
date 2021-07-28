<template>
    <footer class="p-2 text-xs">
        <a href="//secanis.ch" title="link to secanis.ch"
            >developed with love by secanis.ch</a
        >
    </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
    name: 'Footer',
})
export default class Footer extends Vue {}
</script>
