import { useWindowDimensions } from 'react-native';

/** Max width for two-column layout in landscape (content centered with padding) */
const MAX_LANDSCAPE_CONTENT_WIDTH = 1200;

export function useResponsiveLayout() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return {
    width,
    height,
    isLandscape,
    isPortrait: !isLandscape,
    /** Style for a wrapper that constrains and centers content in landscape; full width in portrait. */
    mainContentWrapper: {
      flex: 1 as const,
      width: '100%' as const,
      maxWidth: isLandscape ? MAX_LANDSCAPE_CONTENT_WIDTH : undefined,
      alignSelf: 'center' as const,
      paddingHorizontal: isLandscape ? 24 : 0,
    },
  };
}
