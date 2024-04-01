<template>
  <div class="create-post">
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ errorMessages }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="blogPhotoRef"
            id="blog-photo"
            accept=".png, .jpg, .jpeg"
          />
          <button
            class="preview"
            :class="{ 'button-inactive': !getBlogFileUrl }"
          >
            Preview Photo
          </button>
          <span>File Chosen: {{ getBlogPhotoName }}</span>
        </div>
      </div>

      <div class="editor">
        <QuillEditor
          :editorOptions="editorSettings"
          v-model="blogHTML"
          useCustomImageHandler
        />
      </div>

      <div class="blog-actions">
        <button>Publish Blog</button>
        <router-link to="#" class="router-button">Post Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import { computed, ref } from "vue";
import { useStore } from "vuex";
// window.QuillEditor = QuillEditor;
// const ImgResize = require("quill-image-resize-module");

// Quill.register("module/imageResize", ImgResize);
export default {
  name: "Create Post",
  components: { QuillEditor },
  setup() {
    const error = ref(null);
    const errorMsg = ref(null);
    const blogTitle = ref("");
    const blogHTML = ref("");

    const store = useStore();

    const getBlogFileUrl = computed(() => {
      return store.state.blogPhotoFileURL;
    });

    const getBlogPhotoName = computed(() => {
      return store.state.blogPhotoName;
    });

    const editorSettings = { module: { imageResize: {} } };
    return {
      error,
      errorMsg,
      editorSettings,
      getBlogFileUrl,
      getBlogPhotoName,
      blogTitle,
      blogHTML,
    };
  },
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
