<template>
    <header-view></header-view>
      <router-view :key="$route.path"/>
</template>
<script>
import HeaderView from '@/global/Header.vue'

import { onMounted } from "vue";
  
export default {
  name: 'App',
  props: {
    code: {
      type: String,
      required: true,
    },
  },
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
