import { Box, Button, Typography } from "@mui/material";
import { IoIosLogIn } from "react-icons/io";
import React, { useEffect } from "react";
import Input from "../components/shared/Input";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing Up.......", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Sign up Failed", { id: "signup" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);
  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
      <Box style={{ userSelect: "none" }}>
        <Box
          padding={{ lg: "1.5rem 10rem 1rem 0", md: "1.5rem 0 1rem 0" }}
          display={{ md: "flex", sm: "none", xs: "none" }}
        >
          <img
            src="airobot.png"
            alt="AI Robot"
            draggable="false"
            style={{
              width: "400px",
              userSelect: "none",
            }}
          />
        </Box>
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 1 }}
        justifyContent={"center"}
        alignItems={"center"}
        ml={"auto"}
        mb={2}
        mt={{ md: 6, sm: 4, xs: 6 }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "5rem 2rem 4rem 2rem",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={1}
              fontWeight={600}
            >
              Signup
            </Typography>
            <Input type="text" name="name" label="Name" />
            <Input type="email" name="email" label="Email" />
            <Input type="Password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1.5,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                fontWeight: "bolder",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
