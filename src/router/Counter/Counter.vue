<template>
  <div class="counter">
    <div class="count">Count: {{count}}</div>
    <div class="count-btns">
      <button type="button" class="btn btn-default" @click="countIncrement">increment</button>
      <button type="button" class="btn btn-default" @click="countDecrement">decrement</button>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    computed: mapState([
      'count'
    ]),
    methods: mapActions([
      'countIncrement',
      'countDecrement'
    ])
  }
</script>
<style lang="scss" scoped>
  .count {
    margin: 1em 0;
  }

  .count-btns {
    > .btn {
      margin-right: 10px;
    }
  }
</style>
