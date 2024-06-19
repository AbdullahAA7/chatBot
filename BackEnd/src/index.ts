//importing packages/files

import app from "./app.js";
import { connectDB } from "./DB/connect.js";

//Variables
const PORT = import.meta.env.PORT || 8000;
//Connection & listenners
app.listen(PORT, () => {
  console.log(`App is litening on ${PORT}`);
});

connectDB().then(() => {
  console.log("Connected to database ");
});
