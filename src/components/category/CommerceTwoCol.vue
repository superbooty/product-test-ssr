<template>
  <div class="decorator-content">
    <div class="decorator-mask">
    </div>
    <video class="inline-video" v-if="content.type === 'video'" :src="content.url"
    alt="asdf" autoplay="autoplay" loop="loop" muted="muted" playsinline=""></video>
    <img v-else :src="content.url" />
    <div class="headline-mobile-align"><h3 data-v-43ca4d66="" class="headline-text">{{content.msg}}</h3></div>
  </div>
</template>

<script>
export default {
  name: "CommerceTwoCol",
  props: {
    content: Object
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.decorator-content {
  height: 100%;
  position: relative;
}

.decorator-content img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.inline-video {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.decorator-mask {
  background-color: #4f4f4f;
  z-index: 1000;
  opacity: 0.2;
  width: 100%;
  height: 100%;
  position: absolute;
}

.headline-mobile-align {
  position: absolute;
  width: 100%;
  top: 50%;
  z-index: 1001;
  left: 50%;
  color: white;
  transform: translate(-50%, -50%);
}

.headline-mobile-align h3 {
    margin: 0 !important;
    font-weight: 700;
    font-size: 20px;
    letter-spacing: .13em;
}

</style>
