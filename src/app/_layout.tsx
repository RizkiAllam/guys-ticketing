import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useAuthStore } from '../store/useAuthStore';
import { useAuth } from '../hooks/useAuth';
import '../theme/global.css';

export default function RootLayout() {
  useAuth();
  
  const { session, initialized, isLoading } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!initialized || isLoading) return;

    // Deteksi apakah user sedang berada di folder (auth) atau (tabs)
    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      // Jika tidak ada sesi aktif dan mencoba masuk dashboard, tendang ke login
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      // Jika sesi aktif tapi masih di halaman login/register, lempar ke dashboard
      router.replace('/(tabs)');
    }
  }, [session, initialized, segments, isLoading]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}