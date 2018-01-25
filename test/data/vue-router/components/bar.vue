<template lang="pug">
    #bar
        h1 Header Bar
        list#list-bar-1
        list#list-bar-2
        list#list-bar-3
</template>
<script>
    import List from './list.vue';

    export default {
        components: { List },
        name:       'bar'
    };
</script>
<style>
</style>
