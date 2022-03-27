import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import {createRouter, createWebHashHistory} from 'vue-router';
import { createI18n } from 'vue-i18n';
import routes from './routers'
import messages from '@intlify/vite-plugin-vue-i18n/messages'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
const i18n = createI18n({
  locale: navigator.language.toLowerCase(),
  fallbackLocale: 'en',
  messages
})

loadFonts()

const app = createApp(App);
app.use(router);
app.use(i18n);
app.use(vuetify);
app.mount('#app');
