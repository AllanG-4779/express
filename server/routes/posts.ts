import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controller/posts/create";
import { authenticationRequired, isAuthor } from "../utils/auth_middleware";

const postRouter = Router();
//add new post
postRouter.post("/new", authenticationRequired, createPost);
//get all posts
postRouter.get("/all", getPosts);
//get post by id
// postRouter.get("/:id", getPostById);
//update post by id
postRouter.patch("/:id", authenticationRequired, isAuthor, updatePost);
//delete post by id
postRouter.delete("/:id", isAuthor, deletePost);

export default postRouter;
