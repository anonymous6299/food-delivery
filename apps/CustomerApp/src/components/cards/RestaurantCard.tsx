import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../../constants/colors';
import { Restaurant } from '../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.95}>
      <Image source={{ uri: restaurant.coverImageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>{restaurant.name}</Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>★ {restaurant.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.description} numberOfLines={1}>
          {restaurant.categories.join(' • ')}
        </Text>
        <View style={styles.deliveryRow}>
          <Text style={styles.deliveryInfo}>
            {restaurant.prepTimeRange} • {restaurant.baseDeliveryFee === 0 ? 'Free delivery' : `$${restaurant.baseDeliveryFee.toFixed(2)} delivery`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: COLORS.surface,
  },
  infoContainer: {
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    flex: 1,
  },
  ratingBadge: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  deliveryRow: {
    marginTop: 6,
  },
  deliveryInfo: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
});

export default RestaurantCard;
