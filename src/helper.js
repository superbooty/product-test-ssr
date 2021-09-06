
export function appHelper() {

    const getGalleryImages = (product) => {
        const productImages = product.value.data.product.galleryImageList.galleryImage;
        const defaultQueryString = "?fmt=jpeg&qlt=70,1&op_sharpen=0&resMode=sharp2&op_usm=0.8,1,10,0&fit=crop,0&wid=900&hei=1200";
        let processedArray = [];
        productImages.forEach((img) => {
          const processed = {
            'url': `${img.url.split("?")[0]}${defaultQueryString}`
          };
          processedArray.push(processed)
        })
        return processedArray;
    }

    return {getGalleryImages};
}

export default {
    appHelper
}