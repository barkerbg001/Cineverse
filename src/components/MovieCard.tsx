import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { MCUMovie } from '../services/mcuApi';
import { useTheme } from '../contexts/ThemeContext';
import type { ThemeColors } from '../theme';

interface MovieCardProps {
  label: string;
  movie: MCUMovie;
  /** When true, layout is poster left + text right (for landscape) */
  horizontal?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
  label,
  movie,
  horizontal = false,
}) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createMovieCardStyles(colors), [colors]);

  const posterBlock = (
    <View
      style={[styles.posterWrap, horizontal && styles.posterWrapHorizontal]}
    >
      <Image
        source={{ uri: movie.poster_url }}
        style={[styles.poster, horizontal && styles.posterHorizontal]}
      />
      <View style={styles.daysBadge}>
        <Text style={styles.daysBadgeText}>
          {movie.days_until === 0 ? 'Out now' : `${movie.days_until} days`}
        </Text>
      </View>
    </View>
  );

  const titleAndMeta = (
    <>
      <Text style={styles.movieTitle}>{movie.title}</Text>
      <Text style={styles.meta}>📅 {movie.release_date}</Text>
      <Text
        style={[styles.overview, horizontal && styles.overviewHorizontal]}
        numberOfLines={horizontal ? 8 : 6}
      >
        {movie.overview}
      </Text>
    </>
  );

  return (
    <View style={styles.card}>
      <View
        style={[styles.cardInner, horizontal && styles.cardInnerHorizontal]}
      >
        {horizontal ? (
          <>
            {posterBlock}
            <View style={styles.textBlock}>
              <Text style={styles.label}>{label}</Text>
              {titleAndMeta}
            </View>
          </>
        ) : (
          <>
            <Text style={styles.label}>{label}</Text>
            {posterBlock}
            {titleAndMeta}
          </>
        )}
      </View>
    </View>
  );
};

export default MovieCard;

const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  default: {
    elevation: 8,
  },
});

function createMovieCardStyles(colors: ThemeColors) {
  return StyleSheet.create({
    card: {
      marginBottom: 24,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: colors.surface,
      ...cardShadow,
    },
    cardInner: {
      padding: 20,
      overflow: 'hidden',
    },
    cardInnerHorizontal: {
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    textBlock: {
      flex: 1,
      minWidth: 0,
      marginLeft: 20,
      justifyContent: 'center',
    },
    posterWrapHorizontal: {
      marginBottom: 0,
      width: 180,
      flexShrink: 0,
    },
    posterHorizontal: {
      width: 180,
      height: 270,
      aspectRatio: undefined,
    },
    overviewHorizontal: {
      marginTop: 8,
    },
    label: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.accent,
      letterSpacing: 1.2,
      textTransform: 'uppercase',
      marginBottom: 14,
    },
    posterWrap: {
      position: 'relative',
      borderRadius: 12,
      overflow: 'hidden',
      marginBottom: 18,
      backgroundColor: colors.posterBg,
    },
    poster: {
      width: '100%',
      aspectRatio: 2 / 3,
      borderRadius: 12,
    },
    daysBadge: {
      position: 'absolute',
      bottom: 12,
      right: 12,
      backgroundColor: colors.badgeBg,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.badgeBorder,
    },
    daysBadgeText: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.accent,
    },
    movieTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 10,
      letterSpacing: 0.3,
    },
    meta: {
      fontSize: 14,
      color: colors.textMuted,
      marginBottom: 14,
    },
    overview: {
      fontSize: 15,
      color: colors.textMuted,
      lineHeight: 22,
    },
  });
}
