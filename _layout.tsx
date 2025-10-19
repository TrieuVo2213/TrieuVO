import { Stack } from 'expo-router';
import { TamaguiProvider } from '@tamagui/core';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';

import { config } from '../../tamagui.config';
import { useAuth } from '@/stores/auth';

export default function RootLayout() {
  const { token, login } = useAuth();
  useEffect(() => { /* nếu có bootstrap thì gọi ở đây */ }, []);

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <Stack screenOptions={{ headerShown: false }}>
          {token ? (
            <Stack.Screen name="(tabs)" />
          ) : (
            <Stack.Screen name="(auth)" />
          )}
        </Stack>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
