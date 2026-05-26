import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Event } from '../../types/event';
import { eventService } from '../../services/eventService';
import { EventCard } from '../../features/events/components/EventCard';

export default function DiscoverScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (error: any) {
      Alert.alert('Database Error', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-dark-900 pt-12 px-4">
      <View className="mb-6 mt-4">
        <Text className="text-3xl font-bold text-dark-900 dark:text-white tracking-wide">
          Discover
        </Text>
        <Text className="text-slate-500 mt-1">
          Find the best events around you
        </Text>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FF2A6D" />
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <EventCard 
              event={item} 
              onPress={() => console.log(`Maps to event details: ${item.id}`)} 
            />
          )}
          ListEmptyComponent={
            <Text className="text-center text-slate-500 mt-10">
              No events available at the moment.
            </Text>
          }
        />
      )}
    </View>
  );
}