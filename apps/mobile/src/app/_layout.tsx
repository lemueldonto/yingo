import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { Sentry } from '../monitoring/sentry';
import { retryWhenOnline, useSession } from '../stores/session';
import { colors, fontAssets } from '../theme';

void SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const [fontsLoaded, fontError] = useFonts(fontAssets);
  const start = useSession((state) => state.start);

  useEffect(() => {
    void start();
    return retryWhenOnline();
  }, [start]);

  const ready = fontsLoaded || fontError !== null;

  useEffect(() => {
    if (ready) void SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
      />
    </>
  );
}

export default Sentry.wrap(RootLayout);
