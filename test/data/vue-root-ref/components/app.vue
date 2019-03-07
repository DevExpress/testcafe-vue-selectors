<template lang='pug'>
    #app
        h2 Cricket Players
        app-table(ref='table-1' :data='cricketPlayers')
        h2 Football Players
        app-table(ref='table-2' :data='footballPlayers')
</template>

<script>
    import AppTable from './table.vue';

    export default {
        name: 'App',
        components: {
            AppTable
        },
        data() {
            return {
                cricketPlayers: [
                    { name: 'Sachin', email: 'sachintendulkar@cricket.com' },
                    { name: 'Yuvraj', email: 'yuvrajsingh@cricket.com' },
                    { name: 'Rahul', email: 'rahuldravid@cricket.com' }
                ],
                footballPlayers: [
                    { name: 'Messi', email: 'lionelmessi@football.com' },
                    { name: 'Ronaldo', email: 'cristianoronaldo@football.com' },
                    { name: 'David', email: 'davidbeckham@football.com' }
                ]
            };
        }
    };
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>