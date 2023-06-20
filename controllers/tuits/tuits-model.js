import mongoose from "mongoose";
import tuitsSchema from "./tuits-schema.js";
const tuitsModel = mongoose.model('TuitModle',tuitsSchema)
export default tuitsModel;