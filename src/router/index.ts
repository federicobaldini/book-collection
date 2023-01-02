import { createRouter, createWebHistory } from "vue-router";
import BooksView from "../books/views/BooksView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "books",
      component: BooksView,
    },
  ],
});

export default router;
