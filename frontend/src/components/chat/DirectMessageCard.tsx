import type { Conversation } from '@/types/chat'
import ChatCard from './ChatCard'
import { useAuthStore } from '@/stores/useAuthStore';
import { useChatStore } from '@/stores/useChatStore';
import { cn } from '@/lib/utils';

const GroupChatCard = ({ convo }: { convo: Conversation }) => {
    const { user } = useAuthStore();
    const { activeConversationId, setActiveConversation, messages } = useChatStore();
    if (!user) return null;
    const ortherUser = convo.participants.find((p) => p._id !== user._id);
    if (!ortherUser) return null;
    const unreadCount = convo.unreadCounts[user._id];
    const lastMessage = convo.lastMessage?.content ?? "";
    const handleSelectConversation = async (id: string) => {
        setActiveConversation(id);
        if (!messages[id]) {
            // Tải tin nhắn nếu chưa có
        }
    }
    return (
        <ChatCard
            convoId={convo._id}
            name={ortherUser.displayName}
            timestamp={convo.lastMessage?.createdAt ? new Date(convo.lastMessage.createdAt) : undefined}
            isActive={activeConversationId === convo._id}
            onSelect={handleSelectConversation}
            unreadCount={unreadCount}
            leftSection={
                <>
                    {/* Lma User avatar */}
                </>
            }
            subtitle={
                <p className={cn("text-sm truncate", unreadCount > 0 ? "font-medium teext-foredround" : "text-muted-foreground")}>{lastMessage}</p>
            }
        />
    )
}

export default GroupChatCard
