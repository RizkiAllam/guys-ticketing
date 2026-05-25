import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { cn } from '../../utils/cn';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  isLoading?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
}

export const Button: React.FC<ButtonProps> = ({
  label,
  isLoading,
  variant = 'primary',
  className,
  ...props
}) => {
  const baseStyle = "h-14 items-center justify-center rounded-2xl flex-row px-6";
  const variants = {
    primary: "bg-neon-pink shadow-lg shadow-neon-pink/30",
    outline: "border border-slate-300 dark:border-white/20 bg-transparent",
    ghost: "bg-transparent",
  };

  const textVariants = {
    primary: "text-white font-bold text-lg",
    outline: "text-slate-900 dark:text-white font-bold text-lg",
    ghost: "text-slate-600 dark:text-white/70 font-bold text-lg",
  };

  return (
    <TouchableOpacity
      className={cn(baseStyle, variants[variant], className, isLoading && "opacity-70")}
      disabled={isLoading || props.disabled}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? '#fff' : '#FF2A6D'} />
      ) : (
        <Text className={cn(textVariants[variant])}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};