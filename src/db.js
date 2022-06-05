import mongoose from "mongoose";


mongoose.connect("mongodb://127.0.0.1:27017/DevTube");

const db = mongoose.connection;

const handleError = () => console.log(`❌ DB Error`, error); 
const handleOpen = () => console.log("✅ Connected to DB");

db.on("error", handleError);
db.once("open", handleOpen);