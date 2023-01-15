import store from "@/store/index.js";

export const authorizedToken = (to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth) && store.state.auth.token === "") {
    next("/login");
  } else {
    next();
  }
};