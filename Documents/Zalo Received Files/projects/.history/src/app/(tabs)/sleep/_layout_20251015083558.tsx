import { Stack } from 'expo-router';

export default function SleepStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* index.tsx = màn Sleep */}
      <Stack.Screen name="index" />
      {/* ai-chat.tsx = màn chat AI */}
      <Stack.Screen name="ai-chat" />
    </Stack>
  );
}
