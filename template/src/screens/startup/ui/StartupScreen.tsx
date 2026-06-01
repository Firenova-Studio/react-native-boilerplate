import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Text, View } from 'react-native';

import { AppRoutes, type RootScreenProps } from '@/app/navigation';
import { StyleSheet, useTheme } from '@/shared/lib/theme';
import { AssetByVariant, SafeScreen } from '@/shared/ui';

const styles = StyleSheet.create((theme) => ({
  errorText: {
    color: theme.colors.red500,
    fontSize: 16,
  },
  logo: {
    height: 300,
    width: 300,
  },
}));

function StartupScreen({ navigation }: RootScreenProps<AppRoutes.Startup>) {
  const { fonts, gutters, layout } = useTheme();
  const { t } = useTranslation();

  const { isError, isFetching, isSuccess } = useQuery({
    queryFn: () => Promise.resolve(true),
    queryKey: ['startup'],
  });

  useEffect(() => {
    if (isSuccess) {
      navigation.reset({
        index: 0,
        routes: [{ name: AppRoutes.Example }],
      });
    }
  }, [isSuccess, navigation]);

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
        ]}
      >
        <AssetByVariant path="tom" resizeMode="contain" style={styles.logo} />
        {isFetching ? (
          <ActivityIndicator size="large" style={[gutters.marginVertical_24]} />
        ) : undefined}
        {isError ? (
          <Text style={[fonts.size_16, styles.errorText]}>
            {t('common_error')}
          </Text>
        ) : undefined}
      </View>
    </SafeScreen>
  );
}

export default StartupScreen;
