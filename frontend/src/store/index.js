import { createStore } from 'vuex'

export default createStore({
  state: {
    users: [{
      userId: "Natsumi",
      firstName: "Natsumi",
      lastName: "Sakai",
      email: "natsumi@groupomania.com",
      password: "natsumi",
      profilePic: "./assets/images/natsumi_profile.jpg"
    }, {
      userId: "Emma",
      firstName: "Emma",
      lastName: "Tanaka",
      email: "emma@groupomania.com",
      password: "emma",
      profilePic: "./assets/images/natsumi_profile.jpg"
    }, {
      urserId: "Jessica",
      firstName: "Jessica",
      lastName: "Chen",
      email: "jessica@groupomania.com",
      password: "jessica",
      profilePic: "./assets/images/natsumi_profile.jpg"
    }],
    posts: [{
      postId: "1",
      title: "Title 1",
      content: "Content 1",
      contentImg: "../assets/images/natsumi_profile.jpg",
      readPost: ["Natsumi", "Emma"],
      likePost: []
    }, {
      postId: "2",
      title: "Title 2",
      content: "Content 2",
      contentImg: "./assets/images/natsumi_profile.jpg",
      readPost: [],
      likePost: []
    }, {
      postId: "3",
      title: "Title 3",
      content: "Content 3",
      contentImg: "./assets/images/natsumi_profile.jpg",
      readPost: [],
      likePost: []
    }]
  },
  getters: {
    getUnreadPosts(state) {
      const unread = state.posts.filter(post => !post.readPost.includes({ userId: "Natsumi" })) // where I can get userId in frontend
      console.log(unread)
    },
    countUnreadPosts(state, getUnreadPosts) {
      const unread = state.posts.filter(post => !post.readPost.includes({ userId: "Natsumi" }))
      return unread.length
      // wonder if I can do "getUnreadPost.length"
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
