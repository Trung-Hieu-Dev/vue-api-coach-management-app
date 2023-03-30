import { createApp } from 'vue';

import router from './router';
import store from './store/index';

//global components
import BaseCard from './components/UI/BaseCard.vue';

import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-card', BaseCard);

app.mount('#app');
