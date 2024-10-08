<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" to="/">DDBlogs</router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" to="/">Home</router-link>
          <router-link class="link" to="/trending">Hot Blogs</router-link>
          <router-link v-if="admin" class="link" to="/my-blogs">My Blogs</router-link>
          <router-link v-if="admin" class="link" to="/create-post">Create Blog</router-link>
          <router-link v-if="!userData" class="link" to="/login">Login/Register</router-link>
        </ul>
        <div v-if="userData" @click="toggleProfileMenu" class="profile" ref="refProfile">
          <span>{{ profileInitials }}</span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <p class="initials">{{ profileInitials }}</p>
              <div class="right">
                <p>
                  {{ profileFirstName }}
                  {{ profileLastname }}
                </p>
                <p>
                  {{ profileUsername }}
                </p>
                <p>
                  {{ profileEmail }}
                </p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" to="/profile">
                  <InlineSvg :src="require('@/assets/Icons/user-alt-light.svg')" class="icon" />
                  <p>Profile</p>
                </router-link>
              </div>

              <div v-if="admin" v-show="admin" class="option">
                <router-link class="option" to="/admin">
                  <InlineSvg :src="require('@/assets/Icons/user-crown-light.svg')" class="icon" />
                  <p>Admin</p>
                </router-link>
              </div>

              <div @click="signOutEvent" class="option">
                <InlineSvg :src="require('@/assets/Icons/sign-out-alt-regular.svg')" class="icon" />
                <p>Sign Out</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <InlineSvg :src="require('../assets/Icons/bars-regular.svg')" alt="menu" class="menu-icon" v-show="mobile"
      @click="toggleMobileNav" />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" to="/">Home</router-link>
        <router-link class="link" to="/trending">Trending Blogs</router-link>
        <router-link v-if="admin" class="link" to="/my-blogs">My Blogs</router-link>
        <router-link v-if="admin" class="link" to="/create-post">Create Blog</router-link>
        <router-link v-if="!userData" class="link" to="/login">Login/Register</router-link>
      </ul>
    </transition>
  </header>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import InlineSvg from "vue-inline-svg";
import { useStore } from "vuex";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseInit";
import { useRouter } from "vue-router";
export default {
  name: "Navigation",
  components: {
    InlineSvg,
  },
  setup() {
    const store = useStore();
    const router = useRouter()
    const mobile = ref(null);
    const mobileNav = ref(null);
    const windowWidth = ref(null);
    const refProfile = ref(null);
    const profileMenu = ref(null);

    const profileInitials = computed(() => {
      return store.state.profileInitials;
    });
    const profileFirstName = computed(() => {
      return store.state.profileFirstName;
    });
    const profileLastname = computed(() => {
      return store.state.profileLastname;
    });
    const profileUsername = computed(() => {
      return store.state.profileUsername;
    });
    const profileEmail = computed(() => {
      return store.state.profileEmail;
    });

    const userData = computed(() => {
      return store.state.user;
    });

    const admin = computed(() => {
      return store.state.profileAdmin;
    });

    const checkScreen = () => {
      windowWidth.value = window.innerWidth;
      if (windowWidth.value <= 750) {
        mobile.value = true;
        return;
      } else {
        mobile.value = false;
        mobileNav.value = false;
      }
    };

    const toggleMobileNav = () => {
      mobileNav.value = !mobileNav.value;
    };

    const toggleProfileMenu = (event) => {
      if (event.target === refProfile.value) {
        profileMenu.value = !profileMenu.value;
      }
    };

    const handleClickOutside = (event) => {
      if (refProfile.value && !refProfile.value.contains(event.target)) {
        profileMenu.value = false;
      }
    };

    const signOutEvent = () => {
      signOut(auth);
      // store.dispatch("resetProfileData")
      router.push({ name: 'Home' })
      window.location.reload();
    };
    onMounted(() => {
      window.addEventListener("click", handleClickOutside);
    });

    window.addEventListener("resize", checkScreen);
    checkScreen();
    return {
      mobile,
      mobileNav,
      windowWidth,
      checkScreen,
      toggleMobileNav,
      profileInitials,
      profileFirstName,
      profileLastname,
      profileUsername,
      profileEmail,
      refProfile,
      profileMenu,
      toggleProfileMenu,
      signOutEvent,
      userData,
      admin,
      handleClickOutside,
    };
  },
  // data() {
  //   return {
  //     mobile: null,
  //     mobileNav: null,
  //     windowWidth: null,
  //   };
  // },
  // created() {
  //   window.addEventListener("resize", this.checkScreen);
  //   this.checkScreen();
  // },

  // methods: {
  //   checkScreen() {
  //     this.windowWidth = window.innerWidth;
  //     if (this.windowWidth <= 750) {
  //       this.mobile = true;
  //       return;
  //     } else {
  //       this.mobile = false;
  //       this.mobileNav = false;
  //     }
  //   },

  //   toggleMobileNav() {
  //     this.mobileNav = !this.mobileNav;
  //   },
  // },
};
</script>

<style lang="scss" scoped>
header {
  background-color: #dddfe6;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #03a6ff;
    }
  }

  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }

    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;
      gap: 32px;

      ul {
        margin-right: 32px;

        .link {
          margin-right: 32px;
        }

        .link:last-child {
          margin-right: 0;
        }
      }

      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;
        right: 25px;

        span {
          pointer-events: none;
        }

        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;

            .initials {
              position: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }

            .right {
              flex: 1;
              margin-left: 24px;

              p:nth-child(1) {
                font-size: 14px;
              }

              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }

          .options {
            padding: 15px;

            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;

              .icon {
                width: 18px;
                height: auto;
              }

              p {
                font-size: 14px;
                margin-left: 12px;
              }

              &:last-child {
                margin-bottom: 0px;
              }
            }
          }
        }
      }
    }

    .mobile-user-menu {
      margin-right: 40px;
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 10px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;

    .link {
      padding: 15px 0;
      color: #fff;
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease;
  }

  .mobile-nav-enter {
    transform: translateX(-250px);
  }

  .mobile-nav-enter-to {
    transform: translateX(0);
  }

  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
</style>
