import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import UserDataService from "../services/UserDataService";
import PostDataService from "../services/PostDataService";

export default createStore({
  state: {
    /* 
     store state: {
      singleUserForm: {} - signup, login
      SinglePostForm: {} - createSinglePost, modifySinglePost,
      allUsers: []
      allPosts:[]
      singlePost: {} - getSinglePost, deleteSinglePost, readPost, likePost
      auth: {}
      loggedinUser: {}
    }
    */
    singleUserForm: {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      profilePicUrl: ""
    },
    singlePostForm: {
      postId: "",
      title: "",
      content: "",
      contentImgUrl: "",
      userId: "",
      readPostId: [],
      likePostId: []
    },
    allUsers: [],
    allPosts: [],
    singlePost: {
      postId: "",
      title: "",
      content: "",
      contentImgUrl: "",
      userId: "",
      readPostId: [],
      likePostId: []
    },
    unreadPosts: [],
    auth: {
      userId: "",
      token: ""
    },
    loggedinUser: {
      firstName: "",
      lastName: "",
      email: "",
      profilePicUrl: ""
    },
  },
  getters: {
    getUserFullName(state) {
      return `${state.loggedinUser.firstName} ${state.loggedinUser.lastName}`
    }
  },
  mutations: {
    signup(state, data) {
      state.singleUserForm.firstName = data.firstName;
      state.singleUserForm.lastName = data.lastName;
      state.singleUserForm.email = data.email;
      state.singleUserForm.password = data.password;
      state.singleUserForm.profilePicUrl = data.profilePicUrl;
    },
    login(state, data) {
      state.auth.userId = data.userId;
      state.auth.token = data.token;
      state.loggedinUser.firstName = data.firstName;
      state.loggedinUser.lastName = data.lastName;
      state.loggedinUser.email = data.email;
      state.loggedinUser.profilePicUrl = data.profilePicUrl;
    },
    logout(state) {
      state.auth = {};
      state.loggedinUser = {};
    },
    deleteAccount(state) {
      state.auth = {};
      state.loggedinUser = {};
    },
    getAllUsers(state, data) {
      state.allUsers = data;
    },
    getAllPosts(state, data) {
      state.allPosts = data;
    },
    getSinglePost(state, data) { // singlePost
      state.singlePost.postId = data.post_id;
      state.singlePost.title = data.title;
      state.singlePost.content = data.content;
      state.singlePost.contentImgUrl = data.contentImgUrl;
      state.singlePost.userId = data.userId;
      state.singlePost.readPostId = data.readPostId;
      state.singlePost.likePostId = data.likePostId;
    },
    getUnreadPosts(state, data) {
      state.unreadPosts = data;
    },
    createSinglePost(state, data) {
      state.singlePostForm.title = data.title;
      state.singlePostForm.content = data.content;
      state.singlePostForm.contentImgUrl = data.contentImgUrl;
      state.singlePostForm.userId = data.userId;
      // state.singlePostForm.readPostId = [],
      // state.singlePostForm.likePostId = []
    },
    modifySinglePost(state, data) {
      state.singlePostForm.postId = data.post_id; // is it okay to use singlePostForm that is the same with createSinglePost?
      state.singlePostForm.title = data.title;
      state.singlePostForm.content = data.content;
      state.singlePostForm.contentImgUrl = data.contentImgUrl;
      state.singlePostForm.userId = data.userId;
    },
    deleteSinglePost(state) {
      state.singlePost = {};
    },
    readPost(state) {
      state.singlePost.readPostId.push(state.auth.userId);
    },
    likePost(state) {
      state.singlePost.likePostId.push(state.auth.userId);
    }
  },
  actions: {
    async signup({ commit }, { firstName, lastName, email, password, profilePicUrl }) {
      const user = {
        user: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          profilePicUrl: profilePicUrl
        }
      }
      try {
        const signupResult = await UserDataService.signup(user);
        if (signupResult.data) {
          commit("signup", user);
        } else {
          console.log("Signup failed!");
        }
      } catch(error) {
        console.log(error);
      }
    },
    async login({ commit }, { email, password }) {
      const user = {
        email: email,
        password: password
      }
      try {
        const loginResult = await UserDataService.login(user);
        if (loginResult.data) {
          commit("login", loginResult.data);
          // localStorage.setItem("access_token", loginResult.data.token);
          // localStorage.setItem("userId", loginResult.data.userId);
        } else {
          console.log("Login failed!");
        }
      } catch(error) {
        console.log(error);
      }
    },
    logout({ commit }) {
      try {
        commit("logout");
        localStorage.removeItem("vuex");
        // localStorage.removeItem("access_token");
        // localStorage.removeItem("userId");
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAccount({ commit, state }) {
        const userId = state.auth.userId;
        const deleteAccountResult = await UserDataService.deleteUser(userId);
        console.log({deleteAccountResult})
        if (deleteAccountResult.data) {
          commit("deleteAccount");
        } else {
          console.log("Delete account failed!");
        }
    },
    async getAllUsers({ commit }) {
      try {
        const getAllUsersResult = await UserDataService.getAllUsers();
        console.log({getAllUsersResult})
        if (getAllUsersResult.data) {
          commit("getAllUsers", getAllUsersResult.data);
        }
      } catch(error) {
        console.log(error);
      }

    },
    async getAllPosts({ commit }) {
      try {
        const getAllPostsResult = await PostDataService.getAllPosts();
        if (getAllPostsResult.data) {
          commit("getAllPosts", getAllPostsResult.data);

        }
      } catch(error) {
        console.log(error);
      }
    },
    async getSinglePost({ commit }) {
      const postId = new URLSearchParams(window.location.href.split("/posts/")[1]);
      try {
        const getSinglePostResult = await PostDataService.getOnePost(postId);
        if (getSinglePostResult.data) {
          commit("getSinglePost", getSinglePostResult.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getUnreadPosts({commit}) {
        const getUnreadPostsResult = await PostDataService.getUnreadPosts();
        console.log({getUnreadPostsResult});
        if (getUnreadPostsResult.data) {
          commit("getUnreadPosts", getUnreadPostsResult.data);
        }
    },
    async createSinglePost({ commit, state }, { title, content, contentImgUrl, userId, readPostId, likePostId }) {
      const post = {
        post: {
          title: title,
          content: content,
          contentImgUrl: contentImgUrl,
          userId: state.auth.userId
        }
      }
      try {
        const createSinglePostResult = await PostDataService.createPost(post);
        if (createSinglePostResult.data) {
          commit("createSinglePost", createSinglePostResult.data);
        } else {
          console.log("Post failed!");
        }
      } catch(error) {
        console.log(error);
      }
    },
    async modifySinglePost({ commit, state }, { title, content, contentImgUrl }) {
      const postId = new URLSearchParams(window.location.href.split("/modify/")[1]);
      const post = {
        title: title,
        content: content,
        contentImgUrl: contentImgUrl,
        userId: state.auth.userId
      }
      console.log(post)
      try {
        const modifySinglePostResult = await PostDataService.modifyPost(postId, { post });
        console.log({modifySinglePostResult})
        if (modifySinglePostResult.data) {
          commit("modifySinglePost", modifySinglePostResult.data);
        }
      } catch(error) {
        console.log(error);
      }
    },
    async deleteSinglePost({ commit, state }) {
      const postId = new URLSearchParams(window.location.href.split("/posts/")[1]);
      console.log({postId})
      try {
        const deleteSinglePostResult = await PostDataService.deletePost(postId);
        console.log({deleteSinglePostResult})
        if (deleteSinglePostResult.data) {
          commit("deleteSinglePost");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async readPost({ commit }, { postId, userId }) {
      try {
        const readPostResult = await PostDataService.readPost(postId, { userId });
        console.log({readPostResult})
        if (readPostResult.data) {
          commit("readPost", readPostResult.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async likePost({ commit }, { postId, userId }) {
      try {
        // like === 1, not like === 0
        const likePostResult = await PostDataService.likePost(postId, { userId });
        console.log({likePostResult})
        if (likePostResult.data) {
          commit("likePost", likePostResult.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
