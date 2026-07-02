export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  OTP: { phone: string };
  Home: undefined;
  Restaurant: { restaurantId: string };
  FoodDetails: { foodItemId: string; restaurantId: string };
  Cart: undefined;
  Checkout: undefined;
  OrderTracking: { orderId: string };
  Orders: undefined;
  Profile: undefined;
  Favorites: undefined;
  Addresses: undefined;
  Notifications: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
