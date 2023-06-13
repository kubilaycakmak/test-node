import Post from "../model/post.js";
import Comment from "../model/comment.js";
import User from "../model/user.js";

const getAllPosts = async (req, res, next) => {
  try {
    let posts = await Post.find({});

    res.status(200).json({
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const getPostById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id)
      .populate({
        path: "comments",
        select: "comment author likes",
        populate: {
          path: "likes",
          select: "fullName"
        }
      })
      .populate({
        path: "likes",
        select: "fullName email avatar",
      });

    if (!post) {
      return res.status(404).json({
        message: `ID: ${id} of post couldn't found.`,
      });
    }

    return res.status(200).json({
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const createAPost = async (req, res, next) => {
  const { title, article, tags } = req.body;
  const { id } = req.user;

  try {
    const user = await User.findById(id);

    if(!user){
      return res.status(404).json({
        message: "User couldn't find"
      })
    }

    const newPost = new Post({
      title,
      article,
      tags,
      author: id,
    });

    await newPost.save();

    user.posts.push(newPost._id);

    await user.save();

    return res.status(201).json({
      message: "Post Created!",
      post: newPost,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, article, tags, image } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        title,
        article,
        tags,
        image,
      },
      { new: true }
    );

    return res.status(200).json({
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.findByIdAndDelete(id);

    return res.status(200).json({
      message: `Post: ${id} is deleted!`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Server error`,
    });
  }
};

const createComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const userId = req.user._id;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: `ID: ${id} of post couldn't found.`,
      });
    }

    const newComment = new Comment({
      comment: comment,
      author: userId,
      post: id,
      likes: [],
    });

    await newComment.save();

    post.comments.push(newComment._id);

    await post.save();

    return res.status(201).json({
      message: "Comment created!",
      comment: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const updateComment = async (req, res) => {
  const { newComment } = req.body;
  const { id } = req.params;

  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      {
        comment: newComment,
      },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({
        message: `ID: ${id} of comment couldn't found.`,
      });
    }

    return res.status(200).json({
      message: "Comment Updated",
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    await Comment.findByIdAndDelete(id);

    return res.status(200).json({
      message: `Comment: ${id} is deleted!`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        message: `ID: ${id} of post couldn't found.`,
      });
    }

    post.likes.push(req.user._id);

    await post.save();

    return res.status(201).json({
      message: "Like is created!",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const unlikePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $pull: {
          likes: req.user._id,
        },
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        message: `ID: ${id} of post couldn't found.`,
      });
    }

    return res.status(200).json({
      message: "Liked deleted!",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const likeComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        message: `ID: ${id} of comment couldn't found.`,
      });
    }

    comment.likes.push(req.user._id);

    await comment.save();

    return res.status(201).json({
      message: "Comment Liked!",
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const unlikeComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      {
        $pull: {
          likes: req.user._id,
        },
      },
      { new: true }
    );

    if (!comment) {
      return res.status(404).json({
        message: `ID: ${id} of comment couldn't found.`,
      });
    }

    return res.status(201).json({
      message: "Comment unliked!",
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export {
  getAllPosts,
  getPostById,
  createAPost,
  updatePost,
  deletePost,
  // comment
  createComment,
  updateComment,
  deleteComment,
  // like post
  likePost,
  unlikePost,
  // like comment
  likeComment,
  unlikeComment,
};
