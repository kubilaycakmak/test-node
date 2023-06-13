import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;