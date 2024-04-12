<template>
  <div class="home">
    <BlogPost v-if="!userData" :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blog</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index" />
        </div>
      </div>
    </div>
    <div v-if="!userData" class="updates">
      <div class="container">
        <h2>Never miss a post. Register free account to more post!</h2>
        <router-link to="/login" class="router-button">
          Register for Dream Diary Blogs
          <InlineSvg :src="require('../assets/Icons/arrow-right-light.svg')" class="arrow" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "@/components/BlogPost.vue";
import BlogCard from "@/components/BlogCard.vue";
import InlineSvg from "vue-inline-svg";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "Home",
  components: { BlogPost, BlogCard, InlineSvg },
  setup() {
    const store = useStore();

    const blogPostsFeed = computed(() => {
      return store.getters.blogPostsFeed;
    });

    const blogPostsCards = computed(() => {
      return store.getters.blogPostsCards;
    });

    const userData = computed(() => {
      return store.state.user;
    });
    return {
      blogPostsFeed,
      blogPostsCards,
      userData,
      welcomeScreen: {
        title: "Welcome to Dream Diary Blogs",
        blogPost:
          "Weekly blog article with all things programming including HTML, CSS and JS.",
        welcomeScreen: true,
        photo: "coding",
      },
    };
  },
  // data() {
  //   return {
  //     welcomeScreen: {
  //       title: "Welcome to Dream Diary Blogs",
  //       blogPost:
  //         "Weekly blog article with all things programming including HTML, CSS and JS.",
  //       welcomeScreen: true,
  //       photo: "coding",
  //     },

  //     sampleBlogPost: [
  //       {
  //         title: "This is a Filter Title 1",
  //         blogHTML: "This is a filter blog post title",
  //         blogCoverPhoto: "beautiful-stories",
  //       },

  //       {
  //         title: "This is a Filter Title 2",
  //         blogHTML: "This is a filter blog post title",
  //         blogCoverPhoto: "designed-for-everyone",
  //       },
  //     ],
  //   };
  // },
  // computed: {
  //   sampleBlogCards() {
  //     return this.$store.state.sampleBlogCards;
  //   },
  //   userData() {
  //     return this.$store.state.user;
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;

      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;

      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
