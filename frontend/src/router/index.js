import { createRouter, createWebHistory } from "vue-router"
import UserSignupView from "@/views/UserSignupView.vue"
// import UserLoginView from "@/views/UserLoginView.vue"
// import PostsAllView from "@/views/PostsAllView.vue"
// import PostsUnreadView from "@/views/PostsUnreadView.vue"
// import PostCreateView from "@/views/PostCreateView.vue"
// import PostReadView from "@/views/PostReadView.vue"
// import EmployeesAllView from "@/views/EmployeesAllView.vue"

const routes = [
  {
    path: "/",
    name: "signup",
    component: UserSignupView
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/UserLoginView.vue")
  },
  {
    path: "/posts",
    name: "postsAll",
    component: () => import("../views/PostsAllView.vue")
  },
  {
    path: "/posts/unread",
    name: "postsUnread",
    component: () => import("../views/PostsUnreadView.vue")
  },
  {
    path: "/posts/:id",
    name: "postRead",
    component: () => import("../views/PostReadView.vue")
  },
  {
    path: "/posts/create",
    name: "postCreate",
    component: () => import("../views/PostCreateView.vue")
  },
  {
    path: "/employees",
    name: "employees",
    component: () => import("../views/EmployeesAllView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
