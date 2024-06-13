import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box width={"100%"} height={"60vh"} mt={"3rem"}>
      <Box
        sx={{
          display: "flex",
          width: "100vh",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", sm: "column" },
            gap: 5,
          }}
        >
          <img
            src="robot.png"
            alt="Robot"
            style={{
              width: "150px",
              margin: "auto 0 auto -3rem",
              position: "relative",
            }}
          />
          <img
            className="logo rotate"
            src="openai.png"
            alt="Openai"
            style={{ width: "100px", margin: "auto 0 auto 30rem" }}
          />
        </Box>

        <Box sx={{ display: "flex", width: "100%", mx: "auto" }}>
          <img
            src="chat.png"
            alt="ChatImage"
            style={{
              display: "flex",
              margin: "auto",
              width: "100vh",
              borderRadius: 20,
              boxShadow: "-5px -5px 106px #64f3d5",
              marginTop: 20,
              marginBottom: 20,
            }}
          />
        </Box>
      </Box>
      <Box sx={{ px: 20 }}>
        <p>
          <span style={{ fontSize: "1.2rem", color: "red", fontWeight: "600" }}>
            Important Message:
          </span>{" "}
          It is beta version means there are chances that you get errors for
          example delay some seconds in resopnse by the chat bot. But don't
          worry i will upgrade it slowly but continouslly .
        </p>
      </Box>
    </Box>
  );
};

export default Home;
