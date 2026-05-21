import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    joinAt: {
        type: Date,
        default: Date.now
    }
}, {
    _id: false
})

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    }, createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    _id: false
})

const lastMessageSchema = new mongoose.Schema({
    _id: { type: string },
    content: {
        type: string,
        default: null
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: null
    }
}, {
    _id: false
})

const conversationSchema = new mongoose.Schema({
    type: {
        type: string,
        enum: ["direct", "group"],
        required: true
    },
    participants: {
        type: [participantSchema],
        required: true
    },
    group: {
        type: [groupSchema]
    },
    lastMessageAt: {
        type: Date,
    },
    seenBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    LasstMessage: {
        type: [lastMessageSchema],
        default: null
    },
    unreadCounts: {
        type: map,
        of: Number,
        default: {}
    }
}, {
    timestamps: true
})
conversationSchema.index({ "participants.userId": 1, lastMessageAt: -1 });
const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;