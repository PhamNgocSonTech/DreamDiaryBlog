<template>
  <footer>
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" to="/">Dream Diary Blogs</router-link>
          <ul>
            <li>
              <a href="https://github.com/PhamNgocSonTech" target="_blank" rel="noopener noreferrer">
                <InlineSvg :src="require('../assets/Icons/github-svgrepo-com.svg')" alt="github" class="svg-icon" />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/PhamNgocSonBB" target="_blank" rel="noopener noreferrer">
                <InlineSvg :src="require('../assets/Icons/facebook-1-svgrepo-com.svg')" alt="facebook"
                  class="svg-icon" />
              </a>
            </li>
            <!-- <li>
              <a href="#">
                <InlineSvg :src="require('../assets/Icons/twitter-brands.svg')" alt="Twitter" class="svg-icon" />
              </a>
            </li> -->
            <li>
              <a href="https://www.instagram.com/sonaquarius002/" target="_blank" rel="noopener noreferrer">
                <InlineSvg :src="require('../assets/Icons/instagram-svgrepo-com.svg')" alt="instgram"
                  class="svg-icon" />
              </a>
            </li>

          </ul>
        </div>
        <div class="col-2">
          <ul>
            <router-link class="link" to="/">Home</router-link>
            <router-link class="link" to="/trending">Trending Blogs</router-link>
            <router-link v-if="admin" class="link" to="/create-post">Create Post</router-link>
            <router-link v-if="!userData" class="link" to="/login">Login In / Register</router-link>
          </ul>
        </div>
      </div>
      <div class="right">
        <p>Copyright 2024 All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from "vue";
import InlineSvg from "vue-inline-svg";
import { useStore } from "vuex";
export default {
  name: "Footer",
  components: {
    InlineSvg,
  },
  setup() {
    const store = useStore();
    const userData = computed(() => {
      return store.state.user;
    });
    const admin = computed(() => {
      return store.state.profileAdmin;
    });

    return {
      userData,
      admin,
    };
  },
};
</script>

<style lang="scss" scoped>
footer {
  margin-top: auto;
  padding: 100px 25px;
  background-color: #dddfe6;

  .container {
    display: flex;
    flex-direction: column;
    gap: 32px;

    @media (min-width: 800px) {
      flex-direction: row;
      gap: 0px;
    }

    >div {
      display: flex;
      flex: 1;
    }

    .left {
      gap: 32px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;

      @media (min-width: 800px) {
        flex-direction: row;
        align-items: initial;
        gap: 0;
      }

      .header {
        text-align: center;
        font-size: 24px;
        color: #000;
        margin-bottom: 16px;
        text-decoration: none;
        font-weight: 600;

        @media (min-width: 800px) {
          text-align: initial;
        }
      }

      ul {
        gap: 16px;
        list-style: none;
        display: flex;
      }

      .col-1,
      .col-2 {
        gap: 32px;
        display: flex;
        flex: 1;

        @media (min-width: 800px) {
          gap: 0;
        }
      }

      .col-1 {
        flex-direction: column;

        h2 {
          text-align: center;

          @media (min-width: 800px) {
            text-align: initial;
          }
        }

        ul {
          margin-top: auto;

          li {
            display: flex;
            align-items: center;

            .svg-icon {
              width: 24px;
              height: auto;
              color: #fff;
            }
          }
        }
      }

      .col-2 {
        ul {
          height: 100%;
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;

          @media (min-width: 800px) {
            flex-direction: column;
          }

          .link {
            font-size: 16px;
            font-weight: 500;
            color: #000;
            text-decoration: none;

            &:hover {
              color: #03a6ff;
            }
          }

        }
      }
    }

    .right {
      gap: 32px;
      color: #000;
      align-items: center;
      flex-direction: column;

      @media (min-width: 800px) {
        align-items: flex-end;
        gap: 0;
      }
    }

    p {
      margin-top: auto;
    }
  }
}
</style>
