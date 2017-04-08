<template>
  <div class="layout">
    <div class="vue-logo">
      <img :src="logo" alt="vue">
    </div>
    <div class="vue-views">
      <transition>
        <!--<keep-alive v-if="$route.meta.keepAlive">
          <router-view></router-view>
        </keep-alive>
        <router-view v-else></router-view>-->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
<script>
  import '../../style/style.scss'
  import logo from './assets/vue-logo.png'

  export default {
    data() {
      return {
        logo
      }
    },
    props: ['router', 'routes'],
  }
</script>
<style lang="sass">
  .layout {
    height: 100%;
    padding: 1em 5%;
  }

  .vue-logo {
    width: 20%;
    margin: 0 auto;
    > img {
      max-width: 100%
    }
  }
</style>
