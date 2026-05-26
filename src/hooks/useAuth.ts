import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';

export function useAuth() {
  const { setAuth, signOut } = useAuthStore();

  useEffect(() => {
    // Ambil sesi aktif saat aplikasi pertama kali dimuat
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuth(session);
    });

    // Jalankan listener jika ada status perubahan (Sign In / Sign Out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuth(session);
      } else {
        signOut();
      }
    });

    return () => subscription.unsubscribe();
  }, []);
}