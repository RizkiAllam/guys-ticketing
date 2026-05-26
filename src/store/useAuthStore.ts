import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';
import { AuthState } from '../types/auth';

interface AuthActions {
  setAuth: (session: Session | null) => void;
  setInitialized: (val: boolean) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  session: null,
  initialized: false,
  isLoading: true,
  setAuth: (session) => set({ 
    session, 
    user: session?.user ?? null, 
    initialized: true,
    isLoading: false 
  }),
  setInitialized: (val) => set({ initialized: val }),
  signOut: () => set({ user: null, session: null, initialized: true, isLoading: false }),
}));