//importing packages/files
import { Router } from "express";
import {
  getAllUsers,
  userSignup,
  userLogin,
  verifyUser,
  logoutUser,
} from "../controllers/users.js";
import {
  loginValidator,
  signupValidator,
  validate,
} from "../utilities/validator.js";
import { verifyToken } from "../utilities/token.js";
//Variables
let userRouter = Router();
//Router
userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupValidator), userSignup);
userRouter.post("/login", validate(loginValidator), userLogin);
userRouter.get("/auth-status", verifyToken, verifyUser);
userRouter.get("/logout", verifyToken, logoutUser);

//Exporting Router
export default userRouter;
