import { StyleSheet } from 'react-native';
import COLORS from '../constants/colors';

export const THEME = {
  colors: COLORS,
  fonts: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  titleLarge: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  titleMedium: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  bodyText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default THEME;
