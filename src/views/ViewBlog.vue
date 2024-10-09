<template>
    <div class="post-view" v-if="currentBlog">
        <div class="container quillWrapper">
            <h1>{{ currentBlog[0].blogTitle }}</h1>
          <div class="info-wrap">
            <h4 class="post-time">Posted on: {{ new Date(currentBlog[0].blogDate).toLocaleString("en-us", { dateStyle: "long" }) }} </h4> <br>
            <span class="read-time">Estimated: {{readingTime}} min read</span>
            <span class="author-name" :class="{ 'is-admin': isAdmin }">Author: {{ currentBlog[0].blogUserName }} </span>
          </div>
            <img :src="currentBlog[0].blogCoverPhoto" alt="">
            <div class="post-content ql-editor" v-html="currentBlog[0].blogHTML"></div>
        </div>
    </div>
</template>

<script>
// import { doc, getDoc } from 'firebase/firestore';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
    name: "ViewBlog",
    setup() {
        const currentBlog = ref(null);
        const store = useStore()
        const route = useRoute()

        const loadBlog = async () => {
            const blogPost = await store.state.blogPosts.filter((post) => {
                return post.blogID === route.params.blogId
            })
            currentBlog.value = blogPost
        }

        const username = computed(() => {
            return store.state.blogUserName;
        })

        const isAdmin = computed(() => {
            return store.state.profileAdmin;
        });

        const removeHtmlTags = (html) => {
          return html.replace(/<[^>]*>/g, '')
        }

      const getAllImgTags = (html) => {
          const imgMatches = html.match(/<img[^>]*>/g); //get all img tag
          return imgMatches ? imgMatches.length : 0;
      }

        const totalWordImg = computed(() => {
          if(!currentBlog.value || !currentBlog.value[0]?.blogHTML) return 0;
          const plainText = removeHtmlTags(currentBlog.value[0].blogHTML)
          const imgCount = getAllImgTags(currentBlog.value[0].blogHTML)
          const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length
          return {wordCount, imgCount}
        })


      const readingTime = computed(() => {
        const wordsPerMin = 250;
        const {wordCount, imgCount} = totalWordImg.value
        const textReadingTime = wordCount / wordsPerMin //time read text
        const imgReadingTime = imgCount  * (15 /60) //time read img 10 second => 0.2 min
        const totalReadingTime = textReadingTime + imgReadingTime;
        console.log(totalReadingTime)
        if(totalReadingTime < 1) {
          return 'Under 1 '
        }
        return Math.round(totalReadingTime)
      })

        onMounted(() => {
            loadBlog()
        })
        return {
            currentBlog,
            loadBlog,
            username,
            isAdmin,
            readingTime
        }
    }
};
</script>

<style lang="scss">
.post-view {
    // display: flex;
    // flex-direction: row;
    // justify-content: space-between;

  .info-wrap h4 {
        font-weight: 400;
        font-size: 14px;
        //margin-bottom: 24px;
        float: left;
    }



    h1 {
        //font-weight: bold;
        font-size: 48px;
        margin-bottom: 27px;

    }

    .author-name {
        font-weight: 400;
        font-size: 14px;
        margin-bottom: 24px;
        float: right;
        position: relative; // Thiết lập position relative để có thể sử dụng ::after
    }

    .author-name.is-admin::after {
        background-image: url('@/assets/Icons/user-crown-light.svg');
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        background-size: cover;
        margin-left: 5px;
        vertical-align: middle;
    }

  img {
    pointer-events: none;

  }
}
</style>
