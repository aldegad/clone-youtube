import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    email: { type: String, trim: true, required: true, unique: true },
    username: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    location: { type: String, trim: true }
});

userSchema.pre("save", async function() {
    this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);
export default User;