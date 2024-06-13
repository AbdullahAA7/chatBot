import { connect, disconnect } from "mongoose";

let MONGODB_URL = import.meta.env.MONGODB_URL;

async function connectDB() {
  try {
    await connect(MONGODB_URL);
  } catch (error) {
    console.log(error);
    throw new Error("Could not Connect To MongoDB");
  }
}

async function disCsonnectDB() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Could not Disconnect From MongoDB");
  }
}

export { connectDB, disCsonnectDB };
