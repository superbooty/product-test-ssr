<template>
    <div class="page">
      <div class="filter-facets">
        <div class="store-pickup">
          <span class="title" >Some Store Pickup</span>
        </div>
      </div>
      <div v-if="decorators != null" class="container-col">
        <div v-for="(commerce, i) in computedCommerce"
          class="item" :class="{decorated: commerce.decoratedRow && commerce.itemPlacement < 3 }"
          :style="[commerce.decoratedRow && commerce.itemPlacement < 3  ? {'grid-row' : commerce.row} : '']"
          :key="commerce.product.code" @mouseenter="showATCButton(i)" @mouseleave="hideATCButton(i)">
          <div class="item-inner">
            <router-link :to="{ name: 'Product', params: { code: commerce.product.code, swatchClick: false }}">
              <sized-image
                :image="commerce.product.galleryList.galleryImage[0]"
                :aspect-ratio="aspectRatio"
                :is-PLP="true"
                :disable-bottom-crop="true"
                product-alt="testing"
              />
              <!-- <img :class="{'img-decorated': commerce.decoratedRow && commerce.itemPlacement < 3}" :src="commerce.product.galleryList.galleryImage[0].url" /> -->
            </router-link>
            <div v-if="!commerce.product.customizable">
              <!-- <add-to-bag-btn v-if="qvButtons[i] && !atcModals[i]" :index=i @showMyModal="showMyModal" />
              <add-to-bag-modal v-if="atcModals[i]" :code=commerce.product.code @closeModal="closeModal(i)"/> -->
            </div>
          </div>
          <swatches />
          <div>{{commerce.product.name}}</div>
          <div class="color">Color: {{commerce.product.colorName}}</div>
          <div>{{commerce.product.price.formattedValue}}</div>
        </div>
        <div
          v-for="(d, i) in decorators.content"
          :class="[d.pos]"
          :style="{'grid-row': d.row}"
          :key="`${d.row}-d-${i}`"
        >
          <decorator :content="d.content"></decorator>
        </div>
      </div>
      <pagination :pagination="pagination" :path="path" @page-change="handlePageChange"/>
      <!-- <item-selector :items="products"></item-selector> -->
      <!-- <shoppable-video></shoppable-video> -->
    </div>
</template>

<script>
import Decorator from "../components/category/Decorator.vue";
import Pagination from "../components/category/Pagination.vue";
import SizedImage from "@/global/SizedImage.vue";
// import ItemSelector from "../components/category/ItemSelector.vue";
// import ShoppableVideo from "../components/category/ShoppableVideo.vue";
// const AddToBagModal = defineAsyncComponent(
//   () => import('./components/category/AddToBagModal.vue')
// );
// import AddToBagModal from "./components/AddToBagModal.vue"

import router from "@/router";
import {ref, onMounted, watch, computed} from 'vue';

import {appState} from "@/state/appState";

export default {
  name: "Category",

  props: {
    code: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    pageNum: {
      type: String,
      required: true,
      default: "1",
    },
    aspectRatio: {
      type: String,
      default: "default",
    },
  },

  setup(props) {
    console.log("PROPS :: ", props);

    const { fetchCategory } = appState();

    const qvButtonState = ref([]);
    const pagination = ref();
    const products = ref(null);
    const decorators = ref([]);
    const atcModals = ref([]);
    const selected = ref(-1);
    const cols = ref(2); // this value should come from testing the device type
    
    fetch("/mocks/decorators.json")
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        console.log(myJson);
        decorators.value = myJson;
      });



    // fetch("/mocks/products.json")
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(myJson => {
    //     console.log(myJson);
    //     products.value = myJson;
    //     products.value.forEach((product, i) => {
    //       qvButtonState.value[i] = false;
    //       atcModals.value[i] = false;
    //     });
    //   });
    
    fetch("https://udc6hc9di5.execute-api.us-west-2.amazonaws.com/default/putmetadata", {
      method: "POST",
      mode: "cors",
      data: {
        channelArn: 'arn:aws:ivs:us-west-2:497531642140:channel/1wZsrjIZeadM', 
        metadata: '{"productId": "756450002"}'
      }
    }).then((resp) => {
      console.log(resp.json());
    })

    const isRowDecorated = (row) => {
      let decs = null;
      if (decs != null) {
        decs = decorators.value.content.filter(decorator => {
          return decorator.row == row ;
        });
      }
      return decs != null && decs.length > 0 ? decs[0] : false;
    }

    const handlePageChange = (opts) => {
      console.log("OPTS :: ", opts);
      // call route
      router.push({name: 'Category', query: {pageNum: opts.pageNum}});
    }

    const showATCButton = (i) => {
      qvButtonState.value[i] = true;
      // this.quickViewBtnActive = !this.quickViewBtnActive;
    };

    const hideATCButton = (i) => {
      qvButtonState.value[i] = false;
    };

    const qvButtons = computed(() => {      
      return qvButtonState.value;
    });

    const showMyModal = (arg) => {
      console.log("ARG :: ", arg);
      atcModals.value[selected.value] = false;
      // vm.set(this.showModal, this.selected, false);
      selected.value = arg;
      atcModals.value[selected.value] = true;
      console.log("SELECTED :: ", selected.value, atcModals.value);
    };

    const closeModal = () => {
      atcModals.value[selected.value] = false;
    }

    const getCategory = (pageNum) => {
      fetchCategory(props.code, pageNum).then((category) => {
        console.log("CAT :: ", category);
        products.value = category[0].data.categories.products;
        pagination.value = category[0].data.categories.pagination;
      })
    }

    // watchers
    watch(
      () => props.pageNum,
      () => {
        // the slider position can be controlled by the parent if necessary
        getCategory(props.pageNum);
      }
    );

    // hooks
    onMounted(() => {
        getCategory(props.pageNum);
    });

    // computed
    const computedCommerce = computed(() => {
      let commerceProducts = [];
      let colsCount = 0;
      if (products.value != null) {
        // console.log("PRODUCTS :: ", products);
        products.value.forEach((product, i) => {
          let commerceProduct = {
            product: product,
          }
          commerceProduct.isDecorated = false;
          let rowNum = (i + cols.value + colsCount) / cols.value;
          rowNum = rowNum | 0;
          console.log("ROW :: ", rowNum);
          let contentDecorator = isRowDecorated(rowNum)
          if (contentDecorator) {
            colsCount += contentDecorator.cols
          }
          commerceProduct.row = rowNum;
          commerceProduct.position = (i + 1 + colsCount);
          let itemPlacement = (commerceProduct.position + cols.value) - (cols.value * rowNum);
          console.log('PLACE :: ', itemPlacement);
          commerceProduct.itemPlacement = itemPlacement;
          if (commerceProduct.row === 3) {
            commerceProduct.decoratedRow = 3;
          }
          // console.log('PRODUCT :: ', commerceProduct);
          commerceProducts.push(commerceProduct);
        });
      }
      return commerceProducts;
    });

    return {
      qvButtonState, decorators,
      products, computedCommerce, qvButtons,
      atcModals, showATCButton, hideATCButton,
      showMyModal, closeModal, pagination,
      handlePageChange,
    }

  },

  components: {
    Decorator,
    SizedImage,
    Pagination,
  },
  mounted() {
    const width = window.innerWidth;
    if (width < 600) {
      this.cols = 2;
    } else {
      this.cols = 3;
    }
  }
};
</script>

<style lang="scss">

.container-col {
  justify-items: center;
  grid-auto-rows: auto;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  display: grid;
  grid-auto-flow: dense;
}

.container-col .item img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.container-col .item {
  font-size: 13px;
  font-weight: 400;
  text-align: left;
  line-height: 16px;
  position: relative;
}

.item .color {
  color: darkgrey;
}

.left,
.right {
  grid-column: 1 / -1;
  height: auto;
}

.side-by-side {
  grid-column: 1 / -1;
}

.fill {
  grid-column: 1 / -1;
  /* height: 250px; */
  /* border: solid black 1px; */
  /* background-color: rgb(218, 218, 218); */
  grid-auto-rows: auto;
}

.img-decorated {
  max-height: 400px;
}

.decorated {
    max-width: 100% !important;
    width: 75%;
    grid-column: 1 / 3 !important;
    transition: width 250ms;
}

.logo {
    height: 24px;
    width: 58px;
}
.separator {
  height: 40px;
}

@media screen and (min-width: 600px) {
  .container-col {
    grid-auto-rows: auto;
    grid-auto-flow: row;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 64px 4%;
    display: grid;
  }

  .container-col .item {
    // border: solid white 1px;
    grid-column: span 2;
    padding: 3px;
  }

  .container-col .item .item-inner {
    /* border: solid black 1px; */
    // padding: 3px;
  }

  .container-col .item:hover {
    outline: solid #cacaca 1px;
    padding: 3px;
  }

  .left {
    grid-column: 1 / 5;
  }

  .right {
    grid-column-start: 7;
    grid-column-end: 3;
  }

  .decorated {
    width: 65%;
    grid-column: span 3 !important;
  }

  .decorated:hover {
    width: 100%;
  }

}

.filter-facets {
  .store-pickup {
    background: #ecf0f1;
    min-height: 200px;
    .title {
      line-height: 30px;
      font-size: 12px;
    }
  }
}

.page {
  display: grid;
  max-width: 100vw;
  grid-template-columns: 16vw auto;
  grid-column-gap: 60px;
  padding: 0 30px;
  justify-content: space-around;
}
</style>
