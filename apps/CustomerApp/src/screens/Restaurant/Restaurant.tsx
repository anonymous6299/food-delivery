import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import COLORS from '../../constants/colors';
import SafeView from '../../components/common/SafeView';
import Header from '../../components/common/Header';
import FoodItemCard from '../../components/cards/FoodItemCard';
import { MOCK_RESTAURANTS } from '../../constants/mockData';
import useCartStore from '../../store/useCartStore';
import { formatCurrency } from '../../utils/formatters';

export const RestaurantDetail: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const restaurantId = route.params?.restaurantId;

  const restaurant = MOCK_RESTAURANTS.find((res) => res.id === restaurantId) || MOCK_RESTAURANTS[0];
  const { items, getTotals } = useCartStore();

  const cartItemCount = items.length;
  const { subtotal } = getTotals(restaurant.baseDeliveryFee);

  return (
    <SafeView style={styles.container} edges={['top', 'bottom']}>
      <Header title={restaurant.name} />

      <FlatList
        data={restaurant.foodItems}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            {/* Cover Image */}
            <Image source={{ uri: restaurant.coverImageUrl }} style={styles.coverImage} />

            {/* Restaurant Info Panel */}
            <View style={styles.infoPanel}>
              <Text style={styles.name}>{restaurant.name}</Text>
              <Text style={styles.description}>{restaurant.description}</Text>
              
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>★ {restaurant.rating}</Text>
                  <Text style={styles.statLabel}>{restaurant.reviewCount}+ Ratings</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{restaurant.prepTimeRange}</Text>
                  <Text style={styles.statLabel}>Delivery Speed</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>${restaurant.baseDeliveryFee.toFixed(2)}</Text>
                  <Text style={styles.statLabel}>Delivery Fee</Text>
                </View>
              </View>
            </View>

            {/* Menu Section Divider */}
            <Text style={styles.menuTitle}>Full Menu</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <FoodItemCard
            item={item}
            onPress={() => navigation.navigate('FoodDetails', { foodItemId: item.id, restaurantId: restaurant.id })}
          />
        )}
      />

      {/* Floating View Cart bar */}
      {cartItemCount > 0 && (
        <TouchableOpacity
          style={styles.floatingCart}
          activeOpacity={0.95}
          onPress={() => navigation.navigate('Cart')}
        >
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
          </View>
          <Text style={styles.viewCartText}>View Cart</Text>
          <Text style={styles.cartTotalText}>{formatCurrency(subtotal)}</Text>
        </TouchableOpacity>
      )}
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.surface,
  },
  infoPanel: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 6,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: COLORS.surface,
    paddingVertical: 12,
    borderRadius: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.border,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 8,
  },
  listContent: {
    paddingBottom: 80, // Leave room for floating cart
  },
  floatingCart: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    height: 56,
    backgroundColor: COLORS.primary, // Green color
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cartBadge: {
    backgroundColor: COLORS.secondary,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  viewCartText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  cartTotalText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default RestaurantDetail;
