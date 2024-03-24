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
      </div>
      <button>Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import InlineSvg from "vue-inline-svg";

export default {
  name: "Register",
  components: { InlineSvg },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
