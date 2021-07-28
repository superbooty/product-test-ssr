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
import {productQuery} from "@/gql/productQuery";
import {swatchQuery} from "@/gql/swatchQuery";


import { ref, onMounted } from "vue";
export default {
  

  setup(props) {
    console.log("Item Selector PROPS :: ", props);

    const product = ref(null);
    const swatches = ref(null);
    
    const fetchProduct = (code) => {
        const fetchPromises = [];
        const productPromise = fetch(`https://www.levi.com/nextgen-webhooks/?operationName=product&locale=US-en_US`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                operationName: "product",
                variables: {
                    code: code
                },
                query: productQuery
            }),
        });
        const swatchPromise = fetch(`https://www.levi.com/nextgen-webhooks/?operationName=swatches&locale=US-en_US`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                operationName: "swatches",
                variables: {
                    code: code
                },
                query: swatchQuery
            }),
        });
        fetchPromises.push(productPromise);
        fetchPromises.push(swatchPromise);
        Promise.all(fetchPromises).then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        }).then(function (data) {
            console.log("DATA :: ", data[0]);
            console.log("SWATCHES ::", data[1]);
            product.value = data[0];
            swatches.value = data[1];
        }).catch(function (error) {
            console.log(error);
        });
    }
   
    // hooks
    onMounted(() => {
        fetchProduct("005054891");
    });

    return {
        product,
        swatches
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