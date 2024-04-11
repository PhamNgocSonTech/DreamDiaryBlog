import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import storeData from "./store/index.js";

import { auth } from "@/firebase/firebaseInit";
import { onAuthStateChanged } from "firebase/auth";

let app;
// const app = createApp(App);
// app.use(router);
// app.use(storeData);
// app.mount("#app");

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(router).use(storeData).mount("#app");
  }
});
