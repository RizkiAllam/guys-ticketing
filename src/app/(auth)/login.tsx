import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { GlassCard } from '../../components/glass/GlassCard';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { supabase } from '../../lib/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please fill in both email and password.');
      return;
    }

    setIsLoading(true);
    
    // Authenticate with Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Authentication Failed', error.message);
      setIsLoading(false);
    }
    // Note: If successful, the onAuthStateChange listener in _layout.tsx 
    // will detect the session change and automatically route to /(tabs)
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 justify-center px-6 bg-slate-50 dark:bg-dark-900"
    >
      <Animated.View entering={FadeInDown.springify().damping(14)}>
        {/* Header / Brand Logo */}
        <View className="mb-10 items-center">
          <Text className="text-4xl font-bold text-slate-900 dark:text-white tracking-wider">GUYS</Text>
          <Text className="text-neon-blue mt-2 text-xs font-bold tracking-[0.3em]">
            TICKETING PLATFORM
          </Text>
        </View>

        {/* Login Form embedded in Glassmorphism Card */}
        <GlassCard intensity={25}>
          <Text className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</Text>

          <Input
            label="Email Address"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Button
            label="Sign In"
            className="mt-6"
            onPress={handleLogin}
            isLoading={isLoading}
          />

          <Button
            label="Create an Account"
            variant="ghost"
            className="mt-2"
            onPress={() => router.push('/(auth)/register')}
          />
        </GlassCard>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}