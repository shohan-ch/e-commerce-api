import { Router } from "express";
import { adminProducts } from "./Admin/adminProducts";
import { auth } from "./FrontEnd/V1/auth";
import { file } from "./FrontEnd/V1/file";
import { posts } from "./FrontEnd/V1/posts";
import { products } from "./FrontEnd/V1/products";
import { carts } from "./FrontEnd/V1/carts";
import { orders } from "./FrontEnd/V1/orders";
import { payments } from "./FrontEnd/V1/payments";
import { shippingAddress } from "./FrontEnd/V1/shipping-address";

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
  {
    name: "/orders",
    path: orders,
  },
  {
    name: "/make-payment",
    path: payments,
  },
  {
    name: "/shipping-address",
    path: shippingAddress,
  },

  // Admin Route

  {
    name: "/admin/products",
    path: adminProducts,
  },
];

routes.forEach((route) => router.use(route.name || "", route.path));

export default router;
