import { Router } from "express";
import { adminProducts } from "./Admin/adminProducts";
import { auth } from "./FrontEnd/V1/auth";
import { file } from "./FrontEnd/V1/file";
import { posts } from "./FrontEnd/V1/posts";
import { products } from "./FrontEnd/V1/products";
import { carts } from "./FrontEnd/V1/carts";

const router = Router();

const routes = [
  {
    name: "/auth",
    path: auth,
  },
  {
    name: "/posts",
    path: posts,
  },
  {
    path: file,
  },
  {
    name: "/products",
    path: products,
  },
  {
    name: "/carts",
    path: carts,
  },

  // Admin Route

  {
    name: "/admin/products",
    path: adminProducts,
  },
];

routes.forEach((route) => router.use(route.name || "", route.path));

export default router;
