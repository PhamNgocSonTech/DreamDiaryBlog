import Vuex from "vuex";
import { db } from "@/firebase/firebaseInit";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

// let data = {
//   blogPosts: [],
//   postLoaded: null,
//   blogHTML: "Write your blog title in here...",
//   blogTitle: "",
//   blogPhotoName: "",
//   blogPhotoFileURL: null,
//   blogPhotoPreview: null,
//   editPost: null,
//   user: null,
//   profile: null,
//   profileEmail: null,
//   profileFirstName: null,
//   profileLastName: null,
//   profileUsername: null,
//   profileId: null,
//   profileInitials: null,
//   profileAdmin: null,
//   inputFile: null,
// };
const storeData = {
  state: {
    blogPosts: [],
    postLoaded: null,

    blogHTML: "Write your blog title in here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    blogUserName: null,
    editPost: null,
    user: null,

    profile: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
    profileAdmin: null,

    inputFile: null,
    authorName: null,
  },

  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },

    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6);
    },
  },

  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },

    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },

    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },

    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },

    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },

    toggleEditPost(state, payload) {
      state.editPost = payload;
    },

    updateUser(state, payload) {
      state.user = payload;
    },

    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },

    setProfileInitials(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },

    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },

    changeLastName(state, payload) {
      state.profileLastName = payload;
    },

    changeUsername(state, payload) {
      state.profileUsername = payload;
    },

    changeEmail(state, payload) {
      state.profileEmail = payload;
    },

    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
    },

    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter(
        (post) => post.blogID !== payload
      );
    },

    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhotoName = payload.blogCoverPhotoName;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
    },

    setInputFile(state, file) {
      state.inputFile = file;
    },

    resetState(state) {
      (state.blogHTML = "Write your blog title in here..."),
        (state.blogTitle = ""),
        (state.blogPhotoName = ""),
        (state.blogPhotoFileURL = null),
        (state.blogPhotoPreview = null);
    },
  },

  actions: {
    async getCurrentUser({ commit }, userData) {
      try {
        const { userId, admin } = userData;
        const docUserRef = doc(db, "users", userId);
        const docUserData = await getDoc(docUserRef);
        if (docUserData.exists()) {
          commit("setProfileInfo", docUserData);
          commit("setProfileInitials");
          commit("setProfileAdmin", admin);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    },

    async updateUserSettings({ commit, state }) {
      try {
        const userDoc = doc(db, "users", state.profileId);
        await updateDoc(userDoc, {
          firstName: state.profileFirstName,
          lastName: state.profileLastName,
          username: state.profileUsername,
        });
        commit("setProfileInitials");
      } catch (error) {
        console.log("Error:", error);
      }
    },

    async getPost({ state }) {
      const postResult = query(
        collection(db, "blogPosts"),
        orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(postResult);
      for (const docs of querySnapshot.docs) {
        if (!state.blogPosts.some((post) => post.blogID === docs.id)) {
          const docUserRef = doc(db, "users", docs.data().profileId);
          const docUserData = await getDoc(docUserRef);
          const username = docUserData.data().username;

          const data = {
            blogID: docs.data().blogID,
            blogTitle: docs.data().blogTitle,
            blogHTML: docs.data().blogHTML,
            blogCoverPhoto: docs.data().blogCoverPhoto,
            blogCoverPhotoName: docs.data().blogCoverPhotoName,
            blogDate: docs.data().date,
            blogUserName: username,
          };
          state.blogPosts.push(data);
        }
      }
      // querySnapshot.forEach((doc) => {
      //   if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
      //     const data = {
      //       blogID: doc.data().blogID,
      //       blogTitle: doc.data().blogTitle,
      //       blogHTML: doc.data().blogHTML,
      //       blogCoverPhoto: doc.data().blogCoverPhoto,
      //       blogCoverPhotoName: doc.data().blogCoverPhotoName,
      //       blogDate: doc.data().date,
      //     };
      //     await dispatch("getAuthorPost", doc.data().profileId);
      //     console.log("profileId:", doc.data().profileId);
      //     state.blogPosts.push(data);
      //   }
      // });
      state.postLoaded = true;
    },

    async deletePost({ commit }, payload) {
      await deleteDoc(doc(db, "blogPosts", payload));
      commit("filterBlogPost", payload);
    },

    async updatePost({ commit, dispatch }, payload) {
      commit("filterBlogPost", payload);
      await dispatch("getPost");
    },

    resetStateData({ commit }) {
      commit("resetState");
    },
  },

  modules: {},
};

const store = new Vuex.Store(storeData);
export default store;
