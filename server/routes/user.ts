import Router from "express";

//initialize router
const router = Router();

//add new user
router.post("/new");
//get all users
router.get("/all");
//get user by id
router.get("/:id");
//update user by id
router.put("/:id");
//delete user by id
router.delete("/:id");
//login user
router.post("/login");
//logout user
router.get("/logout");
