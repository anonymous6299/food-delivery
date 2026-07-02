import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../constants/colors';
import SafeView from '../../components/common/SafeView';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import useCartStore from '../../store/useCartStore';
import { MOCK_ADDRESSES } from '../../constants/mockData';
import { formatCurrency } from '../../utils/formatters';

export const Checkout: React.FC = () => {
  const navigation = useNavigation<any>();
  const { items, getTotals, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<'CARD' | 'CASH' | 'WALLET'>('CARD');

  const activeAddress = MOCK_ADDRESSES.find(a => a.isDefault) || MOCK_ADDRESSES[0];
  const { subtotal, deliveryFee, taxAmount, totalAmount } = getTotals();

  const handlePlaceOrder = () => {
    // 1. Simulate placing order on backend
    // 2. Clear local cart
    clearCart();
    // 3. Reset stack & Navigate to tracking screen
    navigation.replace('OrderTracking', { orderId: 'ord_new_123' });
  };

  return (
    <SafeView style={styles.container} edges={['top', 'bottom']}>
      <Header title="Checkout" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Delivery Address Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Location</Text>
          <View style={styles.addressBox}>
            <Text style={styles.addressTitle}>{activeAddress.title}</Text>
            <Text style={styles.addressBody}>
              {activeAddress.addressLine1}, {activeAddress.city}, {activeAddress.state} {activeAddress.postalCode}
            </Text>
            <TouchableOpacity 
              style={styles.changeBtn} 
              onPress={() => navigation.navigate('Addresses')}
            >
              <Text style={styles.changeText}>Change Address</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Methods Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          
          <TouchableOpacity
            style={[styles.payRow, paymentMethod === 'CARD' && styles.payRowSelected]}
            onPress={() => setPaymentMethod('CARD')}
            activeOpacity={0.7}
          >
            <Text style={styles.payIcon}>💳</Text>
            <Text style={styles.payLabel}>Credit / Debit Card</Text>
            <View style={[styles.radioOuter, paymentMethod === 'CARD' && styles.radioActive]}>
              {paymentMethod === 'CARD' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.payRow, paymentMethod === 'WALLET' && styles.payRowSelected]}
            onPress={() => setPaymentMethod('WALLET')}
            activeOpacity={0.7}
          >
            <Text style={styles.payIcon}>👛</Text>
            <Text style={styles.payLabel}>Wallet (Balance: $45.00)</Text>
            <View style={[styles.radioOuter, paymentMethod === 'WALLET' && styles.radioActive]}>
              {paymentMethod === 'WALLET' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.payRow, paymentMethod === 'CASH' && styles.payRowSelected]}
            onPress={() => setPaymentMethod('CASH')}
            activeOpacity={0.7}
          >
            <Text style={styles.payIcon}>💵</Text>
            <Text style={styles.payLabel}>Cash on Delivery</Text>
            <View style={[styles.radioOuter, paymentMethod === 'CASH' && styles.radioActive]}>
              {paymentMethod === 'CASH' && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Order Summary Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.summaryItemRow}>
              <Text style={styles.summaryItemText}>
                {item.quantity}x {item.foodItem.name}
              </Text>
              <Text style={styles.summaryItemPrice}>
                {formatCurrency((item.variant ? item.variant.price : item.foodItem.price) * item.quantity)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals Section */}
        <View style={styles.section}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalVal}>{formatCurrency(subtotal)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Delivery Fee</Text>
            <Text style={styles.totalVal}>{formatCurrency(deliveryFee)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax</Text>
            <Text style={styles.totalVal}>{formatCurrency(taxAmount)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.finalTotalLabel}>Grand Total</Text>
            <Text style={styles.finalTotalVal}>{formatCurrency(totalAmount)}</Text>
          </View>
        </View>

      </ScrollView>

      {/* Place Order button footer */}
      <View style={styles.footer}>
        <Button
          title={`Place Order • ${formatCurrency(totalAmount)}`}
          onPress={handlePlaceOrder}
          style={styles.placeBtn}
        />
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  addressBox: {
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: 8,
  },
  addressTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  addressBody: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  changeBtn: {
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  changeText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '600',
  },
  payRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  payRowSelected: {
    backgroundColor: COLORS.white,
  },
  payIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  payLabel: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  summaryItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryItemText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  summaryItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  totalVal: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  finalTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  finalTotalVal: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  placeBtn: {
    width: '100%',
  },
});

export default Checkout;
