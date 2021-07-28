<template>
  <div class="carousel-wrapper">
    <button
      :class="{ active: showLeftNav }"
      :disabled="!showLeftNav"
      class="carousel-nav carousel-nav-left"
      @click="changeSlide(-1)"
    ></button>
    <div
      class="snap-carousel"
      ref="carousel"
      v-on:scroll="handleScrollLeft"
    >
      <div
        v-for="(image, index) in images"
        class="img-container"
        :key="`img-${index}`"
      >
        <span class="img-num">{{index + 1}}/{{images.length}}</span>
        <img class="slider-img" :src="image.url" :ref="`img-${index}`"/>
      </div>
    </div>
    <button
      :class="{ active: showRightNav }"
      :disabled="!showRightNav"
      class="carousel-nav carousel-nav-right"
      @click="changeSlide(1)"
    ></button>
  </div>
</template>

<script>
import { ref, onMounted, onActivated } from 'vue';

export default {
  name: 'SimpleCarousel',
  props: {
    images: {
      type: Array,
      required: true,
    },
  },

  setup(props) {
    const timer = ref(null);
    const inViewEl = ref(null);
    const carouselWidth = ref(0);
    const lastXScroll = ref(0);
    const showRightNav = ref(true);
    const showLeftNav = ref(false);
    const carousel = ref(null);
    const observer = ref(null);

    console.log('PROPS :: ', props.length);

    // computed

    // methods
    const setInView = () => {
      document.querySelectorAll('.slider-img').forEach((img) => { observer.value.observe(img); });

      // const { carousel } = this.$refs;
      // carousel.children.forEach((el) => {
      //   const imgEl = el.querySelector('.slider-img');
      //   if (this.testInView(el)) {
      //     imgEl.classList.add('inview');
      //     this.inViewEl = imgEl;
      //   } else {
      //     imgEl.classList.remove('inview');
      //   }
      // });
    };

    const handleScrollLeft = () => {
      // clearTimeout(vm.timer);
      setInView();
      lastXScroll.value = Math.ceil(carousel.value.scrollLeft);
      const width = carousel.value.offsetWidth;
      console.log('LAST SCROLLL POS :: ', lastXScroll.value, width, carouselWidth.value);
      if (lastXScroll.value + width >= carouselWidth.value) {
        console.log('end');
        showRightNav.value = false;
      } else {
        showRightNav.value = true;
      }
      if (lastXScroll.value === 0) {
        console.log('start');
        showLeftNav.value = false;
      } else {
        showLeftNav.value = true;
      }
    };

    const changeSlide = (direction) => {
      // scroll by to match the flex-basis of the contained image
      const width = carousel.value.offsetWidth; // * 0.8;
      console.log('SCROLLING BY :: ', width * direction);
      // console.log('IMG INVIEW :: ', this.inViewEl);
      // this.inViewEl.classList.remove('inview');
      // if (direction > 0) {
      //   this.inViewEl.parentElement.nextSibling.firstChild.classList.add('inview');
      // } else {
      //   this.inViewEl.parentElement.previousSibling.firstChild.classList.add('inview');
      // }
      carousel.value.scrollTo(lastXScroll.value + width * direction, 0);

      // const el = document.querySelector('.img-container');
      // console.log('POS :: ', el.scrollTop, el.scrollLeft);
    };

    // const testInView = ($el) => {
    //   const { carousel } = this.$refs;
    //   return this.checkInView(carousel, $el, true);
    // };

    // const checkInView = (container, element) => {
    //   // Get container properties
    //   const delta = element.clientWidth / 3;
    //   const cLeft = container.scrollLeft;
    //   const cRight = cLeft + container.clientWidth;
    //   console.log('C LEFT/RIGTH ::', cLeft, cRight, delta);

    //   // Get element properties
    //   const eLeft = element.offsetLeft - container.offsetLeft;
    //   const eRight = eLeft + element.clientWidth;
    //   console.log('E LEFT/RIGTH ::', eLeft, eRight, delta);

    //   // Check if in view
    //   const isTotal = eLeft >= (cLeft - delta) && eRight <= (cRight + delta);
    //   // const isPartial = ((eLeft < (cLeft - delta) && eRight > (cRight + delta))
    //   //     || (eRight > cRight && eLeft < cLeft));

    //   // Return outcome
    //   return isTotal; // || isPartial;
    // };

    // hooks
    onActivated(() => {
      console.log('Activated...');
    });

    onMounted(() => {
      carouselWidth.value = carousel.value.scrollWidth;
      observer.value = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.intersectionRatio >= 0.33 && entry.intersectionRatio <= 0.65) {
              entry.target.classList.remove('inview');
              entry.target.classList.add('partial');
            }
            if (entry.intersectionRatio >= 0.66) {
              entry.target.classList.remove('partial');
              entry.target.classList.add('inview');
            }
          } else {
            entry.target.classList.remove('partial', 'inview');
          }
        });
      }, {
        root: carousel.value,
        threshold: [0.33, 0.66],
      });
      setInView();
    });

    return {
      timer,
      inViewEl,
      carouselWidth,
      lastXScroll,
      showRightNav,
      showLeftNav,
      observer,
      carousel,
      changeSlide,
      handleScrollLeft,
    };
  },
};
</script>

<style lang="scss" scoped>
.carousel-wrapper {
  display: grid;
  position: relative;
  grid-template-columns: 1fr;
  height: 100%;
  margin: 20px 0;
  // height: 250px;
  .img-num {
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 4px;
    font-family: Arial, Helvetica, sans-serif;
    background: #ececec;
    opacity: 0.6;
    font-size: 12px;
    font-weight: bolder;
  }
  .numbers {
    position: absolute;
  }
  .snap-carousel {
    display: flex;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    > * {
      @media only screen and (max-width: 800px) {
        flex: 1 0 100%;
        padding: 0px;
      }
      flex: 1 0 20%;
      scroll-snap-align: center;
      text-align: center;
      padding: 0 10px;
      scroll-snap-stop: always;
    }
    .img-container {
      flex-basis: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      padding: 0;
      // max-width: 400px;
      img {
        // scroll-snap-align: center;
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: top;
        // border-radius: 6px;
        transform-origin: center;
        transition: all .200s ease-in-out;
        opacity: .66;
        &.partial {
          opacity: 0.66;
        }
        &.inview {
          opacity: 1;
          //transform: scale(1.1);
        }
      }
      @media only screen and (min-width: 800px) {
        flex-basis: 45%;
        img {
          height: 100%;
          width: 98%;
          object-position: center;
          &.inview {
            transform: none;
          }
        }
      }
    }
  }
  button:focus {
    outline: 0;
  }
  .carousel-nav {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 30px;
    height: 30px;
    line-height: 28px;
    padding: 0;
    cursor: pointer;
    font-weight: 900;
    line-height: 30px;
    background: #f4f4f4;
    opacity: 0.8;
    color: white;
    border-radius: 30px;
    border: none;
    &.active {
      display: block;
      color: black;
      font-weight: 500;
      z-index: 100;
    }
    &.carousel-nav-left {
      left: 0;
      &::after {
        font-size: 16px;
        content: "\276E";
      }
    }
    &.carousel-nav-right {
      right: 0;
      &::after {
        font-size: 16px;
        content: "\276F";
      }
    }
    @media only screen and (max-width: 800px) {
      &.carousel-nav-left {
        display: none;
      }
      &.carousel-nav-right {
        display: none;
      }
    }
  }
}
</style>