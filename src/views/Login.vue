<template>
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" to="/register">Register</router-link>
      </p>
      <h2>Login to Dream Diary Blogs</h2>
      <div class="inputs">
        <div class="input">
          <input type="email" placeholder="Email" v-model="email" />
          <InlineSvg :src="require('@/assets/Icons/envelope-regular.svg')" class="icon" />
        </div>

        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <InlineSvg :src="require('@/assets/Icons/lock-alt-solid.svg')" class="icon" />
        </div>
        <div v-show="error" class="error">{{ errorMsg }}</div>
      </div>
      <router-link class="forgot-password" to="/forgot-password">Forgot Password</router-link>
      <button @click.prevent="login">Login</button>
      <!-- <button><a href="/">Home</a></button> -->
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>
<script>
import { ref } from "vue";
import InlineSvg from "vue-inline-svg";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebaseInit";
export default {
  name: "Login",
  components: { InlineSvg },
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref(false);
    const errorMsg = ref("");
    const router = useRouter();

    const login = async () => {
      if (email.value !== "" && password.value !== "") {
        error.value = false;
        errorMsg.value = "";
        try {
          await signInWithEmailAndPassword(auth, email.value, password.value);
          // console.log("User Credential: ", userCredential.user.uid);
          router.push("/");
          // window.location.reload();
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
      login,
      email,
      password,
      error,
      errorMsg,
    };
  },
};
</script>

<style lang="scss">
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 900px) {
    width: 100%;
  }

  .login-register {
    margin-bottom: 32px;

    .router-link {
      color: #000;
    }
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    @media (min-width: 900px) {
      padding: 0 50px;
    }

    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;

      @media (min-width: 900px) {
        font-size: 40px;
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;

        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;

          &:focus {
            outline: none;
          }
        }

        .icon {
          width: 12px;
          position: absolute;
          left: 6px;
        }
      }
    }

    .forgot-password {
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 14px;
      margin: 16px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: #303030;
      }
    }

    .angle {
      display: none;
      position: absolute;
      background-color: #fff;
      transform: rotateZ(3deg);
      width: 60px;
      right: -30px;
      height: 101%;

      @media (min-width: 900px) {
        display: initial;
      }
    }
  }

  .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url("../assets/background.jpg");
    width: 100%;
    height: 100%;

    @media (min-width: 900px) {
      display: initial;
    }
  }
}
</style>
