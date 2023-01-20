import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import {SneakApi} from "@/api";

const app = createApp(App);
app.use(router);
app.config.globalProperties.$api = SneakApi;
app.mount("#app");