import Friend from "../models/Friend.js";
import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export const sendFriendRequest = async (req, res) => {
    try {
        const { to, message } = req.body;
        const from = req.user.id;
        if (to === from) {
            return res.status(400).json({ message: "Bạn không thể gửi lời mời kết bạn cho chính mình" });
        }
        const userExists = await User.exists({ _id: to });
        if (!userExists) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }

        let userA = from.toString();
        let userB = to.toString();
        if (userA > userB) {
            [userA, userB] = [userB, userA];
        }
        const [aldreadyFriends, existingRequest] = await Promise.all([
            Friend.findOne({ userA, userB }),
            FriendRequest.findOne({
                $or: [
                    { from, to },
                    { from: to, to: from }
                ]
            })
        ]);
        if (aldreadyFriends) {
            return res.status(400).json({ message: "Bạn đã là bạn bè của người này" });
        }
        if (existingRequest) {
            return res.status(400).json({ message: "Đã tồn tại lời mời kết bạn giữa hai người" });
        }
        const request = await FriendRequest.create({ from, to, message });
        return res.status(200).json({ message: "Lời mời kết bạn đã được gửi", request });
    } catch (error) {
        console.error("lỗi khi gửi lời mời kết bạn:", error);
        res.status(500).json({ message: "Lỗi khi gửi lời mời kết bạn" });
    }
}
export const acceptFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const userId = req.user.id;

        const request = await FriendRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: "Lời mời kết bạn không tồn tại" });
        }
        if (request.to.toString() !== userId) {
            return res.status(403).json({ message: "Bạn không có quyền chấp nhận lời mời kết bạn này" });
        }
        const friend = await Friend.create({
            userA: request.from,
            userB: request.to
        });
        await request.findByIdAndDelete(requestId);
        const from = await User.findById(request.from).select("_id displayName avatarUrl").lean();
        return res.status(200).json({
            message: "Lời mời kết bạn đã được chấp nhận", newFriend: {
                _id: from?._id,
                displayName: from?.displayName,
                avatarUrl: from?.avatarUrl
            }
        });
    } catch (error) {
        console.error("lỗi khi chấp nhận lời mời kết bạn:", error);
        res.status(500).json({ message: "Lỗi khi cháp nhận lời mời kết bạn" });
    }
}
export const declineFriendRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const userId = req.user.id;
        const request = await FriendRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({ message: "Lời mời kết bạn không tồn tại" });
        }
        if (request.to.toString() !== userId) {
            return res.status(403).json({ message: "Bạn không có quyền từ chối lời mời kết bạn này" });
        }
        await FriendRequest.findByIdAndDelete(requestId);
        return res.status(204)
    } catch (error) {
        console.error("lỗi khi từ chối mời kết bạn:", error);
        res.status(500).json({ message: "Lỗi khi từ chối lời mời kết bạn" });
    }
}
export const getAllFriends = async (req, res) => {
    try {

    } catch (error) {
        console.error("lỗi khi lấy danh sách bạn bè:", error);
        res.status(500).json({ message: "Lỗi khi lấy danh sách bạn bè" });
    }
}
export const getFriendRequests = async (req, res) => {
    try {

    } catch (error) {
        console.error("lỗi khi lấy danh sách lời mời kết bạn:", error);
        res.status(500).json({ message: "Lỗi khi lấy danh sách lời mời kết bạn" });
    }
}   