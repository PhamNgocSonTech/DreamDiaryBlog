<template>
  <div class="blog-wrapper" :class="{ 'no-user': !userData }">
    <div class="blog-content">
      <div>
        <h1 v-if="post.welcomeScreen">{{ post.blogTitle }}</h1>
        <h1 class="line-clamp" v-else>{{ post.blogTitle }}</h1>
        <p v-if="post.welcomeScreen">{{ post.blogPost }}</p>
<!--        <p v-else class="content-preview line-clamp" v-html="post.blogHTML"></p>-->
        <router-link v-if="post.welcomeScreen" to="/login" class="link link-light">Login/Register
          <InlineSvg :src="require('../assets/Icons/arrow-right-light.svg')" class="arrow arrow-light" />
        </router-link>
        <router-link v-else :to="{ name: 'ViewBlog', params: { blogId: post.blogID } }" class="link">Read The Post
          <InlineSvg :src="require('../assets/Icons/arrow-right-light.svg')" class="arrow" />
        </router-link>
      </div>
    </div>
    <div class="blog-photo">
      <img v-if="post.welcomeScreen" :src="getImgSrc(post.photo)" />
      <img v-else :src="post.blogCoverPhoto" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import InlineSvg from "vue-inline-svg";
export default {
  name: "Blog Post",
  components: { InlineSvg },
  props: ["post"],
  setup() {
    const store = useStore();

    // const postProps = computed(() => {
    //   return props.post;
    // });

    const userData = computed(() => {
      return store.state.user;
    });

    const getImgSrc = (photo) => {
      return require(`../assets/blogPhotos/${photo}.jpg`);
    };


    return {
      userData,
      getImgSrc,
      // postProps,
      // post: props.post,
    };
  },
};
</script>

<style lang="scss" scoped>

.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: var(--line-clamp, 1);
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }

  .blog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;

    @media (min-width: 700px) {
      order: 1;
    }

    @media (min-width: 800px) {
      flex: 3;
    }

    div {
      max-width: 375px;
      padding: 72px 24px;

      @media (min-width: 700px) {
        padding: 0 24px;
      }

      h1 {
        --line-clamp: 4;
        font-size: 32px;
        // font-weight: 300;
        font-weight: bold;
        text-transform: uppercase;
        margin-bottom: 24px;
        //white-space: nowrap;
        //text-overflow: ellipsis;

        @media (min-width: 700px) {
          font-size: 40px;
        }
      }

      p {
        font-size: 15px;
        font-weight: 300;
        line-height: 1.7;
      }

      //.content-preview {
      //  font-size: 13px;
      //  max-height: 24px;
      //  width: 250px;
      //  white-space: nowrap;
      //  overflow: hidden;
      //  text-overflow: ellipsis;
      //}

      .link {
        display: inline-flex;
        align-items: center;
        margin-top: 32px;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease-in all;

        &:hover {
          border-bottom-color: #303030;
        }
      }

      .link-light {
        &:hover {
          border-bottom-color: #ffff;
        }
      }
    }
  }

  .blog-photo {
    order: 1;
    flex: 3;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    @media (min-width: 700px) {
      order: 2;
    }

    @media (min-width: 800px) {
      flex: 4;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }
  }

  &:nth-child(even) {
    .blog-content {
      order: 2;
    }

    .blog-photo {
      order: 1;
    }
  }
}

.no-user:first-child {
  .blog-content {
    background-color: #303030;
    color: #fff;
  }
}
</style>
