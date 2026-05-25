import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  setAuth: (session: Session | null, user: User | null) => void;
  setLoading: (status: boolean) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  
  setAuth: (session, user) => set({ session, user, isLoading: false }),
  
  setLoading: (status) => set({ isLoading: status }),
  
  signOut: async () => {
    // We handle the import dynamically or assume it's handled at the component level
    // to avoid circular dependency in some bundler setups, 
    // but for simplicity, you can call supabase.auth.signOut() from your components.
    set({ session: null, user: null });
  }
}));