import { createApp } from "vue";
import "./assets/main.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import ui from "@nuxt/ui/vue-plugin";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(Vue3Toastify, {
  autoClose: 2000,
} as ToastContainerOptions);
app.use(ui);
app.mount("#app");
