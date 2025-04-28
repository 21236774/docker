import { createRouter, createWebHistory } from "vue-router";
import PostList from "../views/PostList.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import CreatePost from "../views/CreatePost.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: PostList,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/create",
      name: "create",
      component: CreatePost,
      meta: { requiresAuth: true },
    },
  ],
});

export default router;
