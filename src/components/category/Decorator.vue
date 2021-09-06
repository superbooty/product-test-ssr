<template>
  <div class="component-wrapper">
    <component :is="content.component" :content="content"></component>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
// import CommerceTwoCol from '@/components/CommerceTwoCol';
// import CommerceFillRow from './CommerceFillRow.vue';
// import Griddy from './Griddy.vue';
const getTwoCol = defineAsyncComponent(
  () => import('./CommerceTwoCol.vue')
);
const getFillRow = defineAsyncComponent(
  () => import('./CommerceFillRow.vue')
);
const getGriddy = defineAsyncComponent(
  () => import('./Griddy.vue')
);
// const getTwoCol = () => import('../components/CommerceTwoCol.vue');
// const getFillRow = () => import( '../components/CommerceFillRow.vue');
// const getGriddy = () => import( '../components/Griddy.vue');

export default {
  name: "Decorator",
  props: {
    content: Object
  },
  components: {
    CommerceTwoCol: getTwoCol,
    CommerceFillRow: getFillRow,
    Griddy: getGriddy,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.component-wrapper {
  height: 100%;
  position: relative;
}
</style>
