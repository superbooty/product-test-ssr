<template>
  <div class="atc-modal">
      <section  class="modal">
        <div class="close" @click="closeModal"></div>
        <div class="size-tiles">
          <div v-if="product && product.variantWaist.length > 0" class="size-label" :class="{error: atcError && selectedWaist < 0}">Waist  <span class="size-val">{{computedWaist}}</span></div>
          <ul class="size-grid" v-if="product && product.variantWaist">
            <li  v-for="(waist, i) in product.variantWaist"
            :key="`w${i}-${waist}`" @click="setSelectedWaist(i)">
              {{waist}}
              <div v-if="selectedWaistIdx == i" :class="{selected: selectedWaistIdx == i}"></div>
            </li>
          </ul>
          <div v-if="product && product.variantLength.length > 0" class="size-label" :class="{error: atcError && selectedLength < 0}">Length <span class="size-val">{{computedLength}}</span></div>
          <ul class="size-grid" v-if="product && product.variantLength">
            <li  v-for="(length, i) in product.variantLength"
            :key="`l${i}-${length}`" @click="setSelectedLength(i)">
              {{length}}
              <div v-if="selectedLengthIdx == i" :class="{selected: selectedLengthIdx == i}"></div>
            </li>
          </ul>
          <div v-if="product && product.variantSize.length > 0" class="size-label" :class="{error: atcError && selectedSize < 0}">Size <span class="size-val">{{computedSize}}</span></div>
          <ul class="size-grid" v-if="product && product.variantSize">
            <li  v-for="(size, i) in product.variantSize"
            :key="`l${i}-${size}`" @click="setSelectedSize(i)">
              {{size}}
              <div v-if="selectedSizeIdx == i" :class="{selected: selectedSizeIdx == i}"></div>
            </li>
          </ul>
          <div class="atb-section">
            <div v-if="atcError" :class="{'atc-error': atcError}">{{atcErrorMsg}}</div>
            <button class="atb-btn" @click="addToBag()">Add to bag</button>
          </div>
        </div>
      </section>
  </div>
</template>

<script>
import {ref, computed} from 'vue';

export default {
  name: "AddToBagModal",
  props: {
    content: Object,
    index: Number,
    code: String,
  },

  setup(props, {emit}) {
    console.log("ATC Modal PROPS :: ", props);

    // templete refs
    const product = ref(null);
    const selectedWaistIdx = ref(-1);
    const selectedLengthIdx = ref(-1);
    const selectedSizeIdx = ref(null);
    const showATCError = ref(false);
    const atcClicked = ref(false);

    // setup data
    fetch(`mocks/${props.code}.json`)
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        console.log(myJson);
        product.value = myJson;
      });

    // methods
    function setSelectedWaist(i) {
      console.log("SELECTED :: ", product.value.variantWaist[i]);
      selectedWaistIdx.value = i;
    }

    function setSelectedLength(i) {
      console.log("SELECTED :: ", product.value.variantLength[i]);
      selectedLengthIdx.value = i;
    }

    function setSelectedSize(i) {
      console.log("SELECTED :: ", product.value.variantSize[i]);
      selectedSizeIdx.value = i;
    }

    function closeModal() {
      emit('closeModal');
    }

    function addToBag() {
      this.atcClicked = true;
      if (selectedWaistIdx.value > -1 && selectedLengthIdx.value > -1) {
        console.log("ADDING TO BAG :: ", `${props.code}${product.value.variantLength[selectedLengthIdx.value]}${product.value.variantWaist[selectedWaistIdx.value]}`);
        closeModal();
      } else if (selectedSizeIdx.value > -1) {
         console.log("ADDING TO BAG :: ", `${props.code}0${product.value.variantSize[selectedSizeIdx.value]}`);
        closeModal();
      }
    }

    // computed
    const atcError = computed(() => {
      if (product.value != null) {
        if(product.value.variantSize.length > 0) {
          return atcClicked.value && (selectedSizeIdx.value < 0);
        }
      }
      return atcClicked.value && (selectedWaistIdx.value < 0 || selectedLengthIdx.value < 0);
    });

    const atcErrorMsg = computed(() => {
      const twoFactorError = "Please select waist and length";
      const singleFactorError = "Please select a size";
      if (product.value != null) {
        if(product.value.variantSize.length > 0) {
          return singleFactorError;
        }
      }
      return twoFactorError;
    });

    const computedLength = computed(() => {
      if (product.value != null) {
        return product.value.variantLength[selectedLengthIdx.value];
      }
      return "";
    });

    const computedWaist = computed(() => {
      if (product.value != null) {
        return product.value.variantWaist[selectedWaistIdx.value];
      }
      return "";
    });

    const computedSize = computed(() => {
      if (product.value != null) {
        return product.value.variantSize[selectedSizeIdx.value];
      }
      return "";
    });

    return {
      product,
      selectedWaistIdx,
      selectedLengthIdx,
      selectedSizeIdx,
      showATCError,
      atcClicked,
      setSelectedLength,
      setSelectedWaist,
      setSelectedSize,
      closeModal,
      addToBag,
      atcError,
      atcErrorMsg,
      computedLength,
      computedWaist,
      computedSize,
    }

  },

  computed: {
    
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/_variables.scss";
.qv-wrapper {
  
}

.atc-modal {
  
}

.size-tiles {
  position: relative;
  top: 30px;
}

.show {
    display: flex;
}

.msg {
  top: 50%;
  line-height: 100%;
  text-align: center;
  position: relative;
  font-size: 20px;
}

.close {
  top: 5px;
  right: 5px;
  line-height: 100%;
  text-align: center;
  position: absolute;
}

.atc-error {
  color: #b30d0d;
  line-height: 30px;
}

.close::after {
    font-family: 'lsco-icon';
    content: '';
    font-size: 20px;
}

.modal {
  height: 300px;
  width: calc(100% - 20px);
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 10px);
  background: white;
  border: 1px solid #cbcbcb;
  border-radius: 10px;
}

.modal ul {
  width:100%;
  overflow-x:hidden;
  padding: 0;
  margin-block-start: 0px;
  margin-block-end: 20px;
}

.error {
  color: #b30d0d !important;
}

.modal ul li { 
  display: inline-block;
  white-space: nowrap;
  width: 30px;
  height: 30px;
  list-style: none;
  line-height: 30px;
  text-align: center;
  margin: 2px;
  font-size: 12px;
}

.selected {
  position: relative;
  width: 20px;
  top: 0px;
  border: 1px solid #b30d0d;
  margin: 0 auto;
}

.size-label {
  font-size: 12px;
  line-height: 22px;
  color: #666666;
  margin-left: 10px;
  font-family: $font-bold;
  font-weight: 800;
}

.size-val {
  margin-left: 10px;
  font-family: $helvetica-now;
  font-weight: 500;
}

.atb-section {
  width: 100%;
  text-align: center;
}

.atb-btn {
  text-align: center;
  width: 80%;
  line-height: 35px;
  background: white !important;
  border-color: black;
}

</style>