import type { AppRoutes } from './routes';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = NativeStackScreenProps<RootStackParamList, S>;

export type RootStackParamList = {
  [AppRoutes.Example]: undefined;
  [AppRoutes.Startup]: undefined;
};
