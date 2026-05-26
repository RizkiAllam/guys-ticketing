import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Halaman pencarian utama.
 * Disiapkan untuk implementasi filter kategori, lokasi, dan tanggal event.
 */
export default function SearchScreen() {
  return (
    <View className="flex-1 bg-white dark:bg-dark-900 pt-12 px-4">
      <Text className="text-3xl font-bold text-dark-900 dark:text-white tracking-wide mb-6">
        Search
      </Text>
      <View className="flex-row items-center bg-slate-100 dark:bg-dark-800/50 p-4 rounded-2xl border border-slate-200 dark:border-white/10">
        <Ionicons name="search" size={20} color="#64748b" />
        <Text className="text-slate-400 ml-3">Find events, artists, or venues...</Text>
      </View>
    </View>
  );
}