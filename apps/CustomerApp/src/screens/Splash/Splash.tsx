import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../constants/colors';
import useAuthStore from '../../store/useAuthStore';

export const Splash: React.FC = () => {
  const navigation = useNavigation<any>();
  const { isAuthenticated, isOnboarded } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('Home');
      } else if (isOnboarded) {
        navigation.replace('Login');
      } else {
        navigation.replace('Onboarding');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, isOnboarded, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🥑</Text>
      <Text style={styles.logoText}>FoodExpress</Text>
      <ActivityIndicator size="small" color={COLORS.primary} style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary, // Black premium look
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 72,
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 1,
  },
  loader: {
    marginTop: 40,
  },
});

export default Splash;
