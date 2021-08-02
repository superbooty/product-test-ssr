// store/todos.js
import {ref } from "vue";

import {productQuery} from "@/gql/productQuery";
import {swatchQuery} from "@/gql/swatchQuery";


const state = ref({
    stateObj: {},
    product: {},
    swatches: {},
});

export function appState() {
    const getStateObj = () => {
        return state.value
    }
    const getProduct = () => {
        return state.value.product;
    }
    const getSwatches = () => {
        return state.value.swatches;
    }
    // fetch product from server
    const fetchProduct = (code) => {
        const fetchPromises = [];
        const productPromise = fetch(`https://www.levi.com/nextgen-webhooks/?operationName=product&locale=US-en_US`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                operationName: "product",
                variables: {
                    code: code
                },
                query: productQuery
            }),
        });
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
        fetchPromises.push(productPromise);
        fetchPromises.push(swatchPromise);
        return Promise.all(fetchPromises).then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        })
    }
    return {getStateObj, fetchProduct, getProduct, getSwatches};
}

export default {
    appState
}