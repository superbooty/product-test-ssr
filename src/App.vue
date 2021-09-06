<template>
    <header-view></header-view>
    <!-- Notice the keep alive, this saves a copy of the entire view to memory -->
    <router-view :key="$route.path" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
</template>
<script>
import HeaderView from '@/global/Header.vue'

import { onMounted } from "vue";
  
export default {
  name: 'App',
  setup() {
    onMounted(() => {
      console.log("VUE :: ", document.querySelector(".product-details"));
    })
  },
  components: {
    HeaderView
  }
}
</script>


<style lang="scss">
#app {
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #141414;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
