import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../store/useAuthStore';

export default function DashboardScreen() {
  const { signOut } = useAuthStore();

  return (
    <View className="flex-1 bg-dark-900 justify-center items-center px-6">
      <Text className="text-white text-2xl font-bold mb-4">Dashboard Utama</Text>
      <Text className="text-white/60 text-center mb-8">
        Selamat datang di Guys Ticketing. Fitur navigasi tab akan segera dibangun di sini.
      </Text>
      
      <Button 
        label="Log Out" 
        variant="outline" 
        onPress={() => signOut()} 
      />
    </View>
  );
}