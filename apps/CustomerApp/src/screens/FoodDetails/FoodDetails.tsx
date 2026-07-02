import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import COLORS from '../../constants/colors';
import SafeView from '../../components/common/SafeView';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { MOCK_RESTAURANTS } from '../../constants/mockData';
import useCartStore from '../../store/useCartStore';
import { FoodItemVariant, AddonItem } from '../../types';
import { formatCurrency } from '../../utils/formatters';

export const FoodDetails: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { foodItemId, restaurantId } = route.params;

  const restaurant = MOCK_RESTAURANTS.find(res => res.id === restaurantId) || MOCK_RESTAURANTS[0];
  const item = restaurant.foodItems.find(f => f.id === foodItemId) || restaurant.foodItems[0];

  const { addToCart } = useCartStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<FoodItemVariant | undefined>(
    item.variants && item.variants.length > 0 ? item.variants[0] : undefined
  );
  const [selectedAddons, setSelectedAddons] = useState<AddonItem[]>([]);
  const [notes, setNotes] = useState('');

  const toggleAddon = (addon: AddonItem) => {
    const isSelected = selectedAddons.some(a => a.id === addon.id);
    if (isSelected) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const calculateItemPrice = () => {
    const basePrice = selectedVariant ? selectedVariant.price : item.price;
    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    return (basePrice + addonsTotal) * quantity;
  };

  const handleAddToCart = () => {
    addToCart(item, quantity, selectedVariant, selectedAddons, notes);
    navigation.goBack();
  };

  return (
    <SafeView style={styles.container} edges={['top', 'bottom']}>
      <Header title="Customize Item" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {item.imageUrl && (
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
        )}

        <View style={styles.body}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>

          {/* Variants Options */}
          {item.variants && item.variants.length > 0 && (
            <View style={styles.optionSection}>
              <Text style={styles.optionTitle}>Select Size</Text>
              {item.variants.map((v) => (
                <TouchableOpacity
                  key={v.id}
                  style={styles.optionRow}
                  onPress={() => setSelectedVariant(v)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionLabel}>{v.name}</Text>
                  <View style={styles.optionPriceRow}>
                    <Text style={styles.optionPrice}>${v.price.toFixed(2)}</Text>
                    <View style={[styles.radioOuter, selectedVariant?.id === v.id && styles.radioOuterActive]}>
                      {selectedVariant?.id === v.id && <View style={styles.radioInner} />}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Addons Options */}
          {item.addonGroups && item.addonGroups.length > 0 && (
            item.addonGroups.map((group) => (
              <View key={group.id} style={styles.optionSection}>
                <Text style={styles.optionTitle}>{group.name}</Text>
                {group.items.map((addon) => {
                  const isSelected = selectedAddons.some(a => a.id === addon.id);
                  return (
                    <TouchableOpacity
                      key={addon.id}
                      style={styles.optionRow}
                      onPress={() => toggleAddon(addon)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.optionLabel}>{addon.name}</Text>
                      <View style={styles.optionPriceRow}>
                        <Text style={styles.optionPrice}>+${addon.price.toFixed(2)}</Text>
                        <View style={[styles.checkboxOuter, isSelected && styles.checkboxOuterActive]}>
                          {isSelected && <Text style={styles.checkboxCheck}>✓</Text>}
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))
          )}

          {/* Special Instructions */}
          <View style={styles.optionSection}>
            <Text style={styles.optionTitle}>Special Instructions</Text>
            <Input
              placeholder="E.g. No onions, sauce on the side, etc."
              value={notes}
              onChangeText={setNotes}
              containerStyle={styles.notesInput}
              multiline
            />
          </View>
        </View>
      </ScrollView>

      {/* Footer controls */}
      <View style={styles.footer}>
        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Text style={styles.quantityBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Text style={styles.quantityBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <Button
          title={`Add to Cart • ${formatCurrency(calculateItemPrice())}`}
          onPress={handleAddToCart}
          style={styles.addBtn}
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
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    height: 240,
    backgroundColor: COLORS.surface,
  },
  body: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 8,
    lineHeight: 20,
    marginBottom: 24,
  },
  optionSection: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  optionLabel: {
    fontSize: 15,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  optionPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionPrice: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginRight: 12,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  checkboxOuter: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxOuterActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  checkboxCheck: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '700',
  },
  notesInput: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 4,
  },
  quantityBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityBtnText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '700',
    paddingHorizontal: 12,
    color: COLORS.textPrimary,
  },
  addBtn: {
    flex: 1,
  },
});

export default FoodDetails;
