import Post from '../model/post.js';

const checkOwner = async (req, res, next) => {
    const { id } = req.params; // get the post id
    
    let post = await Post.findById(id);

    if(post.author.equals(req.user._id)){
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default checkOwner;