<template>
    <div v-if="data" class="product-img">
      <sized-image
        :image="data.data.product.galleryImageList.galleryImage[0]"
        :aspect-ratio="aspectRatio"
        :disable-bottom-crop="true"
        product-alt="testing"
      />
    </div>
</template>

<script>
import SizedImage from "@/global/SizedImage.vue";

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
    },
    aspectRatio: {
      type: String,
      default: "pdpWide",
    },
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

  components: {
    SizedImage,
  }
};
</script>

<style scoped lang="scss">
  .product-img {
    img {
      width: 80%;
    }
  }
</style>