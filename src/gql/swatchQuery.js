export const swatchQuery = `query swatches ($code: String!) {
    swatches(code: $code) {
        swatches {
            active
            available
            code
            colorName
            imageUrl
            url
            variantsAvailability {
                available
                length
                size
                waist
            }
        }
        errors {
     name
     component
     message
   }
   }
}`;
export default {
    swatchQuery
}