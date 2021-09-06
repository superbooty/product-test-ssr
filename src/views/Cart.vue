<template>
  <div class="cart-container">
    <section class="cart-header"></section>
    <section class="cart-items"></section>
    <section class="cart-details"></section>
  </div>
  <simple-carousel v-if="product" :images="processedImgArray"></simple-carousel>
</template>

<script>
import SimpleCarousel from "../components/carousel/SimpleCarousel.vue";

// import {appState} from "@/state/appState";

import { appState } from "@/state/appState";

import { ref, onMounted, computed } from "vue";
export default {
  props: {
    cartGuid: {
      type: String,
      required: true,
    },
    swatchClick: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    console.log("Item Selector PROPS :: ", props);

    const { getStateObj } = appState();

    const cartRef = ref(null);
    const productRef = ref(null);

    // fetchProduct(props.code);

    // computed

    const cart = computed(() => {
      return cartRef.value;
    });

    const product = computed(() => {
      const stateObj = getStateObj();
      return productRef.value;
    });

    // hooks
    onMounted(() => {
      console.log("CART IS MOUNTED ...", getAppStateObj());
    });

    return {
      cart,
      product,
      swatches,
      processedImgArray,
    };
  },

  components: {
    SimpleCarousel,
  },
};
</script>

<style scoped lang="scss">
.cart-container {
  display: flex;
  flex-direction: row;
}
</style>