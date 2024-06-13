import { compare, hash } from "bcrypt";
import User from "../models/userModel.js";
import { Request, Response, NextFunction } from "express";
import { createToken } from "../utilities/token.js";
import toast from "react-hot-toast";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Getting all users
    let users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //Signup the new user
    const { name, email, password } = req.body;
    const exsistingUser = await User.findOne({ email });
    if (exsistingUser) {
      return res.send("user already exists");
    }
    const Password = await hash(password, 10);
    const user = new User({ name, email, password: Password });
    await user.save();
    // creating token and storing cookies for user
    res.clearCookie("Cookie_Token", {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie("Cookie_Token", token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });
    return res.status(201).json({
      message: "Signup successful",
      name: user.name,
      email: user.email,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //login the exsisting user
    let { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not Registered");
    }
    let isPassword = await compare(password, user.password);
    if (!isPassword) {
      return res.status(400).send("Incorrect Password");
    }
    // //creating token and storing cookies for user
    res.clearCookie("Cookie_Token", {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie("Cookie_Token", token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({
      message: "Login successful",
      name: user.name,
      email: user.email,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not Registered");
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission didn't match ");
    }

    return res.status(200).json({
      message: "OK",
      name: user.name,
      email: user.email,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const logoutUser = async (
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

    res.clearCookie("Cookie_Token", {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({
      message: "Login successful",
      name: user.name,
      email: user.email,
    });
  } catch (error: any) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
