// store/todos.js
import {ref } from "vue";

// import {productQuery} from "@/gql/productQuery";
import {swatchQuery} from "@/gql/swatchQuery";
import {cmsQuery} from "@/gql/cmsQuery";

const state = ref({
    stateObj: {},
    product: {},
    swatches: {},
    nav: {},
    selectedSizes: {}
});

export function appState() {
    const getStateObj = () => {
        return state.value
    }
    // fetch the navigation
    const fetchNav = () => {
        const fetchPromises = [];
        const promise = fetch(`https://www.levi.com/nextgen-webhooks/?operationName=cmsContent&locale=US-en_US`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                operationName: "cmsContent",
                variables: {
                    contentType: "partials_sitewide_v3"
                },
                query: cmsQuery
            }),
        });
        fetchPromises.push(promise);
        return Promise.all(fetchPromises).then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        })
    }
    // fetch product from server
    const fetchProduct = (code, swatchClick) => {
        const fetchPromises = [];
        const country = "US";
        const language = "en-US";
        console.log("STATE SWATCH CLICK :: ", swatchClick);
        const productPromise = fetch(`http://localhost/api/product/${country}/${language}/${code}`);
        fetchPromises.push(productPromise);
        if (!swatchClick) {
            console.log("STATE SWATCH CLICK :: ", swatchClick);
            const swatchPromise = fetch(`https://www.levi.com/nextgen-webhooks/?operationName=swatches&locale=US-en_US`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    operationName: "swatches",
                    variables: {
                        code: code
                    },
                    query: swatchQuery
                }),
            });
            fetchPromises.push(swatchPromise);
        }
        return Promise.all(fetchPromises).then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(responses.map(function (response) {
                return response.json();
            })).then(function (data) {
                state.value.product.value = data[0];
                if (data[1]) {
                    state.value.swatches.value = data[1];
                } else {
                    // maybe swatches is from SSR
                    if (window.__PUPPETEER_PRODUCT_CTX__) {
                        state.value.swatches.value = window.__PUPPETEER_PRODUCT_CTX__.swatches;
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        })
    }
    return {getStateObj, fetchProduct, fetchNav};
}

export default {
    appState
}