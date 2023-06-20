import mongoose from "mongoose";
import schema from "./users-schema.js"
const userModel = mongoose.model("UsersModel",schema)
export default userModel;