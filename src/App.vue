<template>
  <header-section></header-section>
  <product-view></product-view>
</template>

<script>
import HeaderSection from './global/Header.vue'
import ProductView from './views/Product.vue'

export default {
  name: 'App',
  components: {
    ProductView,
    HeaderSection
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
