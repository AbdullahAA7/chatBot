import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  Content,
} from "@google/generative-ai";
import { NextFunction, Request, Response } from "express";
import User from "../models/userModel.js";
const apiKey = import.meta.env.GEMINI_API;
export const modelName = "gemini-pro";

export const genChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  console.log(process.env.COOKIE_SECRET);
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not Registered" });
    }
    const chats = user.chats.map(({ role, content }) => ({ role, content }));
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: modelName,
    });

    const generationConfig = {
      temperature: 0.9,
      topP: 1,
      topK: 0,
      maxOutputTokens: 2048,
      responseMimeType: "text/plain",
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const hist = user.chats.map(({ role, content }) => ({
      role: role,
      parts: [{ text: content }],
    })) as Content[];
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: hist,
    });

    const result = await chatSession.sendMessage(message);
    user.chats.push({ content: result.response.text(), role: "model" });
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendAllChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not found");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission didn't match ");
    }

    return res.status(200).json({
      message: "OK",
      chats: user.chats,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not found");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission didn't match ");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({
      message: "OK",
    });
  } catch (error: any) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
