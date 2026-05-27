import { chatService } from "@/services/chatService";
import type { ChatState } from "@/types/store";
import type { tr } from "zod/v4/locales";
import { create } from "zustand";
import { persist } from "zustand/middleware";
export const useChatStore = create<ChatState>()(
    persist(
        (set, get) => ({
            conversations: [],
            messages: {},
            activeConversationId: null,
            loading: false,
            setActiveConversation: (id) => set({ activeConversationId: id }),
            reset: () => {
                set({
                    conversations: [],
                    messages: {},
                    activeConversationId: null,
                    loading: false,
                });
            },
            fetchConversation: async () => {
                try {
                    set({ loading: true });
                    const { conversations } = await chatService.fetchConversations();
                    set({ conversations, loading: false });
                    set({ conversations });
                } catch (error) {
                    console.error("Lỗi sảy ra khi fetch conversation:", error);
                    set({ loading: false });
                }
            }
        }),
        {
            name: "chat-storage",
            partialize: (state) => ({ conversations: state.conversations })
        }
    )
)