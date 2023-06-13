import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../util/passwordUtil.js"
import { generateToken, verifyToken } from "../util/jwtUtil.js";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        required: true,
        type: String,
    },
    bio: {
        type: String,
        default: "",
    },
    avatar: {
        type: String,
        default: "",
    },
    badges: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Badge",
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    }],
    socials: {
        instagram: {
            type: String,
            default: "",
        },
        facebook: {
            type: String,
            default: "",
        },
        twitter: {
            type: String,
            default: "",
        },
        github: {
            type: String,
            default: "",
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password = await hashPassword(this.password);
    next();
});

userSchema.methods.matchPassword = async function(password) {
    console.log(password, this.password);
    return await comparePassword(password, this.password);
}

userSchema.methods.generateToken = async function() {
    return generateToken(this._id);
}

userSchema.methods.verifyToken = async function(token) {
    return verifyToken(token);
}

const User = mongoose.model("User", userSchema);
export default User;

