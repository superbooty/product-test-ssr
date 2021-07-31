import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const myApp = createApp(App).use(router);
myApp.mount('#app');
