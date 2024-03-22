<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <BlogPost
      :post="post"
      v-for="(post, index) in sampleBlogPost"
      :key="index"
    />
  </div>
</template>

<script>
import BlogPost from "@/components/BlogPost.vue";
export default {
  name: "Home",
  components: { BlogPost },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome to SBlog",
        blogPost:
          "Weekly blog article with all things programming including HTML, CSS and JS.",
        welcomeScreen: true,
        photo: "coding",
      },
      sampleBlogPost: [
        {
          title: "This is a Filter Title 1",
          blogHTML: "This is a filter blog post title",
          blogCoverPhoto: "beautiful-stories",
        },

        {
          title: "This is a Filter Title 2",
          blogHTML: "This is a filter blog post title",
          blogCoverPhoto: "designed-for-everyone",
        },
      ],
    };
  },
};
</script>
