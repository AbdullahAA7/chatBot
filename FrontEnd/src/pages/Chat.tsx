import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import red from "@mui/material/colors/red";
import ChatItem from "../components/Chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  sendAllChats,
  sendChatRequest,
  deleteUserChats,
} from "../helpers/ApiHelper";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "model";
  content: string;
};
const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessage, setChatMessage] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessage((previous) => [...previous, newMessage]);

    const chatData = await sendChatRequest(content);
    setChatMessage([...chatData.chats]);
  };

  const handleDeletion = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deleteChats" });
      await deleteUserChats();
      setChatMessage([]);
      toast.success("Chats Deleted Successfully", { id: "deleteChats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting Chats Failed", { id: "deleteChats" });
    }
  };
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadChats" });
      sendAllChats()
        .then((data) => {
          setChatMessage([...data.chats]);
          toast.success("Successfully loaded Chats", { id: "loadChats" });
        })
        .catch((error) => {
          console.log(error);
          toast.error("Loading failed ", { id: "loadChats" });
        });
    }
  }, [auth]);
  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "98.2vw",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", sm: "none", xs: "none" },
          flex: { lg: 0.3, md: 0.2 },
          flexDirection: "column",
          mt: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "70vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgColor: "white",
              color: "black",
              fontWeight: 700,
              fontSize: "1.5rem",
            }}
          >
            {auth?.user?.name[0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "monospace" }}>
            <p> You are Talking to a ChatBot created by</p>
            <p>
              <span
                style={{
                  fontWeight: "bolder",
                  color: "aqua",
                  fontSize: "1.2rem",
                }}
              >
                Abdullah A.A{" "}
              </span>
              Using
              <span>
                {" "}
                <span style={{ color: "#4285f4", fontWeight: "bold" }}>G</span>
                <span style={{ color: "#ea4335", fontWeight: "bold" }}>o</span>
                <span style={{ color: "#fbbc04", fontWeight: "bold" }}>o</span>
                <span style={{ color: "#4285f4", fontWeight: "bold" }}>g</span>
                <span style={{ color: "#34a853", fontWeight: "bold" }}>l</span>
                <span style={{ color: "#ea4335", fontWeight: "bold" }}>
                  e
                </span>{" "}
                <span style={{ color: "#1683fd", fontWeight: "bold" }}>G</span>
                <span style={{ color: "#248df9", fontWeight: "bold" }}>e</span>
                <span style={{ color: "#9f87ec", fontWeight: "bold" }}>m</span>
                <span style={{ color: "#b57ed6", fontWeight: "bold" }}>i</span>
                <span style={{ color: "#d2679c", fontWeight: "bold" }}>n</span>
                <span style={{ color: "#e6536d", fontWeight: "bold" }}>
                  i
                </span>{" "}
                Api
              </span>
            </p>
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "monospace", my: 2, p: 1 }}>
            You can ask some questions related to Programming, Knowledge,
            Business, Advice, Education etc, What ever you Want! But avoid
            sharing personal information.{" "}
          </Typography>
          <Button
            onClick={handleDeletion}
            sx={{
              width: "200px",
              py: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          mr: "auto",
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: { md: "2rem", sm: "1.2rem" },
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          <span style={{ color: "#1683fd", fontWeight: "bold" }}>G</span>
          <span style={{ color: "#248df9", fontWeight: "bold" }}>e</span>
          <span style={{ color: "#9f87ec", fontWeight: "bold" }}>m</span>
          <span style={{ color: "#b57ed6", fontWeight: "bold" }}>i</span>
          <span style={{ color: "#d2679c", fontWeight: "bold" }}>n</span>
          <span style={{ color: "#e6536d", fontWeight: "bold" }}>i</span>: How i
          can help you {auth?.user?.name} today ?
        </Typography>
        <Box
          className="outputbox"
          sx={{
            height: "60vh",
            width: { md: "62vw", sm: "95vh", xs: "60vh" },
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessage.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <Box
          sx={{
            width: "100%",
            borderRadius: 2,
            backgroundColor: "rgb(17, 27, 39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "30px",
              border: "none",
              outline: "none",
              fontSize: "20px",
              color: "white",
              fontFamily: "monospace",
            }}
          />
          <IconButton
            sx={{ ml: "auto", color: "white", mx: 2 }}
            onClick={handleSubmit}
          >
            <IoMdSend />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
