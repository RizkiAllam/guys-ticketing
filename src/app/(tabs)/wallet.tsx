import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Halaman akses cepat tiket.
 * Dirancang untuk menampilkan QR Code dari event yang berlangsung hari ini.
 */
export default function WalletScreen() {
  return (
    <View className="flex-1 bg-white dark:bg-dark-900 items-center justify-center p-4">
      <View className="w-full max-w-sm bg-dark-800 rounded-3xl p-6 border border-neon-pink/30 items-center">
        <Text className="text-neon-pink font-bold text-sm tracking-widest uppercase mb-4">
          Ready for Check-In
        </Text>
        <View className="w-48 h-48 bg-white rounded-xl items-center justify-center mb-6">
          <Ionicons name="qr-code" size={120} color="#0A0A0F" />
        </View>
        <Text className="text-xl font-bold text-white mb-1">Guys Fest 2026</Text>
        <Text className="text-slate-400 text-sm">VIP Access - Gate A</Text>
      </View>
    </View>
  );
}