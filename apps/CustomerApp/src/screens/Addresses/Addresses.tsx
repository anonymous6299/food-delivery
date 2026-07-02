import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import COLORS from '../../constants/colors';
import SafeView from '../../components/common/SafeView';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import { MOCK_ADDRESSES } from '../../constants/mockData';

export const Addresses: React.FC = () => {
  const navigation = useNavigation<any>();

  return (
    <SafeView style={styles.container}>
      <Header title="Saved Addresses" />
      
      <FlatList
        data={MOCK_ADDRESSES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.addressCard} activeOpacity={0.7}>
            <View style={styles.iconContainer}>
              <Text style={styles.addressIcon}>{item.title === 'Home' ? '🏠' : '🏢'}</Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{item.title}</Text>
                {item.isDefault && <Text style={styles.defaultBadge}>Default</Text>}
              </View>
              <Text style={styles.addressBody}>
                {item.addressLine1}, {item.addressLine2 ? `${item.addressLine2}, ` : ''}
                {item.city}, {item.state} {item.postalCode}
              </Text>
            </View>
            <TouchableOpacity style={styles.editBtn} onPress={() => console.log('Edit address:', item.id)}>
              <Text style={styles.editText}>✏️</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
        <Button
          title="Add New Address"
          onPress={() => console.log('Adding address')}
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
  content: {
    padding: 16,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  addressIcon: {
    fontSize: 20,
  },
  infoContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  defaultBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  addressBody: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },
  editBtn: {
    padding: 8,
  },
  editText: {
    fontSize: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  addBtn: {
    width: '100%',
  },
});

export default Addresses;
