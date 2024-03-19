import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import storeData from "./store/index.js";

const app = createApp(App);
app.use(router);
app.use(storeData);
app.mount("#app");
