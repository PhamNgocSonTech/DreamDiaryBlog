<template>
  <div class="blog-card">
    <div v-show="editPost" class="icons">
      <div @click="editBlogPost" class="icon">
        <span>Edit</span>
        <InlineSvg :src="require('../assets/Icons/edit-regular.svg')" class="edit" />
      </div>
      <div @click="deleteBlogPost" class="icon">
        <span>Delete</span>
        <InlineSvg :src="require('../assets/Icons/trash-regular.svg')" class="delete" />
      </div>
    </div>
    <img :src="post.blogCoverPhoto" alt="" />
    <div class="info">
      <h4>{{ post.blogTitle }}</h4>
      <h6>
        Posted on:
        {{
          new Date(post.blogDate).toDateString("en-us", { dateStyle: "long" })
        }}
      </h6>
      <span class="author-name">Author: {{ post.blogUserName }}</span> <!-- Thêm thẻ tác giả -->

      <router-link :to="{ name: 'ViewBlog', params: { blogId: post.blogID } }" class="link">
        View The Post
        <InlineSvg :src="require('../assets/Icons/arrow-right-light.svg')" class="arrow" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import InlineSvg from "vue-inline-svg";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Blog Card",
  props: ["post"],
  components: { InlineSvg },
  setup(props) {
    const store = useStore();
    const post = ref(props.post);
    const router = useRouter()
    const editPost = computed(() => {
      return store.state.editPost;
    });

    // const postProps = computed(() => {
    //   return props.post
    // })

    const deleteBlogPost = () => {
      store.dispatch("deletePost", post.value.blogID)
    };

    const editBlogPost = () => {
      router.push({ name: 'EditBlog', params: { blogId: post.value.blogID } })
    }

    // const getImgSrc = (photo) => {
    //   return require(`../assets/blogCards/${photo}.jpg`);
    // };

    return { editPost, deleteBlogPost, editBlogPost };
  },
};
</script>

<style lang="scss" scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  min-height: 420px;
  transition: 0.5s ease all;

  &:hover {
    transform: rotateZ(-1deg) scale(1.01);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #fff;
      transition: 0.5s ease all;
      position: relative;

      &:hover {
        background-color: #03a6ff;

        .edit,
        .delete {
          path {
            fill: #fff;
          }
        }
      }

      &:nth-child(1) {
        margin-right: 8px;
      }

      .edit,
      .delete {
        pointer-events: none;
        height: 15px;
        width: auto;
      }

      &:hover span {
        visibility: visible;
        opacity: 1;
      }

      span {
        visibility: hidden;
        background-color: #E0E3DA;
        font-weight: bold;
        color: #fa6060;
        text-align: center;
        border-radius: 6px;
        padding: 5px;
        position: absolute;
        z-index: 1;
        bottom: 150%;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        transition: opacity 0.3s;

        &::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: black transparent transparent transparent;
        }
      }
    }
  }

  img {
    display: block;
    border-radius: 8px 8px 0 0;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px 16px;
    color: #000;

    h4 {
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: bold;
    }

    h6 {
      font-weight: 400;
      font-size: 12px;
      padding-bottom: 6px;
    }

    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      padding-top: 20px;
      font-size: 12px;
      padding-bottom: 4px;
      transition: 0.5s ease-in all;

      &:hover {
        color: rgba(48, 48, 48, 0.8);
      }

      .arrow {
        width: 10px;
      }
    }

    .author-name {
      font-weight: 400;
      font-size: 12px;
      font-style: italic;
      padding-top: 4px; // Để tạo khoảng cách giữa "Posted on" và tên tác giả
    }
  }
}
</style>
