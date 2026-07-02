import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import COLORS from '../constants/colors';

// Import screens
import Splash from '../screens/Splash/Splash';
import Onboarding from '../screens/Onboarding/Onboarding';
import Login from '../screens/Login/Login';
import OTP from '../screens/OTP/OTP';
import Home from '../screens/Home/Home';
import Restaurant from '../screens/Restaurant/Restaurant';
import FoodDetails from '../screens/FoodDetails/FoodDetails';
import Cart from '../screens/Cart/Cart';
import Checkout from '../screens/Checkout/Checkout';
import OrderTracking from '../screens/OrderTracking/OrderTracking';
import Orders from '../screens/Orders/Orders';
import Profile from '../screens/Profile/Profile';
import Addresses from '../screens/Addresses/Addresses';
import Favorites from '../screens/Favorites/Favorites';
import Notifications from '../screens/Notifications/Notifications';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Restaurant" component={Restaurant} />
      <Stack.Screen name="FoodDetails" component={FoodDetails} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="OrderTracking" component={OrderTracking} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Addresses" component={Addresses} />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
