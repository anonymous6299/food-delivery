import { create } from 'zustand';
import { CartItem, FoodItem, FoodItemVariant, AddonItem } from '../types';

interface CartState {
  items: CartItem[];
  restaurantId: string | null;
  addToCart: (
    foodItem: FoodItem,
    quantity: number,
    variant?: FoodItemVariant,
    addons?: AddonItem[],
    notes?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotals: (deliveryFeeRate?: number) => {
    subtotal: number;
    deliveryFee: number;
    taxAmount: number;
    totalAmount: number;
  };
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  restaurantId: null,

  addToCart: (foodItem, quantity, variant, addons = [], notes) => {
    const { items, restaurantId } = get();

    // Check if adding item from a different restaurant
    if (restaurantId && restaurantId !== foodItem.restaurantId) {
      // Prompt user or clear cart (for this simple store, we clear it and start fresh)
      set({ items: [], restaurantId: foodItem.restaurantId });
    }

    const newRestaurantId = foodItem.restaurantId;

    // Generate unique ID based on config (itemId + variantId + addonsIds)
    const addonIds = addons.map(a => a.id).sort().join('-');
    const cartItemId = `${foodItem.id}_${variant?.id || 'none'}_${addonIds}`;

    const existingIndex = items.findIndex(item => item.id === cartItemId);

    if (existingIndex > -1) {
      const updatedItems = [...items];
      updatedItems[existingIndex].quantity += quantity;
      set({ items: updatedItems, restaurantId: newRestaurantId });
    } else {
      const newItem: CartItem = {
        id: cartItemId,
        foodItem,
        variant,
        addons,
        quantity,
        notes,
      };
      set({ items: [...items, newItem], restaurantId: newRestaurantId });
    }
  },

  removeFromCart: (cartItemId) => {
    const { items } = get();
    const updatedItems = items.filter(item => item.id !== cartItemId);
    const newRestaurantId = updatedItems.length === 0 ? null : get().restaurantId;
    set({ items: updatedItems, restaurantId: newRestaurantId });
  },

  updateQuantity: (cartItemId, quantity) => {
    const { items } = get();
    if (quantity <= 0) {
      get().removeFromCart(cartItemId);
      return;
    }
    const updatedItems = items.map(item =>
      item.id === cartItemId ? { ...item, quantity } : item
    );
    set({ items: updatedItems });
  },

  clearCart: () => set({ items: [], restaurantId: null }),

  getTotals: (deliveryFeeRate = 2.99) => {
    const { items } = get();
    
    // Subtotal calculation
    const subtotal = items.reduce((acc, item) => {
      const itemBasePrice = item.variant ? item.variant.price : item.foodItem.price;
      const addonsPrice = item.addons.reduce((sum, add) => sum + add.price, 0);
      return acc + (itemBasePrice + addonsPrice) * item.quantity;
    }, 0);

    const deliveryFee = items.length > 0 ? deliveryFeeRate : 0.00;
    const taxAmount = subtotal * 0.08875; // 8.875% tax rate
    const totalAmount = subtotal + deliveryFee + taxAmount;

    return {
      subtotal,
      deliveryFee,
      taxAmount,
      totalAmount,
    };
  },
}));

export default useCartStore;
