import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ _id: id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
}

const verifyToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET);
}

export { generateToken, verifyToken };