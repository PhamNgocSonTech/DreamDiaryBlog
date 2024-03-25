<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" to="/login">Login</router-link>
      </p>
      <h2>Create Your SBlogs Account</h2>

      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <InlineSvg
            :src="require('@/assets/Icons/user-alt-light.svg')"
            class="icon"
          />
        </div>

        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <InlineSvg
            :src="require('@/assets/Icons/user-alt-light.svg')"
            class="icon"
          />
        </div>

        <div class="input">
          <input type="text" placeholder="Username" v-model="username" />
          <InlineSvg
            :src="require('@/assets/Icons/user-alt-light.svg')"
            class="icon"
          />
        </div>

        <div class="input">
          <input type="email" placeholder="Email" v-model="email" />
          <InlineSvg
            :src="require('@/assets/Icons/envelope-regular.svg')"
            class="icon"
          />
        </div>

        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <InlineSvg
            :src="require('@/assets/Icons/lock-alt-solid.svg')"
            class="icon"
          />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import InlineSvg from "vue-inline-svg";
// import firebase from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseInit";
import { collection, addDoc } from "firebase/firestore";

// import { ref } from "v ue";
// import { useRouter } from "vue-router";
export default {
  name: "Register",
  components: { InlineSvg },
  // setup() {
  //   const firstName = ref("");
  //   const lastName = ref("");
  //   const username = ref("");
  //   const email = ref("");
  //   const password = ref("");
  //   const error = ref("");
  //   const errorMsg = ref("");
  //   const router = useRouter();
  //   const register = async () => {
  //     if (
  //       email.value !== "" &&
  //       firstName.value !== "" &&
  //       lastName.value !== "" &&
  //       password.value !== "" &&
  //       username.value !== ""
  //     ) {
  //       error.value = false;
  //       errorMsg.value = "";
  //       const firebaseAuth = await firebase.auth();
  //       const createUser = await firebaseAuth.createUserWithEmailAndPassword(
  //         email,
  //         password
  //       );
  //       const result = await createUser;
  //       const database = firebaseApp.collection("users").doc(result.user.uid);
  //       await database.set({
  //         firstName: firstName.value,
  //         lastName: lastName.value,
  //         username: username.value,
  //         email: email.value,
  //       });
  //       router.push({ name: "Home" });
  //     } else {
  //       error.value = true;
  //       errorMsg.value = "Fill out all the fields Please!";
  //       console.log(errorMsg.value);
  //     }
  //   };
  //   return {
  //     register,
  //   };
  // },
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      error: "",
      errorMsg: "",
    };
  },
  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.password !== "" &&
        this.username !== ""
      ) {
        this.error = false;
        this.errorMsg = "";
        // const firebaseAuth = getAuth();
        const userCredential = createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        // createUserWithEmailAndPassword(auth, this.email, this.password)
        //   .then((userCredential) => {
        //     // Signed up
        //     // const user = userCredential.user;
        //     console.log("user", userCredential.user);
        //   })
        //   .catch((error) => {
        //     this.errorMsg = error.message;
        //     // ..
        //   });
        const user = userCredential.user;
        const userCollection = collection(db, "users");
        // console.log();
        // const database = db.collection("users").doc(result.uid);
        const dataObj = {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
        };
        const result = await addDoc(userCollection, dataObj);
        // await database.set({
        //   firstName: this.firstName,
        //   lastName: this.lastName,
        //   username: this.username,
        //   email: this.email,
        // });
        console.log("result ", result);
        console.log("user ", user);
        this.$router.push({ name: "Home" });
        return;
      }
      this.error = true;
      this.errorMsg = "Fill out all the fields Please!";
      return;
    },
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
