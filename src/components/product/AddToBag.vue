<template>
  <div class="add-to-cart">
    <button
      class="atc-btn" @click="addToBag">
      Add to Bag
    </button>
  </div>
</template>

<script>

import {appState} from "@/state/appState";
  
export default {
  name: 'App',
  props: {
  },
  setup() {
    const {getStateObj} = appState();

    console.log("STATE OBJ ::",getStateObj());

    const addToBag = () => {
      console.log("ADD TO BAG ...");
      const appState = getStateObj();
      console.log("SELECTED SIZES :: ", appState.product, appState.selectedSizes)

    } 
    return {
      addToBag
    }
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
    .add-to-cart {
        .atc-btn {
            appearance: none;
            background-color: transparent;
            border-radius: 0;
            cursor: pointer;
            display: inline-block;
            line-height: 1;
            padding: 0;
            text-align: center;
            text-decoration: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            vertical-align: middle;
            color: #000;
            font-size: 16px;
            line-height: 24px;
            font-family: Helvetica,Arial,sans-serif;
            font-weight: 700;
            background-color: #070b21;
            border: 0;
            border-radius: 2px;
            text-transform: none;
            color: #fff;
            width: 100%;
            padding: 12px 16px;
            -webkit-transition: background-color .25s cubic-bezier(.25,.46,.45,.94);
            transition: background-color .25s cubic-bezier(.25,.46,.45,.94);
            margin: 16px 0 20px;
            margin-bottom: 20px;
            height: 100%;
        }
    }
</style>