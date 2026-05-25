import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0A0A0F',
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
          height: 70,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: '#FF2A6D', // Neon Pink
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
    </Tabs>
  );
}