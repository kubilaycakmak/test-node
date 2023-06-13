import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    article: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
        required: true,
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: {
        type: String,
        default: "",
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
});

const Post = mongoose.model("Post", postSchema);

export default Post;