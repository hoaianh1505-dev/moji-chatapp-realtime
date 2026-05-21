import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    messgae: {
        type: String,
        maxlength: 200
    }
}, {
    timestamps: true
})
friendSchema.index({ from: 1, to: 1 }, { unique: true });
friendRequestSchema.index({ from: 1 })
friendRequestSchema.index({ to: 1 })
const FriendRequest = mongoose.model("FriendRequest", friendSchema);
export default FriendRequest;