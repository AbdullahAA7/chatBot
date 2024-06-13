//importing packages/files
import { Router } from "express";
import userRouter from "./userRouter.js";
import chatsRouter from "./chatsRouter.js";
let starRouter = Router();

//middlewares
starRouter.use("/user", userRouter); // Domain/star/user => userRouter.js
starRouter.use("/chat", chatsRouter); // Domain/star/chat=> chatsRouter.js

//Exporting Router
export default starRouter;
