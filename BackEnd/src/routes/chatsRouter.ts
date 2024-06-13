//importing packages/files
import { Router } from "express";
import { verifyToken } from "../utilities/token.js";
import { chatCompValidator, validate } from "../utilities/validator.js";
import { genChats, sendAllChats, deleteChats } from "../controllers/chats.js";
//Variables
let chatsRouter = Router();
//Router
chatsRouter.post("/new", validate(chatCompValidator), verifyToken, genChats);
chatsRouter.get("/all-chats", verifyToken, sendAllChats);
chatsRouter.delete("/delete", verifyToken, deleteChats);

//Exporting Router
export default chatsRouter;
