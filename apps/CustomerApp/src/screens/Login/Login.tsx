import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import COLORS from '../../constants/colors';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import SafeView from '../../components/common/SafeView';
import Header from '../../components/common/Header';
import useAuthStore from '../../store/useAuthStore';

const schema = zod.object({
  phone: zod
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number is too long')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format. E.g. +1234567890'),
});

type FormData = zod.infer<typeof schema>;

export const Login: React.FC = () => {
  const navigation = useNavigation<any>();
  const { login } = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    await login(data.phone);
    navigation.navigate('OTP', { phone: data.phone });
  };

  return (
    <SafeView style={styles.container} edges={['top', 'bottom']}>
      <Header showBackButton={false} transparent />
      <View style={styles.content}>
        <Text style={styles.welcomeText}>What's your mobile number?</Text>
        <Text style={styles.subtext}>
          We'll send a text to verify your phone number.
        </Text>

        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.phone?.message}
              containerStyle={styles.inputContainer}
            />
          )}
        />

        <Button
          title="Continue"
          onPress={handleSubmit(onSubmit)}
          style={styles.btn}
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
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  btn: {
    width: '100%',
  },
});

export default Login;
