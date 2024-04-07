<template>
    <div class="post-view" v-if="currentBlog">
        <div class="container quillWrapper">
            <h2>{{ currentBlog[0].blogTitle }}</h2>
            <h4>Posted on: {{ new Date(currentBlog[0].blogDate).toLocaleString("en-us", { dateStyle: "long" }) }}
            </h4>
            <img :src="currentBlog[0].blogCoverPhoto" alt="">
            <div class="post-content ql-editor" v-html="currentBlog[0].blogHTML"></div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
    name: "ViewBlog",
    setup() {
        const currentBlog = ref(null);
        const store = useStore()
        const router = useRoute()

        // const getBlogPost = computed(() => {
        //     return store.state.blogPosts
        // })

        const loadBlog = async () => {
            const blogPost = await store.state.blogPosts.filter((post) => {
                return post.blogID === router.params.blogId
            })
            currentBlog.value = blogPost
        }

        onMounted(() => {
            loadBlog()
        })
        return {
            currentBlog,
            loadBlog
        }
    }
};
</script>

<style lang="scss">
.post-view {
    h4 {
        font-weight: 400;
        font-size: 14px;
        margin-bottom: 24px;
    }
}
</style>
