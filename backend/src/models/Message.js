import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
        index: true
    },
    senderId: {
        type: mongoose.Schema.types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        trim: true,
    },
    imgUrl: {
        type: string
    },
}, {
    timestamps: true
})
messageShema.index({ conversationId: 1, createdAt: -1 });
const Message = mongoose.model("Message", messageSchema);
export default Message;