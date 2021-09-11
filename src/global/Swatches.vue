<template>
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
</template>
<script>
export default {
  name: "Swatches",
  props: {
    swatches: Object,
  },
  setup() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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

</style>

