import User from "../model/user.js";

const register = async (req, res) => {
    try{
        const { fullName, email, password } = req.body;

        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({
                message: "User already exists with this email",
            });
        }

        const newUser = await User({
            fullName,
            email,
            password,
        });

        await newUser.save();

        let token = await newUser.generateToken();

        res.status(200).json({
            message: "User created successfully",
            user: {
                fullName: newUser.fullName,
                email: newUser.email,
            },
            token,
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
};

const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({
                message: "User not exists with this email",
            });
        }

        let isMatch = await user.matchPassword(password, user.password);

        if(!isMatch) {
            return res.status(400).json({
                message: "Incorrect password",
            });
        }

        let token = await user.generateToken();
        
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                fullName: user.fullName,
                email: user.email,
            },
            token,
        });

    }catch(error){
        console.log(error);
    }
};

const logout = async (req, res) => {};

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const { _id } = req.user;
    
    try {
        let user = await User.findById(_id);

        if(!(await user.matchPassword(oldPassword))){
            return res.status(401).json({
                message: "Invalid old password"
            })
        }

        user.password = newPassword;

        await user.save();

        return res.status(200).json({
            message: "Password updated successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
};

export { register, login, logout, changePassword };