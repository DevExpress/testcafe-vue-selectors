<template lang="pug">
    div
        app-row(
            v-for='(item, index) in data'
            :key='item.name'
            :data='item'
            :ref='"row-" + (index + 1)'
        )
</template>

<script>
    import AppRow from './row.vue';

    export default {
        name: 'Table',
        props: {
            data: Array
        },
        components: {
            AppRow
        }
    };
</script>

<style scoped>
</style>