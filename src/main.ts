import ui from "@nuxt/ui/vue-plugin";

import "./assets/main.css";

import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import { setupInactivityMonitor } from "./utils/inactivity";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(ui);
setupInactivityMonitor();
app.mount("#app");
