import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../constants/colors';
import SafeView from '../../components/common/SafeView';
import RestaurantCard from '../../components/cards/RestaurantCard';
import { MOCK_RESTAURANTS, MOCK_CATEGORIES, MOCK_ADDRESSES } from '../../constants/mockData';

export const Home: React.FC = () => {
  const navigation = useNavigation<any>();
  const activeAddress = MOCK_ADDRESSES.find(a => a.isDefault) || MOCK_ADDRESSES[0];

  return (
    <SafeView style={styles.container} edges={['top']}>
      {/* Location Header */}
      <View style={styles.header}>
        <View style={styles.locationSelector}>
          <Text style={styles.deliverTo}>Deliver now to</Text>
          <TouchableOpacity style={styles.addressRow} onPress={() => navigation.navigate('Addresses')}>
            <Text style={styles.addressText}>{activeAddress.title} • {activeAddress.addressLine1}</Text>
            <Text style={styles.chevron}> ▾</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.notificationBtn} 
          onPress={() => navigation.navigate('Notifications')}
        >
          <Text style={styles.notificationIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Shortcut */}
        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Restaurant', { restaurantId: 'res_1' })}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>What are you craving?</Text>
        </TouchableOpacity>

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoTitle}>Free Delivery</Text>
            <Text style={styles.promoSubtitle}>On orders over $20. Limited time!</Text>
          </View>
          <Text style={styles.promoEmoji}>🎁</Text>
        </View>

        {/* Quick Shortcuts */}
        <Text style={styles.sectionTitle}>Quick Shortcuts</Text>
        <View style={styles.shortcutsGrid}>
          <TouchableOpacity style={styles.shortcutItem} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.shortcutIcon}>👤</Text>
            <Text style={styles.shortcutText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcutItem} onPress={() => navigation.navigate('Orders')}>
            <Text style={styles.shortcutIcon}>📄</Text>
            <Text style={styles.shortcutText}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcutItem} onPress={() => navigation.navigate('Favorites')}>
            <Text style={styles.shortcutIcon}>❤️</Text>
            <Text style={styles.shortcutText}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcutItem} onPress={() => navigation.navigate('Cart')}>
            <Text style={styles.shortcutIcon}>🛒</Text>
            <Text style={styles.shortcutText}>Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcutItem} onPress={() => navigation.navigate('Checkout')}>
            <Text style={styles.shortcutIcon}>💳</Text>
            <Text style={styles.shortcutText}>Checkout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcutItem} onPress={() => navigation.navigate('OrderTracking', { orderId: 'ord_1' })}>
            <Text style={styles.shortcutIcon}>🏍️</Text>
            <Text style={styles.shortcutText}>Tracking</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shortcutItem} onPress={() => navigation.navigate('FoodDetails', { foodItemId: 'food_1', restaurantId: 'res_1' })}>
            <Text style={styles.shortcutIcon}>🍕</Text>
            <Text style={styles.shortcutText}>Detail</Text>
          </TouchableOpacity>
        </View>

        {/* Categories Horizontal Scroll */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {MOCK_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryCard}
              onPress={() => navigation.navigate('Restaurant', { restaurantId: 'res_1' })}
            >
              <Text style={styles.categoryEmoji}>{cat.icon}</Text>
              <Text style={styles.categoryName}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Restaurants List */}
        <Text style={styles.sectionTitle}>Featured Restaurants</Text>
        <FlatList
          data={MOCK_RESTAURANTS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RestaurantCard
              restaurant={item}
              onPress={() => navigation.navigate('Restaurant', { restaurantId: item.id })}
            />
          )}
          scrollEnabled={false} // Managed by outer ScrollView
        />
      </ScrollView>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  locationSelector: {
    flex: 1,
  },
  deliverTo: {
    fontSize: 11,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  addressText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  chevron: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  notificationBtn: {
    padding: 8,
  },
  notificationIcon: {
    fontSize: 22,
  },
  scrollContent: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    height: 52,
    borderRadius: 26,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginRight: 10,
  },
  searchPlaceholder: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  promoBanner: {
    backgroundColor: COLORS.lightGreen,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  promoTextContainer: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  promoSubtitle: {
    fontSize: 13,
    color: COLORS.textPrimary,
    marginTop: 4,
    fontWeight: '500',
  },
  promoEmoji: {
    fontSize: 40,
    marginLeft: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  shortcutsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  shortcutItem: {
    width: '23%',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  shortcutIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  shortcutText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  categoriesContainer: {
    paddingBottom: 24,
  },
  categoryCard: {
    width: 72,
    height: 84,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryEmoji: {
    fontSize: 28,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 6,
  },
});

export default Home;
