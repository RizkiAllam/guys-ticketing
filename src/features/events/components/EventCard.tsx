import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Event } from '../../../types/event';
import { GlassCard } from '../../../components/glass/GlassCard';

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

export function EventCard({ event, onPress }: EventCardProps) {
  const formatRupiah = (number: number) => {
    return 'Rp ' + number.toLocaleString('id-ID');
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} className="mb-4">
      {/* Kita panggil GlassCard Anda di sini */}
      <GlassCard intensity={20}>
        
        {/* Gambar kita beri margin negatif agar full memenuhi area atas card */}
        <Image 
          source={{ uri: event.image_url || 'https://via.placeholder.com/400x200' }} 
          className="w-auto h-48 -mx-5 -mt-5 mb-4 rounded-t-[32px]"
          resizeMode="cover"
        />
        
        <View>
          <Text className="text-neon-pink font-bold text-xs tracking-wider uppercase mb-1">
            {event.category}
          </Text>
          
          <Text className="text-xl font-bold text-dark-900 dark:text-white mb-2" numberOfLines={1}>
            {event.title}
          </Text>

          <View className="flex-row items-center mb-1">
            <Ionicons name="calendar-outline" size={14} color="#64748b" />
            <Text className="text-slate-500 text-xs ml-2">{event.date}</Text>
          </View>
          
          <View className="flex-row items-center mb-4">
            <Ionicons name="location-outline" size={14} color="#64748b" />
            <Text className="text-slate-500 text-xs ml-2" numberOfLines={1}>
              {event.location}
            </Text>
          </View>

          <View className="flex-row justify-between items-center pt-3 border-t border-slate-200/50 dark:border-white/10">
            <Text className="text-base font-bold text-dark-900 dark:text-white">
              {event.price === 0 ? 'FREE' : formatRupiah(event.price)}
            </Text>
            <Text className="text-xs text-slate-500">
              {event.available_tickets} slots left
            </Text>
          </View>
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}