import User from "../model/user.js"

const getMe = async (req, res, next) => {
    const { _id } = req.user; // comes from authentication middleware

    let user = await User.findById(_id).select("-password");

    res.status(200).json({
        user
    })
};

const updateUserProfile = async (req, res, next) => {
    const { bio, avatar, socials } = req.body;
    const { _id } = req.user; // comes from authentication middleware

    try {
        const user = await User.findByIdAndUpdate(_id, {
            bio,
            avatar,
            socials
        }, { new: true });

        return res.status(200).json({
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        })
    }
};

export {
    getMe, 
    updateUserProfile
}