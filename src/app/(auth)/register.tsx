import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { GlassCard } from '../../components/glass/GlassCard';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { supabase } from '../../lib/supabase';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !fullName) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    
    // Register with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        }
      }
    });

    if (error) {
      Alert.alert('Registration Failed', error.message);
      setIsLoading(false);
      return;
    }

    // Since we enforce email confirmation by default in Supabase (usually), 
    // handle the state appropriately. If auto-confirm is on in your Supabase settings,
    // the layout will auto-redirect to tabs.
    if (data.session) {
      // Automatically logged in
      setIsLoading(false);
    } else {
      Alert.alert(
        'Check Your Email', 
        'We have sent a confirmation link to your email address.',
        [{ text: 'OK', onPress: () => router.push('/(auth)/login') }]
      );
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-slate-50 dark:bg-dark-900"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
        <Animated.View entering={FadeInUp.springify().damping(14)}>
          {/* Header */}
          <View className="mb-10 items-center mt-10">
            <Text className="text-3xl font-bold text-slate-900 dark:text-white tracking-wider">JOIN GUYS</Text>
            <Text className="text-neon-pink mt-2 text-xs font-bold tracking-[0.2em]">
              CREATE YOUR ACCOUNT
            </Text>
          </View>

          {/* Register Form */}
          <GlassCard intensity={25}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              autoCapitalize="words"
              value={fullName}
              onChangeText={setFullName}
            />

            <Input
              label="Email Address"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
            />

            <Input
              label="Password"
              placeholder="Create a strong password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Button
              label="Create Account"
              className="mt-6"
              onPress={handleRegister}
              isLoading={isLoading}
            />

            <Button
              label="Already have an account? Sign In"
              variant="ghost"
              className="mt-2"
              onPress={() => router.back()}
            />
          </GlassCard>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}