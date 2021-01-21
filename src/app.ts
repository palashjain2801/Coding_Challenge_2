import { createApp } from 'vue';
import { router } from './router';
import { store } from './store';
// import VueMarkdown from 'vue3-markdown-it';

import App from "./App.vue";

createApp(App)
    .use(router)
    .use(store)
    // .use(VueMarkdown)
    .mount('#app');
