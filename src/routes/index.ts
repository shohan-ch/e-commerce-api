import express, { Router } from "express";
import { auth } from "./FrontEnd/V1/auth";
import { posts } from "./FrontEnd/V1/posts";
import { file } from "./FrontEnd/V1/file";

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
];

routes.forEach((route) => router.use(route.name || "", route.path));

export default router;
