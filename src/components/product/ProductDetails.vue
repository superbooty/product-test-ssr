<template>
    <div v-if="data" class="product-details" >
        <div class="product-name">{{ data.data.product.name }}</div>
        <div class="swatches-wrapper">
            <div class="color">Color: {{ data.data.product.colorName }}</div>
            <ul >
                <li v-for="(swatch) in swatches.data.swatches.swatches" :key="swatch.code">
                    <div :class="{'selected': isSelected(swatch.code)}"></div>
                    <router-link :to="{ name: 'Product', params: { code: swatch.code, swatchClick: true }}"><img :src="swatch.imageUrl" /></router-link>
                    <!-- <a :href="`/product/${swatch.code}`"><img :src="swatch.imageUrl" /></a> -->
                </li>
            </ul>
        </div>
        <section class="size-tiles">
          <div v-if="data.data.product.variantWaist?.length > 0" class="size-label" >Waist {{selectedWaist}}</div>
          <ul class="size-grid" v-if="data.data.product.variantWaist">
            <li  v-for="(waist, i) in data.data.product.variantWaist"
            :class="{selected: sizeTilesWaist[i] == selectedWaist}"
            :key="`w${i}-${waist}`" @click="setSelectedWaist(i)">
              {{waist}}
            </li>
          </ul>
          <div v-if="data.data.product.variantLength?.length > 0" class="size-label" >Length {{selectedLength}}</div>
          <ul class="size-grid" v-if="data.data.product.variantLength">
            <li v-for="(lengthSize, i) in data.data.product.variantLength"
            :class="{selected: sizeTilesLength[i] == selectedLength}"
            :key="`l${i}-${lengthSize}`" @click="setSelectedLength(i)">
              {{lengthSize}}
            </li>
          </ul>
          <div v-if="data.data.product.variantSize?.length > 0" class="size-label" >Size</div>
          <ul class="size-grid" v-if="data.data.product.variantSize">
            <li  v-for="(size, i) in data.data.product.variantSize"
            :key="`l${i}-${size}`" @click="setSelectedSize(i)">
              {{size}}
            </li>
          </ul>
        </section>
        <div class="product-price">{{ data.data.product.price.formattedValue }}</div>
        <add-to-bag></add-to-bag>
    </div>
</template>

<script>
// import { ref } from "vue";

import AddToBag from "./AddToBag.vue";

import {appState} from "@/state/appState";

import { ref, computed } from 'vue';

export default {
  props: {
    data: {
      type: Object,
      default: null
    },
    swatches: {
        type: Object,
        default: null
    }
  },

  setup(props) {
    console.log("Item Selector PROPS :: ", props);

    const {getStateObj} = appState();

    const selectedWaist = ref("");
    const selectedLength = ref("");

    const setSelectedWaist = (index) => {
        console.log("WAIST :: ", sizeTilesWaist.value, index);
        selectedWaist.value = sizeTilesWaist.value[index];
        getStateObj().selectedSizes.waist = selectedWaist.value;
    }
    
    const setSelectedLength = (index) => {
        console.log("LENGTH :: ", sizeTilesLength.value), index;
        selectedLength.value = sizeTilesLength.value[index];
        getStateObj().selectedSizes.length = selectedLength.value;
    }
    
    const isSelected = (code) => {
      return code === props.data.data.product.code;
    }

    // computed
    const sizeTilesWaist = computed(() => {
      return props.data.data.product.variantWaist; 
    });

    const sizeTilesLength = computed(() => {
      return props.data.data.product.variantLength;
    });

    return {
        setSelectedLength,
        setSelectedWaist,
        sizeTilesWaist,
        sizeTilesLength,
        selectedWaist,
        selectedLength,
        isSelected,
    }
  },
  components: {
    AddToBag,
  },
};
</script>

<style scoped lang="scss">
    .product-details {
        padding: 10px 0;
        .product-price {
            color: #000;
            font-size: 20px;
            line-height: 28px;
            font-family: Helvetica-Now-Text-Bold,Helvetica,Arial,sans-serif;
            font-weight: 700;
            margin: 20px 0;
        }
        .size-tiles {
            font-family: Avenir, Helvetica, Arial, sans-serif;
            font-family: Avenir, Helvetica, Arial, sans-serif;
            display: grid;
            grid-template-rows: auto;
            grid-row-gap: 5px;
            .size-label {
                font-size: 14px;
                font-weight: 600;
                margin: 15px 0 0 0;
            }
            ul {
                padding: 0;
                margin: 0;
                li {
                    &.selected {
                        height: 40px;
                        width: 40px;
                        line-height: 40px;
                        border: 1px solid #a3a3a3;
                        border-radius: 4px;
                    }
                    display: inline-block;
                    white-space: nowrap;
                    width: 42px;
                    height: 42px;
                    list-style: none;
                    line-height: 42px;
                    text-align: center;
                    padding: 2px;
                    margin: 3px;
                    font-size: 12px;
                }
            }
        }
        .product-name {
            font-size: 18px;
            text-transform: uppercase;
            font-weight: 800;
        }
        .swatches-wrapper {
            margin: 20px 0;
            .color {
              color: #6e6e6e;
              line-height: 20px;
              font-size: 12px;
            }
            ul {
                list-style-type: none;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                padding: 0;
                margin: 5px 0;
                li {
                    position: relative;
                    padding: 5px 10px 5px 2px;
                    width: 24px;
                    height: 24px;
                    div {
                      display: none;
                      position: absolute;
                      &.selected {
                        display: block;
                        height: 28px;
                        width: 28px;
                        top: 2px;
                        left: -1px;
                        border: 1px solid #4c4c4c;
                        border-radius: 30px;
                      }
                    }
                    img {
                        border-radius: 30px;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
</style>
