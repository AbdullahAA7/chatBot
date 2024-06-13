import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function getCodeFromString(message: string) {
  if (message.includes("```")) {
    const blocks = message.split("```");
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("//") ||
    str.includes("#") ||
    str.includes("*") ||
    str.includes("**")
  ) {
    return true;
  }
  return false;
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "model";
}) => {
  const messageBlock = getCodeFromString(content);
  const auth = useAuth();
  return role === "model" ? (
    <Box
      sx={{
        display: "flex",
        padding: 2,
        bgcolor: "#004d5612",
        my: 2,
        gap: 2,
      }}
    >
      <Avatar sx={{ ml: "0" }}>
        <img src="openai.png" alt="OPEN_AI" width={"30px"} />
      </Avatar>
      <Box>
        {!messageBlock && (
          <Typography sx={{ color: "white", fontSize: "1rem" }}>
            {content}
          </Typography>
        )}

        {messageBlock &&
          messageBlock.length &&
          messageBlock.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                style={coldarkDark}
                language={block.split(" ")[0]}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ color: "white", fontSize: "1.4rem" }}>
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        padding: 2,
        bgcolor: "#004d56",
        gap: 2,
        my: 2,
      }}
    >
      <Avatar sx={{ ml: 0, bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
      </Avatar>
      <Box>
        {!messageBlock && (
          <Typography sx={{ color: "white", fontSize: "1.4rem" }}>
            {content}
          </Typography>
        )}

        {messageBlock &&
          messageBlock.length &&
          messageBlock.map((block) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                style={coldarkDark}
                language={block.split(" ")[0]}
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Typography sx={{ color: "white", fontSize: "1rem" }}>
                {block}
              </Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
