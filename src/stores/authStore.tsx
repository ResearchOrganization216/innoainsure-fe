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
}

//initial state
const initialState: AuthState = {
  user: null,
  username: null,
};

// Auth store
const useAuthStore = create<AuthStore>((set) => ({
  // State
  ...initialState,

  // Actions
  storeUser: (token) => {
    localStorage.setItem("token", token);
    const decodedUser = jwtDecode(token) as User;
    set({ user: decodedUser });
  },
  storeUserObj: (user: User) => {
    set({ user });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ ...initialState });
  },
  isSignOutVisible: false,
  setIsSignOutVisible: (visible: boolean) => set({ isSignOutVisible: visible }),
}));

export default useAuthStore;
