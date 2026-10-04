import { StyleSheet, Platform } from 'react-native';
import type { ThemeColors } from './theme';

const tabShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  default: {
    elevation: 4,
  },
});

// SafeAreaView handles system insets on native; keep a small web offset for browser chrome.
const topInset = Platform.select({
  web: 56,
  ios: 0,
  default: 0,
});

export const createAppStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: colors.background,
    },
    screenContent: {
      flex: 1,
      paddingTop: topInset,
    },
    container: {
      padding: 20,
      paddingBottom: 40,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    titleTouchable: {
      marginTop: 12,
      marginBottom: 8,
      alignItems: 'center',
    },
    appTitle: {
      fontSize: 26,
      fontWeight: '800',
      color: colors.text,
      textAlign: 'center',
      letterSpacing: 0.5,
    },
    appTitleAccent: {
      color: colors.accent,
    },
    tabBar: {
      flexDirection: 'row',
      marginHorizontal: 20,
      marginBottom: 16,
      backgroundColor: colors.tabBg,
      borderRadius: 14,
      padding: 5,
      borderWidth: 1,
      borderColor: colors.tabBorder,
      ...tabShadow,
    },
    tab: {
      flex: 1,
      paddingVertical: 14,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    tabActive: {
      backgroundColor: colors.accent,
    },
    tabText: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.textMuted,
      letterSpacing: 0.3,
    },
    tabTextActive: {
      color: colors.onAccent,
    },
    emptyState: {
      paddingVertical: 56,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.surface,
      borderRadius: 16,
      marginTop: 8,
      borderWidth: 1,
      borderColor: colors.emptyBorder,
      borderStyle: 'dashed',
    },
    emptyStateIcon: {
      fontSize: 40,
      marginBottom: 16,
      opacity: 0.6,
    },
    emptyStateText: {
      fontSize: 16,
      color: colors.textMuted,
      textAlign: 'center',
      paddingHorizontal: 24,
      lineHeight: 24,
    },
    error: {
      color: colors.error,
      fontSize: 16,
      textAlign: 'center',
      paddingHorizontal: 24,
      lineHeight: 24,
    },
    errorContainer: {
      padding: 24,
      backgroundColor: colors.surface,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.errorBorder,
      marginHorizontal: 20,
    },
    loadingText: {
      marginTop: 16,
      fontSize: 14,
      color: colors.textMuted,
      letterSpacing: 0.5,
    },
    headerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical: 12,
      marginBottom: 8,
    },
    headerTitleWrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      letterSpacing: 0.3,
    },
    headerButton: {
      padding: 8,
      minWidth: 44,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerButtonText: {
      fontSize: 16,
      color: colors.accent,
      fontWeight: '600',
    },
    headerIconText: {
      fontSize: 22,
    },
    settingsScroll: {
      flex: 1,
    },
    settingsContent: {
      paddingHorizontal: 20,
      paddingBottom: 48,
    },
    settingsSectionTitleSpaced: {
      marginTop: 12,
    },
    settingsIntro: {
      fontSize: 14,
      color: colors.textMuted,
      marginBottom: 28,
      paddingHorizontal: 4,
      lineHeight: 20,
    },
    settingsSection: {
      marginBottom: 28,
    },
    settingsSectionTitle: {
      fontSize: 11,
      fontWeight: '800',
      color: colors.textMuted,
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      marginBottom: 14,
      paddingHorizontal: 4,
    },
    themeChipsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -6,
    },
    themeChip: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 14,
      margin: 6,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.tabBorder,
      backgroundColor: colors.surface,
    },
    themeChipSelected: {
      borderColor: colors.accent,
      backgroundColor: colors.surfaceAlt,
    },
    themeChipDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 10,
    },
    themeChipLabel: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
    },
    settingsLinkCard: {
      backgroundColor: colors.surface,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: colors.tabBorder,
      overflow: 'hidden',
      padding: 18,
    },
    settingsLinkRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    settingsLinkTitle: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text,
    },
    settingsLinkDescription: {
      fontSize: 13,
      color: colors.textMuted,
      marginTop: 4,
      lineHeight: 18,
    },
    settingsLinkChevron: {
      fontSize: 20,
      color: colors.textMuted,
      fontWeight: '300',
    },
    policyScroll: {
      flex: 1,
    },
    policyContent: {
      padding: 20,
      paddingBottom: 40,
    },
    policyTitle: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    policyUpdated: {
      fontSize: 13,
      color: colors.textMuted,
      marginBottom: 24,
    },
    policySection: {
      marginBottom: 20,
    },
    policySectionTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },
    policyBody: {
      fontSize: 15,
      color: colors.textMuted,
      lineHeight: 24,
    },
  });
