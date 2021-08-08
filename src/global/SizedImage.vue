<template>
    <div
        class="image-container"
        ref="imageContainer"
    >
        <img
            v-if="widthAndHeightQueryString && useLazyLoad"
            class="processed-image"
            :style="style"
            :alt="getAltTags"
            :data-gallery-index="getGalleryIndex"
        >
        <!--using for not lazy loading-->
        <img
            else
            class="processed-image"
            :style="style"
            :src="processedImageUrl"
            :alt="getAltTags"
            :data-gallery-index="getGalleryIndex"
        >
    </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";

import {appState} from "@/state/appState";

export default {
    name: "SizedImage",
    
    props: {
        image: {
            type: Object,
            required: false,
            default: null,
        },
        aspectRatio: {
            type: String,
            default: "pdpWide",
        },
        disableBottomCrop: {
            type: Boolean,
            default: false,
        },
        useLazyLoad: {
            type: Boolean,
            default: false,
        },
        productAlt: {
            type: String,
            default: "",
        },
    },

    setup(props) {

        const imgWidth = ref(0);
        const imageAspectRatios = ref ({
            pdpMobile: "3:5",
            pdpWide: "16:9",
            default: "3:4",
        });

        onMounted(() => {
            warnNoImages();
        });

        const { getStateObj } = appState();

        console.log("STATE OBJ :: ", getStateObj());

        // methods: 
        const warnNoImages = () => {
            if (!props.image) {
                // eslint-disable-next-line no-console
                console.warn("There are products appearing on this page that don't have an image.");
            }
        };

        // computed
        const formatAllowsBottomCrop = computed(() => {
            const bottoms = props.image ? props.image.url.includes("_bottoms$") : "";
            const waistDown = props.image ? props.image.format.includes("OnModelWaistdown") : "";
            return (bottoms || waistDown);
        });

        const bottomCropString = computed (() => {
            // levi's crops off top 35%, dockers crops off top 27%
            const cropQueryString = "&cropN=0,0.35,1,0.65" ;
            return (formatAllowsBottomCrop.value && !props.disableBottomCrop) ? cropQueryString : "";
        });

        const getAltTags = computed (() => {
            return `${props.image?.altText || props.productAlt || "product image"} ${getGalleryIndex.value + 1}`;
        });

        const getGalleryIndex = computed (() =>{
            return props.image ? props.image.galleryIndex : 0;
        });

        const strippedUrl = computed (() => {
            return props.image ? props.image.url.split("?")[0] : "";
        });

        const aspectRatioCalc = computed (() => {
            const arArray = imageAspectRatios.value[props.aspectRatio].split(":").reverse();
            return arArray[0] / arArray[1];
        });

        const heightIncrement = computed (() => {
            return Math.ceil(props.aspectRatioCalc * imgWidth.value);
        });

        const widthAndHeightQueryString = computed (() => {
            return imgWidth.value ? `&wid=${imgWidth.value}&hei=${heightIncrement.value}` : "";
        });

        const processedImageUrl = computed (() => {
            const defaultQueryString = "?fmt=jpeg&qlt=70,1&op_sharpen=0&resMode=sharp2&op_usm=0.8,1,10,0&fit=crop,0&wid=900&hei=1200";
            return `${strippedUrl.value}${defaultQueryString}${bottomCropString.value}${widthAndHeightQueryString.value}`;
        });

        const reversedAspectRatio = computed (() => {
            return imageAspectRatios.value[props.aspectRatio].split(":").reverse().join(":").replace(":", " / ");
        });

        const style = computed (() => {
            return {
                "padding-bottom": `percentage(${reversedAspectRatio.value})`,
                "background-size": "cover",
            };
        });

        return {
            warnNoImages,
            formatAllowsBottomCrop,
            style,
            processedImageUrl,
            widthAndHeightQueryString,
            heightIncrement,
            aspectRatioCalc,
            strippedUrl,
            getGalleryIndex,
            getAltTags,
            bottomCropString,
            reversedAspectRatio,
            imgWidth
        }
    }
};
</script>

<style lang="scss" scoped>
.image-container {
    width: 90%;
    .processed-image {
        max-width: 90%;
        top: 0;
        left: 0;
        width: 100%;
        object-fit: cover;
        object-position: 50% 50%;
    }
}
</style>
