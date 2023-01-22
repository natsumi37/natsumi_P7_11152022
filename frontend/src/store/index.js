import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import UserDataService from "../services/UserDataService";
import PostDataService from "../services/PostDataService";

export default createStore({
  state: {
    singleUserForm: {
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
    },
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
    allPosts: [],
    singlePost: {
      postId: "",
      title: "",
      content: "",
      contentImgUrl: "",
      userId: "",
      ReadPosts: [],
      LikePosts: []
    },
    unreadPosts: [],
    allUsers: [],
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
    deleteAccount(state) {
      state.auth = {};
      state.loggedinUser = {};
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
    
    getAllPosts(state, data) {
      state.allPosts = data;
    },
    getSinglePost(state, data) {
      state.singlePost.postId = data.post_id;
      state.singlePost.title = data.title;
      state.singlePost.content = data.content;
      state.singlePost.contentImgUrl = data.contentImgUrl;
      state.singlePost.userId = data.userId;
      state.singlePost.ReadPosts = data.ReadPosts;
      state.singlePost.LikePosts = data.LikePosts;
    },
    createSinglePost(state, data) {
      state.singlePostForm.title = data.title;
      state.singlePostForm.content = data.content;
      state.singlePostForm.contentImgUrl = data.contentImgUrl;
      state.singlePostForm.userId = data.userId;
    },
    modifySinglePost(state, data) {
      state.singlePostForm.postId = data.post_id;
      state.singlePostForm.title = data.title;
      state.singlePostForm.content = data.content;
      state.singlePostForm.contentImgUrl = data.contentImgUrl;
      state.singlePostForm.userId = data.userId;
    },
    deleteSinglePost(state) {
      state.singlePost = {};
    },
    // readPost(state) {
    //   state.singlePost.readPostId.push(state.auth.userId);
    // },
    // likePost(state) {
    //   state.singlePost.likePostId.push(state.auth.userId);
    // },
    getUnreadPosts(state, data) {
      state.unreadPosts = data;
    },
    getAllUsers(state, data) {
      state.allUsers = data;
    },
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
      };
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
    async deleteAccount({ commit, state }) {
      const userId = state.auth.userId;
      try {
        const deleteAccountResult = await UserDataService.deleteUser(userId);
        if (deleteAccountResult.data) {
          commit("deleteAccount");
        } else {
          console.log("Delete account failed!");
        }
      } catch(error) {
        console.log(error);
      }
    },
    async login({ commit }, { email, password }) {
      const user = {
        email: email,
        password: password
      };
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
      const postId = parseInt(new URLSearchParams(window.location.href.split("/posts/")[1]));
      try {
        const getSinglePostResult = await PostDataService.getOnePost(postId);
        if (getSinglePostResult.data) {
          commit("getSinglePost", getSinglePostResult.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async createSinglePost({ commit, state }, { title, content, contentImgUrl }) {
      const post = {
        post: {
          title: title,
          content: content,
          contentImgUrl: contentImgUrl,
          userId: state.auth.userId
        }
      };
      try {
        const createSinglePostResult = await PostDataService.createPost(post);
        if (createSinglePostResult.data) {
          commit("createSinglePost", createSinglePostResult.data);
        }
      } catch(error) {
        console.log(error);
      }
    },
    async modifySinglePost({ commit, state }, { postId, title, content, contentImgUrl }) {
      const post = {
        title: title,
        content: content,
        contentImgUrl: contentImgUrl,
        userId: state.auth.userId
      };
      try {
        const modifySinglePostResult = await PostDataService.modifyPost(postId, { post });
        if (modifySinglePostResult.data) {
          commit("modifySinglePost", modifySinglePostResult.data);
        }
      } catch(error) {
        console.log(error);
      }
    },
    async deleteSinglePost({ commit, state }, { postId }) {
      try {
        const deleteSinglePostResult = await PostDataService.deletePost(postId);
        if (deleteSinglePostResult.data) {
          commit("deleteSinglePost");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async readPost({ commit }, { postId, userId }) {
      try {
        await PostDataService.readPost(postId, { userId });
      } catch (error) {
        console.log(error);
      }
    },
    async likePost({ commit }, { postId, userId }) {
      try {
        await PostDataService.likePost(postId, { userId });
      } catch (error) {
        console.log(error);
      }
    },
    async getUnreadPosts({ commit, state }) {
      const userId = state.auth.userId;
      try {
        const getUnreadPostsResult = await PostDataService.getUnreadPosts(userId);
        if (getUnreadPostsResult.data) {
          commit("getUnreadPosts", getUnreadPostsResult.data);
        }
      } catch(error) {
        console.log(error)
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
  },

  modules: {
  },

  plugins: [
    createPersistedState()
  ]

});