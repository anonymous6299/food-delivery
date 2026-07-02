import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import COLORS from '../../constants/colors';
import SafeView from '../../components/common/SafeView';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';

export const OrderTracking: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const orderId = route.params?.orderId || 'ord_123';

  return (
    <SafeView style={styles.container} edges={['top', 'bottom']}>
      <Header title="Track Order" showBackButton={true} />
      
      {/* Mock Map View */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapText}>🗺️ Live Map Tracking</Text>
        <View style={styles.driverMarker}>
          <Text style={styles.markerEmoji}>🏍️</Text>
        </View>
        <View style={styles.userMarker}>
          <Text style={styles.markerEmoji}>🏠</Text>
        </View>
      </View>

      {/* Tracking Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.statusHeader}>
          <Text style={styles.statusTitle}>Arriving in 15-20 min</Text>
          <Text style={styles.statusSubtitle}>Michael is on his way to the restaurant</Text>
        </View>

        {/* Timeline progress indicator */}
        <View style={styles.timeline}>
          <View style={styles.timelineStep}>
            <View style={[styles.bullet, styles.bulletActive]} />
            <Text style={[styles.timelineLabel, styles.timelineLabelActive]}>Order Placed</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.timelineStep}>
            <View style={[styles.bullet, styles.bulletActive]} />
            <Text style={[styles.timelineLabel, styles.timelineLabelActive]}>Preparing</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.timelineStep}>
            <View style={styles.bullet} />
            <Text style={styles.timelineLabel}>Out for Delivery</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.timelineStep}>
            <View style={styles.bullet} />
            <Text style={styles.timelineLabel}>Delivered</Text>
          </View>
        </View>

        {/* Driver Profile Summary Card */}
        <View style={styles.driverCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' }}
            style={styles.driverAvatar}
          />
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>Michael (Driver)</Text>
            <Text style={styles.vehicle}>Black Suzuki Motorcycle • NY-8924</Text>
            <Text style={styles.rating}>★ 4.9 (240 deliveries)</Text>
          </View>
          <TouchableOpacity style={styles.callBtn} onPress={() => console.log('Calling driver')}>
            <Text style={styles.callIcon}>📞</Text>
          </TouchableOpacity>
        </View>

        {/* Actions footer */}
        <Button
          title="Back to Home"
          onPress={() => navigation.navigate('HomeTab')}
          style={styles.homeBtn}
        />
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#E5E9F0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  mapText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  driverMarker: {
    position: 'absolute',
    top: '40%',
    left: '30%',
    backgroundColor: COLORS.white,
    padding: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userMarker: {
    position: 'absolute',
    top: '60%',
    right: '25%',
    backgroundColor: COLORS.white,
    padding: 8,
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  markerEmoji: {
    fontSize: 20,
  },
  detailsContainer: {
    backgroundColor: COLORS.white,
    padding: 24,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statusHeader: {
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  statusSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  timelineStep: {
    alignItems: 'center',
  },
  bullet: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.border,
    marginBottom: 6,
  },
  bulletActive: {
    backgroundColor: COLORS.primary,
  },
  timelineLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  timelineLabelActive: {
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.border,
    marginBottom: 16,
    marginHorizontal: 8,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  driverInfo: {
    flex: 1,
    marginLeft: 12,
  },
  driverName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  vehicle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  rating: {
    fontSize: 12,
    color: COLORS.star,
    fontWeight: '600',
    marginTop: 2,
  },
  callBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  callIcon: {
    fontSize: 16,
  },
  homeBtn: {
    width: '100%',
  },
});

export default OrderTracking;
