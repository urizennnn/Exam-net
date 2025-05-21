import {
  createApp,
} from "vue";
import "./assets/main.css";
import App from "./App.vue";
import router from "./router";
import {
  createPinia,
} from "pinia";
import ui from "@nuxt/ui/vue-plugin";

const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(ui);
app.mount("#app");
