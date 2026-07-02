import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../../constants/colors';
import { FoodItem } from '../../types';

interface FoodItemCardProps {
  item: FoodItem;
  onPress: () => void;
}

export const FoodItemCard: React.FC<FoodItemCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.textContainer}>
        <View style={styles.vegIndicatorRow}>
          {item.isVeg && <View style={[styles.dotBorder, { borderColor: 'green' }]}>
            <View style={[styles.dot, { backgroundColor: 'green' }]} />
          </View>}
          {item.isNonVeg && <View style={[styles.dotBorder, { borderColor: 'red' }]}>
            <View style={[styles.dot, { backgroundColor: 'red' }]} />
          </View>}
          {item.isFeatured && <Text style={styles.featuredLabel}>Featured</Text>}
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      {item.imageUrl && (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  vegIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dotBorder: {
    width: 14,
    height: 14,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  featuredLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
  },
});

export default FoodItemCard;
