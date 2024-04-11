<template>
  <div class="create-post">
    <BlogCoverPreview v-show="getBlogPhotoPreview" />
    <Loading v-show="loading" />
    <div class="container">
      <div :class="{ invisible: !error }" class="err-message">
        <p><span>Error:</span>{{ errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="getBlogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input type="file" @change="fileChange" ref="blogPhotoRef" id="blog-photo" accept=".png, .jpg, .jpeg" />
          <button @click="openPreview" class="preview" :class="{ 'button-inactive': !getBlogFileUrl }">
            Preview Photo
          </button>
          <span>File Chosen: {{ getBlogPhotoName }}</span>
        </div>
      </div>

      <div class="editor">
        <QuillEditor toolbar="full" :modules="[imgResizeModule, imgUploaderModule]" v-model:content="getBlogHTML"
          contentType="html" />
      </div>

      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
        <router-link to="/post-preview" class="router-button">Post Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref as vueRef } from "vue";
import {
  ref as storageRef,
  getDownloadURL,
  getStorage,
  uploadBytes,
} from "firebase/storage";
import { useStore } from "vuex";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import BlotFormatter from "quill-blot-formatter";
import ImageUploader from "quill-image-uploader";
import BlogCoverPreview from "@/components/BlogCoverPreview.vue";
import Loading from "@/components/Loading.vue";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseInit";
import { useRouter } from "vue-router";

export default {
  name: "Create Post",
  components: { QuillEditor, BlogCoverPreview, Loading },
  setup() {
    const error = vueRef(null);
    const errorMsg = vueRef(null);
    const fileRef = vueRef(null);
    const blogPhotoRef = vueRef(null);
    const loading = vueRef(null);

    const store = useStore();
    const router = useRouter();
    const storage = getStorage();

    const getBlogFileUrl = computed(() => {
      return store.state.blogPhotoFileURL;
    });

    const getBlogPhotoName = computed(() => {
      return store.state.blogPhotoName;
    });

    const getProfileId = computed(() => {
      return store.state.profileId;
    });

    const getBlogTitle = computed({
      get() {
        return store.state.blogTitle;
      },

      set(payload) {
        store.commit("updateBlogTitle", payload);
      },
    });

    const getBlogHTML = computed({
      get() {
        return store.state.blogHTML;
      },

      set(payload) {
        store.commit("newBlogPost", payload);
      },
    });

    const getBlogPhotoPreview = computed(() => {
      return store.state.blogPhotoPreview;
    });

    const imgResizeModule = {
      name: "blotFormatter",
      module: BlotFormatter,
    };

    const imgUploaderModule = {
      name: "imageUploader",
      module: ImageUploader,
      options: {
        upload: async (file) => {
          try {
            const docRef = storageRef(
              storage,
              `dream-diary-blog/BlogPostPhotos/${file.name}`
            );
            const snapshot = await uploadBytes(docRef, file);
            console.log("file uploaded post: ", file);
            const url = await getDownloadURL(snapshot.ref);
            console.log("url: " + url);
            return url;
          } catch (error) {
            console.error("Error:", error);
            throw new Error("Upload failed");
          }
        },
      },
    };

    const uploadBlog = async () => {
      if (getBlogTitle.value.length !== 0 && getBlogHTML.value.length !== 0) {
        if (fileRef.value) {
          loading.value = true;
          const docRef = storageRef(
            storage,
            `dream-diary-blog/BlogCoverPhotos/${getBlogPhotoName.value}`,
          );
          try {
            await uploadBytes(docRef, fileRef.value);
            const downloadURL = await getDownloadURL(docRef);
            const timestamp = Date.now();
            const blogPostsDocRef = collection(db, "blogPosts");
            const newBlogPostRef = await addDoc(blogPostsDocRef, {
              blogHTML: getBlogHTML.value,
              blogCoverPhoto: downloadURL,
              blogCoverPhotoName: getBlogPhotoName.value,
              blogTitle: getBlogTitle.value,
              profileId: getProfileId.value,
              date: timestamp,
            });

            const blogID = newBlogPostRef.id;
            await updateDoc(newBlogPostRef, { blogID: blogID });
            await store.dispatch("getPost");
            loading.value = false;

            router.push({ name: "ViewBlog", params: { blogId: blogID } });
          } catch (error) {
            console.log(error);
            loading.value = false;
          }
        } else {
          error.value = true;
          errorMsg.value = "Please ensure you uploaded a cover photo!";
          setTimeout(() => {
            error.value = false;
          }, 5000);
        }
      } else {
        error.value = true;
        errorMsg.value =
          "Please ensure Blog Title & Blog Post has been filled!";
        setTimeout(() => {
          error.value = false;
        }, 5000);
      }
    };

    const fileChange = () => {
      fileRef.value = blogPhotoRef.value.files[0];
      // fileRef.value = selectedFile
      const fileName = fileRef.value.name;
      const fileURL = URL.createObjectURL(fileRef.value);
      store.commit("fileNameChange", fileName);
      store.commit("createFileURL", fileURL);
    };

    const openPreview = () => {
      store.commit("openPhotoPreview");
    };
    return {
      error,
      errorMsg,
      imgResizeModule,
      getBlogFileUrl,
      getBlogPhotoName,
      getProfileId,
      getBlogTitle,
      getBlogHTML,
      fileChange,
      blogPhotoRef,
      BlogCoverPreview,
      getBlogPhotoPreview,
      openPreview,
      // imageHandler,
      imgUploaderModule,
      uploadBlog,
      loading,
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
