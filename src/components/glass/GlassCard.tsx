import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useColorScheme } from 'nativewind';
import { cn } from '../../utils/cn';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  // Kita jadikan 'tint' opsional, jika tidak diisi akan mengikuti sistem
  tint?: 'light' | 'dark' | 'default'; 
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  intensity = 20,
  tint,
  ...props
}) => {
  const { colorScheme } = useColorScheme();
  const activeTint = tint || (colorScheme === 'dark' ? 'dark' : 'light');

  return (
    <View
      className={cn(
        "overflow-hidden rounded-[32px] border",
        // Adaptif border dan background
        "border-slate-200/50 bg-white/40", // Light mode
        "dark:border-white/10 dark:bg-white/5", // Dark mode
        className
      )}
      {...props}
    >
      <BlurView
        intensity={intensity}
        tint={activeTint}
        style={StyleSheet.absoluteFill}
      />
      <View className="z-10 p-5">
        {children}
      </View>
    </View>
  );
};