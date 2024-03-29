import Vuex from "vuex";
import { db } from "@/firebase/firebaseInit";
import {
  // collection,
  doc,
  getDoc,
  // getDocs,
  // collection,
  // query,
  // where,
} from "firebase/firestore";
const storeData = {
  state: {
    sampleBlogCards: [
      {
        blogTitle: "Blog Card #1",
        blogCoverPhoto: "stock-1",
        blogDate: "May 1, 2021",
      },

      {
        blogTitle: "Blog Card #2",
        blogCoverPhoto: "stock-2",
        blogDate: "May 1, 2021",
      },

      {
        blogTitle: "Blog Card #3",
        blogCoverPhoto: "stock-3",
        blogDate: "May 1, 2021",
      },

      {
        blogTitle: "Blog Card #4",
        blogCoverPhoto: "stock-4",
        blogDate: "May 1, 2021",
      },
    ],
    editPost: null,
    user: null,
    profile: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
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
  },

  actions: {
    async getCurrentUser({ commit }, user) {
      try {
        // const q = query(collection(db, "users"));
        // console.log("user", user);
        // const querySnapshot = await getDocs(q);
        // querySnapshot.forEach((doc) => {
        //   console.log(doc, " => ", doc.data());
        //   commit("setProfileInfo", doc.data());
        //   // commit("setProfileInitials");
        // });
        const userId = user;
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          commit("setProfileInfo", docSnap);
          commit("setProfileInitials");
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    },
  },
  modules: {},
};

const store = new Vuex.Store(storeData);
export default store;
