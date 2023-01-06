import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "../controller/posts/create";

const postRouter = Router();
//add new post
postRouter.post("/new", createPost);
//get all posts
postRouter.get("/all", getPosts);
//get post by id
// postRouter.get("/:id", getPostById);
//update post by id
postRouter.put("/:id", updatePost);
//delete post by id
postRouter.delete("/:id", deletePost);

export default postRouter;
