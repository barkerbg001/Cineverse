import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  getNextMCUMovie,
  getPlaceholderMovie,
  MCUResponse,
} from './services/mcuApi.ts';
import MovieCard from './components/MovieCard.tsx';
import NavBar from './components/NavBar.tsx';
import { createAppStyles } from './styles.ts';
import { ThemeProvider, useTheme } from './contexts/ThemeContext.tsx';
import SettingsScreen from './screens/SettingsScreen.tsx';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen.tsx';
import { useResponsiveLayout } from './hooks/useResponsiveLayout.ts';

const DEV_TAP_COUNT = 5;
const DEV_TAP_RESET_MS = 1500;

type TabKey = 'next' | 'following';
type ScreenKey = 'main' | 'settings' | 'privacy';

const AppContent = () => {
  const { colors } = useTheme();
  const styles = useMemo(() => createAppStyles(colors), [colors]);
  const { mainContentWrapper, isLandscape } = useResponsiveLayout();

  const [data, setData] = useState<MCUResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('next');
  const [screen, setScreen] = useState<ScreenKey>('main');
  const [devMode, setDevMode] = useState(false);
  const devTapCount = useRef(0);
  const devTapTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = devMode
        ? await getPlaceholderMovie()
        : await getNextMCUMovie();
      setData(response);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [devMode]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  const handleTitlePress = () => {
    devTapCount.current += 1;
    if (devTapTimeout.current) clearTimeout(devTapTimeout.current);
    if (devTapCount.current >= DEV_TAP_COUNT) {
      setDevMode(prev => !prev);
      devTapCount.current = 0;
    } else {
      devTapTimeout.current = setTimeout(() => {
        devTapCount.current = 0;
        devTapTimeout.current = null;
      }, DEV_TAP_RESET_MS);
    }
  };

  if (screen === 'privacy') {
    return (
      <SafeAreaView style={styles.safe}>
        <PrivacyPolicyScreen onBack={() => setScreen('settings')} />
      </SafeAreaView>
    );
  }

  if (screen === 'settings') {
    return (
      <SafeAreaView style={styles.safe}>
        <SettingsScreen
          onBack={() => setScreen('main')}
          onOpenPrivacy={() => setScreen('privacy')}
        />
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.accent} />
          <Text style={styles.loadingText}>Loading…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!data) {
    return (
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.center}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.accent}
            />
          }
        >
          <View style={styles.errorContainer}>
            <Text style={styles.error}>
              Unable to load movie data. Pull down to try again.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screenContent}>
        <View style={mainContentWrapper}>
          <NavBar
            centerElement={
              <TouchableOpacity
                onPress={handleTitlePress}
                activeOpacity={1}
                style={styles.titleTouchable}
              >
                <Text style={styles.appTitle}>
                  🎬 <Text style={styles.appTitleAccent}>Cineverse</Text>
                </Text>
              </TouchableOpacity>
            }
            right={
              <TouchableOpacity
                style={styles.headerButton}
                onPress={() => setScreen('settings')}
                activeOpacity={0.7}
              >
                <Text style={[styles.headerButtonText, styles.headerIconText]}>
                  ⚙
                </Text>
              </TouchableOpacity>
            }
          />
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'next' && styles.tabActive]}
              onPress={() => setActiveTab('next')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'next' && styles.tabTextActive,
                ]}
              >
                Next
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'following' && styles.tabActive,
              ]}
              onPress={() => setActiveTab('following')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'following' && styles.tabTextActive,
                ]}
              >
                Following
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={colors.accent}
              />
            }
          >
            {activeTab === 'next' && (
              <MovieCard
                label={devMode ? 'Next up' : 'Next MCU Movie'}
                movie={data}
                horizontal={isLandscape}
              />
            )}
            {activeTab === 'following' &&
              (data.following_production ? (
                <MovieCard
                  label={devMode ? 'After that' : 'Following MCU Movie'}
                  movie={data.following_production}
                  horizontal={isLandscape}
                />
              ) : (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateIcon}>🎞️</Text>
                  <Text style={styles.emptyStateText}>
                    No following movie announced yet. Check back later for
                    updates.
                  </Text>
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const App = () => (
  <SafeAreaProvider>
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  </SafeAreaProvider>
);

export default App;
