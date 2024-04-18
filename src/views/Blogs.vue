<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div v-if="admin" class="toggle-edit">
        <span>Toggle Edit Post</span>
        <input type="checkbox" v-model="editPost" />
      </div>
      <BlogCard v-show="admin" :post="post" v-for="(post, index) in blogPostsWithProfileId" :key="index" />
      <BlogCard v-show="!admin" :post="post" v-for="(post, index) in blogPosts" :key="index" />
    </div>

  </div>
</template>

<script>
import BlogCard from "@/components/BlogCard.vue";
// import { doc } from "firebase/firestore";
// import { db } from "@/firebase/firebaseInit";
import { computed, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
export default {
  name: "Blogs",
  components: { BlogCard },
  setup() {
    const store = useStore();
    // const sampleBlogCards = computed(() => store.state.sampleBlogCards);
    const editPost = computed({
      get() {
        return store.state.editPost;
      },
      set(payload) {
        return store.commit("toggleEditPost", payload);
      },
    });

    const blogPosts = computed(() => {
      return store.state.blogPosts;
    });

    const admin = computed(() => {
      return store.state.profileAdmin;
    });

    const profileId = computed(() => {
      return store.state.profileId;
    });

    const blogPostsWithProfileId = computed(() => {
      return store.state.blogPosts.filter(post => post.profileId === store.state.profileId);
    });

    onBeforeUnmount(() => {
      store.commit("toggleEditPost", false);
    });

    return { editPost, blogPostsWithProfileId, blogPosts, admin, profileId };
  },
  // computed: {
  //   sampleBlogCards() {
  //     return this.$store.state.sampleBlogCards;
  //   },

  //   editPost: {
  //     get() {
  //       return this.$store.state.editPost;
  //     },
  //     set(payload) {
  //       return this.$store.commit("toggleEditPost", payload);
  //     },
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.blog-cards {
  position: relative;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;

    span {
      margin-right: 16px;
    }

    input[type="checkbox"] {
      position: relative;
      border: none;
      -webkit-appearance: none;
      background: #dddfe6;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input[type="checkbox"]:before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      top: 0;
      left: 0;
      background: #dddfe6;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    input:checked[type="checkbox"]:before {
      background: #fa6060;
      left: 52px;
    }
  }
}
</style>
