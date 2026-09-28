import { ENGINE_VERSION } from '@yingo/engine';
import { t } from '@yingo/i18n';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getServerEngineVersion, OfflineError } from '../data';
import { Sentry } from '../monitoring/sentry';
import { useSession } from '../stores/session';
import { borderWidth, colors, radii, spacing, typography, type ColorToken } from '../theme';

// Development status screen (project-setup). Replaced by onboarding in a later change.

const swatches: ColorToken[] = ['brand', 'victory', 'progress', 'celebration', 'text', 'alert'];

function useServerEngineVersion(enabled: boolean): string | null {
  const [version, setVersion] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    getServerEngineVersion()
      .then(setVersion)
      .catch((error: unknown) =>
        setVersion(
          error instanceof OfflineError ? t('common.offline.short') : t('status.unavailable'),
        ),
      );
  }, [enabled]);
  return version;
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.line}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function StatusScreen() {
  const { status, userId, profileEnsured } = useSession();
  const serverVersion = useServerEngineVersion(status === 'ready');
  const [sentrySent, setSentrySent] = useState(false);

  if (status === 'offline') {
    return (
      <SafeAreaView style={styles.screen}>
        <Text style={styles.title}>{t('common.offline.title')}</Text>
        <Text style={styles.body}>{t('common.offline.message')}</Text>
      </SafeAreaView>
    );
  }

  const sendTestError = () => {
    Sentry.captureException(new Error('Sentry test from the status screen'));
    setSentrySent(true);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.logo}>{t('common.appName')}</Text>
        <Text style={styles.heading}>{t('status.title')}</Text>

        <Text style={styles.label}>{t('status.palette')}</Text>
        <View style={styles.swatches}>
          {swatches.map((token) => (
            <View key={token} style={[styles.swatch, { backgroundColor: colors[token] }]} />
          ))}
        </View>

        {status === 'starting' ? (
          <Text style={styles.body}>{t('status.starting')}</Text>
        ) : (
          <>
            <Line
              label={t('status.session')}
              value={userId ? t('status.sessionAnonymous', { uid: userId.slice(0, 8) }) : '-'}
            />
            <Line
              label={t('status.profile')}
              value={profileEnsured ? t('status.profileReady') : t('status.profilePending')}
            />
            <Line
              label={t('status.engine')}
              value={t('status.engineVersions', {
                app: ENGINE_VERSION,
                server: serverVersion ?? '…',
              })}
            />
          </>
        )}

        <Pressable accessibilityRole="button" onPress={sendTestError} style={styles.button}>
          <Text style={styles.buttonText}>
            {sentrySent ? t('status.sentrySent') : t('status.sentryTest')}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  content: { gap: spacing.md },
  logo: { ...typography.title, color: colors.brand, fontSize: 40, lineHeight: 48 },
  title: { ...typography.title, color: colors.text },
  heading: { ...typography.heading, color: colors.text },
  body: { ...typography.body, color: colors.text },
  label: { ...typography.caption, color: colors.textMuted },
  value: { ...typography.bodyBold, color: colors.text },
  line: { gap: spacing.xs },
  swatches: { flexDirection: 'row', gap: spacing.sm },
  swatch: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    borderWidth: borderWidth.regular,
    borderColor: colors.text,
  },
  button: {
    marginTop: spacing.lg,
    backgroundColor: colors.action,
    borderRadius: radii.pill,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  buttonText: { ...typography.bodyBold, color: colors.onAction },
});
