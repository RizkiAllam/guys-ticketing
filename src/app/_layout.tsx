import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';

// MUST import global CSS for NativeWind v4 to work
import '../theme/global.css';

export default function RootLayout() {
  const { session, isLoading, setAuth, setLoading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

// Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setAuth(session, session?.user ?? null);
      } catch (error) {
        console.error("Supabase Auth Init Error:", error);
        // Force loading to false so the app doesn't hang on splash screen
        setAuth(null, null);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuth(session, session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Route guarding logic
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    
    if (!session && !inAuthGroup) {
      // If not logged in and not in auth group, redirect to login
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      // If logged in and in auth group, redirect to main tabs
      router.replace('/(tabs)');
    }
  }, [session, isLoading, segments]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        {/* Daftarkan index sebagai titik awal */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  );
}