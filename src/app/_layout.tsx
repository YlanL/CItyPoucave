import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { Stack } from 'expo-router';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="health" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}