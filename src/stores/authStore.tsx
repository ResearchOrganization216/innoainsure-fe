import { User } from "@/models/User";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  username: string | null;
}

interface AuthStore extends AuthState {
  storeUser: (token: string) => void;
  storeUserObj: (user: User) => void;
  logout: () => void;
  isSignOutVisible: boolean;
  setIsSignOutVisible: (visible: boolean) => void;
}

// Attempt to rehydrate user from localStorage
const token = localStorage.getItem("token");
let userFromToken: User | null = null;
if (token) {
  try {
    userFromToken = jwtDecode(token) as User;
  } catch (error) {
    console.error("Failed to decode token:", error);
  }
}

const initialState: AuthState = {
  user: userFromToken,
  username: userFromToken ? userFromToken.Name : null,
};

// Updated Zustand auth store with rehydration
const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,
  storeUser: (token: string) => {
    localStorage.setItem("token", token);
    try {
      const decodedUser = jwtDecode(token) as User;
      set({ user: decodedUser, username: decodedUser.Name });
    } catch (error) {
      console.error("Failed to decode token:", error);
      set({ user: null, username: null });
    }
  },
  storeUserObj: (user: User) => {
    set({ user, username: user.Name });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, username: null });
  },
  isSignOutVisible: false,
  setIsSignOutVisible: (visible: boolean) => set({ isSignOutVisible: visible }),
}));

export default useAuthStore;
