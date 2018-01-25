<template lang="pug">
    #foo
        h1 Header Foo
        list#list-foo-1
</template>
<script>
    import List from './list.vue';

    export default {
        components: { List },
        name:       'foo'
    };
</script>
<style>
</style>
