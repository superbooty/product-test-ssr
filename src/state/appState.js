// store/todos.js
import {ref } from "vue";


const state = ref({
    stateObj: {},
});

export function appState() {
    const getStateObj = () => {
        return state.value
    }
    return {getStateObj};
}

export default {
    appState
}