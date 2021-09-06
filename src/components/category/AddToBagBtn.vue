<template>
  <div class="qv-wrapper">
      <button :class="{'atb-btn': true, 'dark-btn': goDark}" @click="showModal(index)" @mouseenter="toggleBtnColor()" @mouseleave="toggleBtnColor()" >Add to bag</button>
  </div>
</template>

<script>
export default {
  name: "AddToBagBtn",
  props: {
    content: Object,
    index: Number,
    code: String
  },
  data: () => ({
    goDark: false,
  }),
  methods: {
    showModal(i) {
      this.$emit('showMyModal', i);
    },
    toggleBtnColor() {
      this.goDark = !this.goDark;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.qv-wrapper {
  
}

.show {
    display: flex;
}

.atb-btn {
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 80px;
  width: 150px;
  line-height: 35px;
  background: white;
  border-color: black;
  margin: 0 auto;
}

.dark-btn {
  border-color: white;
  background: #313131;
  color: white;
}

</style>