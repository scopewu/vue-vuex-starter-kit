<template>
  <div class="Header">
    <div class="Header-padding">
      <div class="text-center">
        <router-link to="/" exact>Home</router-link>
        <span> - </span>
        <router-link :to="{name: 'counter'}">Counter</router-link>
        <span> - </span>
        <router-link :to="{name: 'geographicalIp'}">Geographical Ip</router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {}
</script>
<style scoped>
  .Header-padding {
    padding: 0.5em 0;
  }
</style>
