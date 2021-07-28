<template>
    <div v-if="data" class="product-img">
        <img :src="data.data.product.galleryImageList.galleryImage[0].url" />
    </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    data: {
      type: Object,
      default: null
    },
    message: String,
    highlight: {
        type: Boolean,
        default: false,
    },
    separator: {
      type: Boolean,
      default: false,
    }
  },

  setup(props, {emit}) {
    console.log("Item Selector PROPS :: ", props);

    const product = ref(null);

    // methods
    const atcProduct = (code) => {
        emit("open-modal", code);
    }

    return {
      product,
      atcProduct
    };
  },
};
</script>

<style scoped lang="scss">
  .product-img {
    img {
      width: 80%;
    }
  }
</style>