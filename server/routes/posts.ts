import { Router } from "express";

const router = Router();
//add new post
router.post("/new")
//get all posts
router.get("/all")
//get post by id
router.get("/:id")
//update post by id
router.put("/:id")
//delete post by id
router.delete("/:id")

export default router;
