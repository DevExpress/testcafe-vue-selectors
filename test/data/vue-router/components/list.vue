<template lang="pug">
    .list-wrapper
        h4 {{ id }}
        ul(:id='id')
            each index in [1, 2, 3]
                list-item(:id=`getId(${index})`)
</template>
<script>
    import ListItem from './list-item.vue';

    export default {
        components: { ListItem },
        name:       'list',
        props:      ['id'],
        computed:   {
            reversedId: function () {
                return this.id.split('').reverse().join('');
            }
        },
        methods:    {
            getId: function (postfix) {
                return this.id + '-item' + postfix;
            }
        }
    };
</script>
<style>
    .list-wrapper {
        border-left: dashed 4px #8BC34A;
        width: 400px;
    }

    h4 {
        border-bottom: solid 3px beige;
        margin: 0 20px;
    }
</style>
