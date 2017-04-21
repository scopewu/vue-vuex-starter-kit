<template>
  <div class="layout">
    <div class="vue-logo">
      <img src="./assets/vue-logo.png" alt="vue">
    </div>
    <v-header></v-header>
    <div class="vue-views">
      <transition name="fade" mode="out-in">
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

  //import VHeader from '@/components/VHeader'
  import VHeader from '../../components/VHeader'

  export default {
    data() {
      return {
        //logo
      }
    },
    components: {
      VHeader
    }
  }
</script>
<style src="./MainLayout.scss" lang="sass"></style>
