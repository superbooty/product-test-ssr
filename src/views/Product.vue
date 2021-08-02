<template>
  <div v-if="product" class="bread-crumb">{{product.data.product.lscoBreadcrumbs[3].name}}</div>
  <div v-if="product" class="product-container">
    <section class="product-hero">
        <product-image :data="product"></product-image>
    </section>
    <section class="product-details">
        <product-details :data="product" :swatches="swatches"></product-details>
    </section>
  </div>
  <simple-carousel v-if="product" :images="product.data.product.galleryImageList.galleryImage"></simple-carousel>
</template>

<script>
import ProductImage from "../components/product/ProductImage.vue";
import ProductDetails from "../components/product/ProductDetails.vue";
import SimpleCarousel from "../components/carousel/SimpleCarousel.vue";

// import {appState} from "@/state/appState";


import {appState} from "@/state/appState";


import { ref, onMounted, nextTick } from "vue";
export default {
  
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    console.log("Item Selector PROPS :: ", props);

    const { fetchProduct } = appState();

    const product = ref(null);
    const swatches = ref(null);

    // fetchProduct(props.code);
   
    // hooks
    onMounted(() => {
        nextTick(() => {
            if (window.window.__PUPPETEER_PRODUCT_CTX__ &&
                window.window.__PUPPETEER_PRODUCT_CTX__.code === props.code) {
                product.value = window.__PUPPETEER_PRODUCT_CTX__.product;
                swatches.value = window.__PUPPETEER_PRODUCT_CTX__.swatches;
            } else {
                fetchProduct(props.code).then(function (data) {
                console.log("DATA :: ", data[0]);
                console.log("SWATCHES ::", data[1]);
                product.value = data[0];
                swatches.value = data[1];
                }).catch(function (error) {
                    console.log(error);
                });
            }
        })
    });

    return {
        product,
        swatches,
    };
  },
  
  
  components: {
    ProductImage,
    ProductDetails,
    SimpleCarousel,
  },
};
</script>

<style scoped lang="scss">
    .bread-crumb {
        text-align: left;
        padding-left: 20px;
        font-weight: 600;
        font-size: 14px;
        &:before {
            content: '\27E8';
            font-weight: 900;
            font-size: 16px;
            margin-right: 4px;
        }
    }
    .product-container {
        display: flex;
        flex-direction: row;
        .product-hero {
            flex-basis: 60vw;
            text-align: left;
        }
        .product-details {
            flex-basis: 32vw;
            text-align: left;
        }
    }
</style>