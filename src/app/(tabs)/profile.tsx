import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore';
import { GlassCard } from '../../components/glass/GlassCard';

export default function ProfileScreen() {
  const { session, signOut } = useAuthStore();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error: any) {
      Alert.alert('Logout Failed', error.message);
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-dark-900 pt-12 px-4">
      <View className="mb-8 mt-4">
        <Text className="text-3xl font-bold text-dark-900 dark:text-white tracking-wide">
          Profile
        </Text>
      </View>

      <GlassCard intensity={20} className="p-6 mb-6">
        <View className="items-center mb-4">
          <View className="w-20 h-20 rounded-full bg-slate-200 dark:bg-dark-800 border-2 border-neon-pink items-center justify-center mb-4">
            <Ionicons name="person" size={40} color="#FF2A6D" />
          </View>
          <Text className="text-lg font-bold text-dark-900 dark:text-white">
            {session?.user?.email || 'User'}
          </Text>
          <Text className="text-sm text-slate-500 mt-1">
            Standard Member
          </Text>
        </View>
      </GlassCard>

      <TouchableOpacity 
        onPress={handleLogout}
        activeOpacity={0.8}
        className="flex-row items-center justify-center bg-dark-800/50 dark:bg-white/10 border border-slate-200 dark:border-white/10 py-4 rounded-2xl"
      >
        <Ionicons name="log-out-outline" size={20} color="#FF2A6D" />
        <Text className="text-neon-pink font-bold ml-2 text-base">
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}