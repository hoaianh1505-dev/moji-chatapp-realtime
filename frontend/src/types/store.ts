import type { Message } from "react-hook-form";
import type { Conversation } from "./chat";
import type { User } from "./user";

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;

  setAccessToken: (accessToken: string) => void;
  clearState: () => void;
  signUp: (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  fetchMe: () => Promise<void>;
  refresh: () => Promise<void>;
}
export interface ThemeSate {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (dark: boolean) => void;
}
export interface ChatState {
  conversations: Conversation[];
  messages: Record<string, {
    items: Message[];
    hasMore: boolean; //infinite scroll
    nextCursor: string | null; //Phân trang kiểu cursor-based
  }>
  activeConversationId: string | null;
  loading: boolean;
  reset: () => void;
  setActiveConversation: (id: string | null) => void;
  fetchConversation: () => Promise<void>;
}