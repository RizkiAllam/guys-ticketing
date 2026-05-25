import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';
import { useColorScheme } from 'nativewind';
import { cn } from '../../utils/cn';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  const { colorScheme } = useColorScheme();
  const placeholderColor = colorScheme === 'dark' ? '#ffffff40' : '#0f172a60'; // slate-900 with opacity

  return (
    <View className="mb-4">
      {label && (
        <Text className="mb-2 text-sm font-bold text-slate-700 dark:text-white/70">
          {label}
        </Text>
      )}
      <View className={cn(
        "h-14 w-full justify-center rounded-2xl border px-4",
        // Adaptif border dan background
        "border-slate-300 bg-white/70", // Light mode
        "dark:border-white/10 dark:bg-dark-800/50", // Dark mode
        error && "border-red-500/50",
        className
      )}>
        <TextInput
          className="h-full w-full font-sans text-slate-900 dark:text-white"
          placeholderTextColor={placeholderColor}
          {...props}
        />
      </View>
      {error && <Text className="mt-1 text-xs text-red-400">{error}</Text>}
    </View>
  );
};