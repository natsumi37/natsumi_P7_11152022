import { createRouter, createWebHistory } from "vue-router"
import UserSignupView from "@/views/UserSignupView.vue"
import UserLoginView from "@/views/UserLoginView.vue"
import PostsAllView from "@/views/PostsAllView.vue"
import PostsUnreadView from "@/views/PostsUnreadView.vue"
import PostReadView from "@/views/PostReadView.vue"
import PostCreateView from "@/views/PostCreateView.vue"
import PostModifyView from "@/views/PostModifyView.vue"
import EmployeesAllView from "@/views/EmployeesAllView.vue"
import { authorizedToken } from "./guards"

const routes = [
  {
    path: "/",
    name: "signup",
    component: UserSignupView
  },
  {
    path: "/login",
    name: "login",
    component: UserLoginView
  },
  {
    path: "/posts",
    name: "postsAll",
    component: PostsAllView,
    meta: { requiresAuth: true }
  },
  {
    path: "/posts/unread",
    name: "postsUnread",
    component: PostsUnreadView,
    meta: { requiresAuth: true }
  },
  {
    path: "/posts/:id",
    name: "postRead",
    component: PostReadView,
    meta: { requiresAuth: true }
  },
  {
    path: "/posts/create",
    name: "postCreate",
    component: PostCreateView,
    meta: { requiresAuth: true }
  },
  {
    path: "/posts/modify/:id",
    name: "postModify",
    component: PostModifyView,
    meta: { requiresAuth: true }
  },
  {
    path: "/employees",
    name: "employees",
    component: EmployeesAllView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(authorizedToken);

export default router;
