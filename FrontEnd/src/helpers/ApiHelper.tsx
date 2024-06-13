import axios from "axios";

export const userLogin = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Problem in Login");
  }
  const data = await res.data;
  return data;
};

export const userSignup = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  console.log(res);
  if (res.status !== 201) {
    throw new Error("Problem in Signup");
  }
  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  const data = await res.data;
  return data;
};
export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message });
  if (res.status !== 200) {
    throw new Error("Unable to send Chat");
  }
  const data = await res.data;
  return data;
};

export const sendAllChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send Chats");
  }
  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete Chats");
  }
  const data = await res.data;
  return data;
};
export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete Chats");
  }
  const data = await res.data;
  return data;
};
