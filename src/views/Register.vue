<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" to="/login">Login</router-link>
      </p>
      <h2>Create Your Dream Diary Blogs Account</h2>

      <div class="inputs">
        <div class="input">
          <input
            type="text"
            placeholder="First Name"
            v-model="firstName"
            required
          />
          <InlineSvg
            :src="require('@/assets/Icons/user-alt-light.svg')"
            class="icon"
          />
        </div>

        <div class="input">
          <input
            type="text"
            placeholder="Last Name"
            v-model="lastName"
            required
          />
          <InlineSvg
            :src="require('@/assets/Icons/user-alt-light.svg')"
            class="icon"
          />
        </div>

        <div class="input">
          <input
            type="text"
            placeholder="Username"
            v-model="username"
            required
          />
          <InlineSvg
            :src="require('@/assets/Icons/user-alt-light.svg')"
            class="icon"
          />
        </div>

        <div class="input">
          <input
            type="email"
            placeholder="Email"
            v-model.trim="email"
            required
          />
          <InlineSvg
            :src="require('@/assets/Icons/envelope-regular.svg')"
            class="icon"
          />
        </div>

        <div class="input">
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            required
          />
          <InlineSvg
            :src="require('@/assets/Icons/lock-alt-solid.svg')"
            class="icon"
          />
        </div>
        <div v-show="error" class="error">{{ errorMsg }}</div>
      </div>
      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import InlineSvg from "vue-inline-svg";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseInit";
import { doc, setDoc } from "firebase/firestore";
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "Register",
  components: { InlineSvg },
  setup() {
    const firstName = ref("");
    const lastName = ref("");
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const error = ref(false);
    const errorMsg = ref("");
    const router = useRouter();

    const register = async () => {
      if (
        firstName.value !== "" &&
        lastName.value !== "" &&
        username.value !== "" &&
        email.value !== "" &&
        password.value !== ""
      ) {
        try {
          error.value = false;
          errorMsg.value = "";
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
          );
          const userDocRef = doc(db, "users", userCredential.user.uid);
          await setDoc(userDocRef, {
            firstName: firstName.value,
            lastName: lastName.value,
            username: username.value,
            email: email.value,
          });
          router.push("/");
        } catch (err) {
          error.value = true;
          errorMsg.value = err.message;
        }
      } else {
        error.value = true;
        errorMsg.value = "Please fill out all the fields!";
      }
    };
    return {
      register,
      firstName,
      lastName,
      username,
      password,
      email,
      error,
      errorMsg,
    };
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
