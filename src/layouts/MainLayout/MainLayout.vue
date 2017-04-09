<template>
  <div class="layout">
    <div class="vue-logo">
      <img src="./assets/vue-logo.png" alt="vue">
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
  //import logo from './assets/vue-logo.png'

  export default {
    data() {
      return {
        //logo
      }
    },
  }
</script>
<style src="./MainLayout.scss" lang="sass" scoped></style>
