import { ref, onMounted, computed } from "vue";
// import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// const router = useRouter();
const auth = getAuth();

const user = ref(null);
const isAdmin = computed(() => user.value && user.value.claims?.admin);

onMounted(async () => {
  onAuthStateChanged(auth, (fetchedUser) => {
    user.value = fetchedUser;
  });
});

export const authGuard = (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user.value) {
      console.log(user.value);
      return next();
    }
    return next({ name: "Login" });
  }
  return next();
};

export const adminGuard = (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAdmin)) {
    if (isAdmin.value) {
      return next();
    }
    return next({ name: "Home" });
  }
  return next();
};
