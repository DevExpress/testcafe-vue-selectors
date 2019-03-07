<template lang="pug">
    .row
        div(
            v-for='key in Object.keys(data)'
            :key='key'
            :style='{ width: 100 / Object.keys(data).length - 10 + "%" }') {{ data[key] }}
</template>
<script>
  export default {
      name: 'Row',
      props: {
          data: Object
      }
  };
</script>
<style scoped>
    .row > div {
        border: 1px solid black;
        display: inline-block;
        padding: 10px;
    }
</style>