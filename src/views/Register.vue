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
import { collection, addDoc } from "firebase/firestore";
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
      try {
        error.value = false;
        errorMsg.value = "";
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        console.log("User Credential: ", userCredential);

        const userCollection = collection(db, "users");
        await addDoc(userCollection, {
          firstName: firstName.value,
          lastName: lastName.value,
          username: username.value,
          email: email.value,
        });
        router.push("/");
      } catch (err) {
        error.value = true;
        errorMsg.value = "Please fill out all the fields!";
        const errorCode = err.message;
        console.log(errorCode);
      }
      // const userCredential = createUserWithEmailAndPassword(
      //   auth,
      //   email.value,
      //   password.value
      // );
      // createUserWithEmailAndPassword(auth, email, password)
      //   .then((userCredential) => {
      //     // Signed up
      //     const user = userCredential.user;
      //     console.log("user ", user);
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     console.log("Error Code", errorCode);
      //     console.log("Error Message", errorMessage);
      //   });
      // // const user = userCredential.user;
      // const userCollection = collection(db, "users");
      // await addDoc(userCollection, {
      //   firstName: firstName.value,
      //   lastName: lastName.value,
      //   username: username.value,
      //   email: email.value,
      // });
      // // console.log("result ", result);
      // router.push("/");
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

  // data() {
  //   return {
  //     firstName: "",
  //     lastName: "",
  //     username: "",
  //     email: "",
  //     password: "",
  //     error: "",
  //     errorMsg: "",
  //   };
  // },
  // methods: {
  //   async register() {
  //     if (
  //       this.email !== "" &&
  //       this.firstName !== "" &&
  //       this.lastName !== "" &&
  //       this.password !== "" &&
  //       this.username !== ""
  //     ) {
  //       this.error = false;
  //       this.errorMsg = "";
  //       // const firebaseAuth = getAuth();
  //       const userCredential = createUserWithEmailAndPassword(
  //         auth,
  //         this.email,
  //         this.password
  //       );
  //       userCredential.user;
  //       const userCollection = collection(db, "users");

  //       const dataObj = {
  //         firstName: this.firstName,
  //         lastName: this.lastName,
  //         username: this.username,
  //         email: this.email,
  //       };
  //       await addDoc(userCollection, dataObj);
  //       this.$router.push({ name: "Home" });
  //       return;
  //     }
  //     this.error = true;
  //     this.errorMsg = "Fill out all the fields Please!";
  //     return;
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
