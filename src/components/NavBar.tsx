import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { createAppStyles } from '../styles';

export interface NavBarProps {
  /** Title shown in the center when centerElement is not provided */
  title?: string;
  /** Custom center content (e.g. touchable title for dev mode) */
  centerElement?: React.ReactNode;
  /** When provided, shows a back button on the left that calls this */
  onBack?: () => void;
  /** Optional right-side content (e.g. settings icon) */
  right?: React.ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({
  title,
  centerElement,
  onBack,
  right,
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createAppStyles(colors), [colors]);

  return (
    <View style={styles.headerRow}>
      {onBack ? (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Text style={styles.headerButtonText}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.headerButton} />
      )}
      <View style={styles.headerTitleWrap}>
        {centerElement ??
          (title != null ? (
            <Text style={styles.headerTitle}>{title}</Text>
          ) : null)}
      </View>
      {right ?? <View style={styles.headerButton} />}
    </View>
  );
};

export default NavBar;
