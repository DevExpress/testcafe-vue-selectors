<template lang="pug">
    #app
        h1 Header
        list#list1
        list#list2
</template>
<script>
    import List from './list.vue';

    export default {
        components: { List },
        name:       'app'
    };
</script>
<style>
</style>
