import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import storeData from "./store/index.js";
// import { auth } from "@/firebase/firebaseInit";
// import { onAuthStateChanged } from "firebase/auth";

const app = createApp(App);
app.use(router);
app.use(storeData);
app.mount("#app");

// onAuthStateChanged(auth, () => {
//   if (!app._isMounted) {
//     app.mount("#app");
//     // console.log(user);
//   }
// });
