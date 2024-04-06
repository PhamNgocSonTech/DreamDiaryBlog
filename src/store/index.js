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
} from "firebase/firestore";
const storeData = {
  state: {
    blogPosts: [],
    postLoaded: null,
    blogHTML: "Write your blog title in here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
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
  },

  actions: {
    async getCurrentUser({ commit }, userData) {
      try {
        const { userId, admin } = userData;
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          commit("setProfileInfo", docSnap);
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
      querySnapshot.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogTitle: doc.data().blogTitle,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
            blogDate: doc.data().date,
          };
          state.blogPosts.push(data);
        }
      });
      state.postLoaded = true;
    },
  },

  modules: {},
};

const store = new Vuex.Store(storeData);
export default store;
