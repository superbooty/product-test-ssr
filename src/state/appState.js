// store/todos.js
import {ref } from "vue";

import {productQuery} from "@/gql/productQuery";
import {swatchQuery} from "@/gql/swatchQuery";
import {cmsQuery} from "@/gql/cmsQuery";

const state = ref({
    stateObj: {},
    product: {},
    swatches: {},
    nav: {}
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
    return {getStateObj, fetchProduct, fetchNav, getProduct, getSwatches};
}

export default {
    appState
}