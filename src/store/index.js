import Vuex from "vuex";
import { db } from "@/firebase/firebaseInit";
import {
  // collection,
  doc,
  getDoc,
  updateDoc,
  // getDocs,
  // collection,
  // query,
  // where,
} from "firebase/firestore";
const storeData = {
  state: {
    sampleBlogCards: [
      {
        blogTitle: "Blog Card Example #1",
        blogCoverPhoto: "stock-1",
        blogDate: "March 1, 2024",
      },

      {
        blogTitle: "Blog Card Example #2",
        blogCoverPhoto: "stock-2",
        blogDate: "March 1, 2024",
      },

      {
        blogTitle: "Blog Card Example #3",
        blogCoverPhoto: "stock-3",
        blogDate: "March 1, 2024",
      },

      {
        blogTitle: "Blog Card Example #4",
        blogCoverPhoto: "stock-4",
        blogDate: "March 1, 2024",
      },
    ],

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

  mutations: {
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
  },
  modules: {},
};

const store = new Vuex.Store(storeData);
export default store;
