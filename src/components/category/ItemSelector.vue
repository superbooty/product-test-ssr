<template>
  <div class="container">
    <template v-for="item in items" :key="item.code">
      <div  class="item">
        <a  class="item">
          <img :src="item.images[3].url" alt="" @click="processItem(item)" />
        </a>
      </div>
    </template>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "ItemSelector",
  props: {
    items: Object,
  },

  setup(props) {
    console.log("Item Selector PROPS :: ", props);

    const processed = reactive({ 196260153: true });

    const processItem = (item) => {
      console.log("TO PROCESS :: ", item.code);
      processed[item.code] = true;
      console.log("PROCESSED :: ", processed[item.code]);
    };

    return {
      processItem,
      processed,
    };
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  overflow: auto;
  height: 300px;
  padding: 0px 20px;
}

.item {
  position: relative;
  display: block;
  flex: 1 1 0px;
  transition: transform 250ms;
  border-radius: 20px;
  margin: 5px;
  width: 120px;
}

.container .item:focus,
.container .item:hover {
  transform: scale(1.2);
  z-index: 1;
}

body {
  overflow: hidden;
}

.item img {
  display: block;
  max-width: 100%;
  border-radius: 20px;
}
</style>