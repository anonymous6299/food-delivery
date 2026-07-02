import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../../constants/colors';
import { Order } from '../../types';
import { formatDate, formatCurrency } from '../../utils/formatters';

interface OrderCardProps {
  order: Order;
  onPress: () => void;
  onTrackPress?: () => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onPress, onTrackPress }) => {
  const getStatusColor = () => {
    switch (order.status) {
      case 'DELIVERED':
        return COLORS.textSecondary;
      case 'CANCELLED':
        return COLORS.error;
      default:
        return COLORS.primary; // Active status like PREPARING, ACCEPTED
    }
  };

  const isOrderActive = order.status !== 'DELIVERED' && order.status !== 'CANCELLED';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.95}>
      <View style={styles.header}>
        <Image source={{ uri: order.restaurant.logoUrl }} style={styles.logo} />
        <View style={styles.headerInfo}>
          <Text style={styles.restaurantName}>{order.restaurant.name}</Text>
          <Text style={styles.date}>{formatDate(order.createdAt)}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>{order.status}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.itemsPreview} numberOfLines={2}>
          {order.items.map(item => `${item.quantity}x ${item.name}${item.variantName ? ` (${item.variantName})` : ''}`).join(', ')}
        </Text>
        <Text style={styles.total}>{formatCurrency(order.totalAmount)}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.reorderButton} onPress={onPress}>
          <Text style={styles.reorderText}>View Details</Text>
        </TouchableOpacity>
        {isOrderActive && onTrackPress && (
          <TouchableOpacity style={styles.trackButton} onPress={onTrackPress}>
            <Text style={styles.trackText}>Track Order</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  date: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    backgroundColor: COLORS.surface,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 12,
  },
  itemsPreview: {
    fontSize: 13,
    color: COLORS.textSecondary,
    flex: 1,
    paddingRight: 16,
    lineHeight: 18,
  },
  total: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  reorderButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  reorderText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  trackButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: COLORS.secondary,
    marginLeft: 8,
  },
  trackText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.white,
  },
});

export default OrderCard;
