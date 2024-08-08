import express from "express";
import {
  createUser,
  getAllUsers,
  deleteUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").put(updateUser).delete(deleteUser);

export default router;
