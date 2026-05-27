import api from "@/lib/axios";
import type { ConversationResponse, Message } from "@/types/chat";
export const chatService = {
    fetchConversations: async (): Promise<ConversationResponse> => {
        const res = await api.get("/conversations");
        return res.data;
    }
}