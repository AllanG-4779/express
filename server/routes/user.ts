import Router from "express";
import { registerUser, getUsersPost } from "../controller/user/signup";

//initialize router
const userRouter = Router();

//add new user
userRouter.post("/new", registerUser);
// get all users
userRouter.get("/all/:id/posts", getUsersPost);
// //get user by id
// router.patch("/:id");
// //update user by id
// router.put("/:id");
// //delete user by id
// router.delete("/:id");
// //login user
// router.post("/login");
// //logout user
// router.get("/logout");
export default userRouter;
