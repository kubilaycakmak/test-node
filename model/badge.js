import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    },
}); 

const Badge = mongoose.model("Badge", badgeSchema);

export default Badge;