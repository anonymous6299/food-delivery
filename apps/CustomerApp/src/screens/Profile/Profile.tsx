import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../constants/colors';
import SafeView from '../../components/common/SafeView';
import Header from '../../components/common/Header';
import useAuthStore from '../../store/useAuthStore';

interface ProfileMenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
}

const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <Text style={styles.menuIcon}>{icon}</Text>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>
    <Text style={styles.chevron}>➔</Text>
  </TouchableOpacity>
);

export const Profile: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const displayName = user ? `${user.firstName} ${user.lastName}` : 'Guest User';
  const displayPhone = user ? user.phone : 'No phone linked';
  const avatarUrl = user?.avatarUrl || 'https://via.placeholder.com/150';

  return (
    <SafeView style={styles.container} edges={['top']}>
      <Header title="Account" showBackButton={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Card Header */}
        <View style={styles.profileHeader}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.phone}>{displayPhone}</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <ProfileMenuItem
            icon="📍"
            title="Saved Addresses"
            subtitle="Manage your home, office, and other locations"
            onPress={() => navigation.navigate('Addresses')}
          />
          <ProfileMenuItem
            icon="❤️"
            title="Your Favorites"
            subtitle="View your bookmarked dishes and restaurants"
            onPress={() => navigation.navigate('Favorites')}
          />
          <ProfileMenuItem
            icon="🔔"
            title="Notifications"
            subtitle="Manage alerts, promo codes, and order updates"
            onPress={() => navigation.navigate('Notifications')}
          />
          <ProfileMenuItem
            icon="💳"
            title="Payment Methods"
            subtitle="Manage saved cards and wallet options"
            onPress={() => console.log('Payment settings')}
          />
        </View>

        {/* Log Out Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Version 0.0.1 (Beta)</Text>
      </ScrollView>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.surface,
  },
  profileInfo: {
    marginLeft: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  phone: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  menuSection: {
    paddingVertical: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuIcon: {
    fontSize: 22,
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  menuSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  chevron: {
    fontSize: 14,
    color: COLORS.border,
  },
  logoutBtn: {
    marginHorizontal: 24,
    marginTop: 24,
    height: 52,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.error,
  },
  versionText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 24,
    marginBottom: 40,
  },
});

export default Profile;
