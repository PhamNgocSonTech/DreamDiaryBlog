<template>
  <div class="app-wrapper">
    <div class="app" v-if="postLoaded">
      <Navigation v-if="!navigation" />
      <router-view />
      <Footer v-if="!navigation" />
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watchEffect, computed } from "vue";
import { useRoute } from "vue-router";
import Footer from "./components/Footer.vue";
import Navigation from "./components/Navigation.vue";
import { auth } from "@/firebase/firebaseInit";
import { onAuthStateChanged } from "firebase/auth";
import { useStore } from "vuex";
export default {
  name: "App",
  components: { Navigation, Footer },
  setup() {
    const navigation = ref(null);
    const route = useRoute();
    const store = useStore();

    const checkRoute = () => {
      if (
        route.name === "Login" ||
        route.name === "Register" ||
        route.name === "ForgotPassword"
      ) {
        navigation.value = true;
      } else {
        navigation.value = false;
      }
    };

    const postLoaded = computed(() => {
      return store.state.postLoaded
    })

    onMounted(() => {
      onAuthStateChanged(auth, async (user) => {
        store.commit("updateUser", user);
        if (user) {
          const userId = user.uid;
          const token = await user.getIdTokenResult();
          const admin = token.claims.admin;
          store.dispatch("getCurrentUser", { userId, admin });
        }
        store.dispatch("getPost");
      });
      checkRoute();
    });

    watchEffect(() => {
      checkRoute();
    });

    return {
      navigation,
      postLoaded
    };
  },
};

// return { checkRoute };
// data() {
//   return {
//     navigation: null,
//   };
// },
// created() {
//   this.checkRoute();
// },
// methods: {
//   checkRoute() {
//     if (
//       this.$route.name === "Login" ||
//       this.$route.name === "Register" ||
//       this.$route.name === "ForgotPassword"
//     ) {
//       this.navigation = true;
//       return;
//     }
//     this.navigation = false;
//   },
// },
// watch: {
//   $route() {
//     this.checkRoute();
//   },
// },
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  margin-left: 8px;
  width: 12px;

  path {
    fill: #000;
  }
}

.arrow-light {
  path {
    fill: #fff;
  }
}

button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}

.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;

  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }

  i {
    margin-left: 8px;
  }
}

.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}

.error {
  text-align: center;
  font-size: 12px;
  color: red;
}

.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f2e9e1;

  @media (min-width: 500px) {
    padding: 100px 16px;
  }

  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;

    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
