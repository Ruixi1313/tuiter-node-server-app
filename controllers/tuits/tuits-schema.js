import mongoose from "mongoose";
const schema = mongoose.Schema({
    topic: String,
    username: String,
    handle: String,
    time: String,
    image: String,
    title: String,
    tuit:String,
    likes:Number,
    liked:Boolean,
    dislikes: Number,
    replies: Number,
    retuits: Number 
},{collection:"tuits",versionKey: false });
export default schema;