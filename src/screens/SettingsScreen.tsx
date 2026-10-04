import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { createAppStyles } from '../styles';
import { themeLabels, themeIds, getThemeColors } from '../theme';
import NavBar from '../components/NavBar';

interface SettingsScreenProps {
  onBack: () => void;
  onOpenPrivacy: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBack,
  onOpenPrivacy,
}) => {
  const { theme, setTheme, colors } = useTheme();
  const styles = React.useMemo(() => createAppStyles(colors), [colors]);

  return (
    <View style={styles.safe}>
      <View style={styles.screenContent}>
        <NavBar title="Settings" onBack={onBack} />
        <ScrollView
          style={styles.settingsScroll}
          contentContainerStyle={styles.settingsContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.settingsIntro}>
            Customize how Cineverse looks and find legal info.
          </Text>

          <Text style={styles.settingsSectionTitle}>Theme</Text>
          <View style={styles.themeChipsRow}>
            {themeIds.map(id => (
              <TouchableOpacity
                key={id}
                style={[
                  styles.themeChip,
                  theme === id && styles.themeChipSelected,
                ]}
                onPress={() => setTheme(id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.themeChipDot,
                    { backgroundColor: getThemeColors(id).accent },
                  ]}
                />
                <Text style={styles.themeChipLabel}>{themeLabels[id]}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text
            style={[
              styles.settingsSectionTitle,
              styles.settingsSectionTitleSpaced,
            ]}
          >
            Legal
          </Text>
          <TouchableOpacity
            style={styles.settingsLinkCard}
            onPress={onOpenPrivacy}
            activeOpacity={0.7}
          >
            <View style={styles.settingsLinkRow}>
              <Text style={styles.settingsLinkTitle}>Privacy Policy</Text>
              <Text style={styles.settingsLinkChevron}>›</Text>
            </View>
            <Text style={styles.settingsLinkDescription}>
              How we handle your data and what we collect.
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default SettingsScreen;
