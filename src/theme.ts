export type ThemeId = 'red' | 'yellow' | 'blue' | 'green' | 'orange';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  accent: string;
  onAccent: string;
  tabBg: string;
  tabBorder: string;
  error: string;
  errorBorder: string;
  emptyBorder: string;
  posterBg: string;
  badgeBg: string;
  badgeBorder: string;
}

const themes: Record<ThemeId, ThemeColors> = {
  red: {
    background: '#0D0D0D',
    surface: '#1A1518',
    surfaceAlt: '#251E22',
    text: '#FFF',
    textMuted: '#999',
    accent: '#E11D48',
    onAccent: '#FFF',
    tabBg: '#1A1518',
    tabBorder: '#2D2529',
    error: '#FB7185',
    errorBorder: 'rgba(251,113,133,0.3)',
    emptyBorder: '#2D2529',
    posterBg: '#251E22',
    badgeBg: 'rgba(0,0,0,0.85)',
    badgeBorder: 'rgba(225,29,72,0.5)',
  },
  yellow: {
    background: '#0D0D0D',
    surface: '#1A1A1A',
    surfaceAlt: '#252525',
    text: '#FFF',
    textMuted: '#888',
    accent: '#FFD700',
    onAccent: '#0D0D0D',
    tabBg: '#1A1A1A',
    tabBorder: '#2A2A2A',
    error: '#FF6B6B',
    errorBorder: 'rgba(255,107,107,0.3)',
    emptyBorder: '#2A2A2A',
    posterBg: '#252525',
    badgeBg: 'rgba(0,0,0,0.85)',
    badgeBorder: 'rgba(255,215,0,0.5)',
  },
  blue: {
    background: '#0D0D0D',
    surface: '#131A24',
    surfaceAlt: '#1E293B',
    text: '#FFF',
    textMuted: '#94A3B8',
    accent: '#60A5FA',
    onAccent: '#0D0D0D',
    tabBg: '#131A24',
    tabBorder: '#1E293B',
    error: '#F87171',
    errorBorder: 'rgba(248,113,113,0.3)',
    emptyBorder: '#1E293B',
    posterBg: '#1E293B',
    badgeBg: 'rgba(0,0,0,0.85)',
    badgeBorder: 'rgba(96,165,250,0.5)',
  },
  green: {
    background: '#0D0D0D',
    surface: '#0F1A12',
    surfaceAlt: '#152219',
    text: '#FFF',
    textMuted: '#9CA3AF',
    accent: '#4ADE80',
    onAccent: '#0D0D0D',
    tabBg: '#0F1A12',
    tabBorder: '#152219',
    error: '#F87171',
    errorBorder: 'rgba(248,113,113,0.3)',
    emptyBorder: '#152219',
    posterBg: '#152219',
    badgeBg: 'rgba(0,0,0,0.85)',
    badgeBorder: 'rgba(74,222,128,0.5)',
  },
  orange: {
    background: '#0D0D0D',
    surface: '#1A1510',
    surfaceAlt: '#252018',
    text: '#FFF',
    textMuted: '#A8A29E',
    accent: '#FB923C',
    onAccent: '#0D0D0D',
    tabBg: '#1A1510',
    tabBorder: '#252018',
    error: '#F87171',
    errorBorder: 'rgba(248,113,113,0.3)',
    emptyBorder: '#252018',
    posterBg: '#252018',
    badgeBg: 'rgba(0,0,0,0.85)',
    badgeBorder: 'rgba(251,146,60,0.5)',
  },
};

export const themeIds: ThemeId[] = ['red', 'yellow', 'blue', 'green', 'orange'];

export const getThemeColors = (theme: ThemeId): ThemeColors => themes[theme];

export const themeLabels: Record<ThemeId, string> = {
  red: 'Red',
  yellow: 'Yellow',
  blue: 'Blue',
  green: 'Green',
  orange: 'Orange',
};
