import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import {SneakApi} from "@/api";


// redirect if www
if (document.location.hostname.startsWith("www.")) {
    document.location.hostname = document.location.hostname.replace("www.", "");
}

const app = createApp(App);
app.use(router);
app.config.globalProperties.$api = SneakApi;
app.mount("#app");
