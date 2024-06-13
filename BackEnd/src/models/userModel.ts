//importing packages/files
import mongoose from "mongoose";
import { randomUUID } from "crypto";

//Variables
let Schema = mongoose.Schema;
let Model = mongoose.model;

//creating chats Schema
let chatsSchema = new Schema({
  id: {
    type: String,
    default: randomUUID(),
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

//Creating user Schema
let userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  chats: [chatsSchema],
});

export default Model("User", userSchema);
