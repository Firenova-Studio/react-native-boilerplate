import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useUserQuery } from '@/entities/user';
import { useI18n } from '@/shared/lib/i18n';
import { StyleSheet, useTheme } from '@/shared/lib/theme';
import { AssetByVariant, IconByVariant, SafeScreen, Skeleton } from '@/shared/ui';

const MAX_RANDOM_ID = 9;

const styles = StyleSheet.create((theme) => ({
  description: {
    color: theme.colors.gray200,
    fontSize: 16,
  },
  title: {
    color: theme.colors.gray800,
    fontSize: 40,
    fontWeight: 'bold',
  },
}));

function ExampleScreen() {
  const { t } = useTranslation();
  const { toggleLanguage } = useI18n();
  const {
    backgrounds,
    changeTheme,
    colors,
    components,
    fonts,
    gutters,
    layout,
    variant,
  } = useTheme();

  const [currentId, setCurrentId] = useState(-1);

  const fetchOneUserQuery = useUserQuery(currentId);

  useEffect(() => {
    if (fetchOneUserQuery.isSuccess) {
      Alert.alert(
        t('screen_example.hello_user', { name: fetchOneUserQuery.data.name }),
      );
    }
  }, [fetchOneUserQuery.data, fetchOneUserQuery.isSuccess, t]);

  const onChangeTheme = () => {
    changeTheme(variant === 'default' ? 'dark' : 'default');
  };

  return (
    <SafeScreen
      isError={fetchOneUserQuery.isError}
      onResetError={() => {
        void fetchOneUserQuery.refetch();
      }}
    >
      <ScrollView>
        <View
          style={[
            layout.justifyCenter,
            layout.itemsCenter,
            gutters.marginTop_80,
          ]}
        >
          <View
            style={[layout.relative, backgrounds.gray100, components.circle250]}
          />

          <View style={[layout.absolute, gutters.paddingTop_80]}>
            <AssetByVariant
              path="tom"
              resizeMode="contain"
              style={{ height: 300, width: 300 }}
            />
          </View>
        </View>

        <View style={[gutters.paddingHorizontal_32, gutters.marginTop_40]}>
          <View style={[gutters.marginTop_40]}>
            <Text style={[fonts.size_40, fonts.bold, styles.title]}>
              {t('screen_example.title')}
            </Text>
            <Text
              style={[fonts.size_16, gutters.marginBottom_40, styles.description]}
            >
              {t('screen_example.description')}
            </Text>
          </View>

          <View
            style={[
              layout.row,
              layout.justifyBetween,
              layout.fullWidth,
              gutters.marginTop_16,
            ]}
          >
            <Skeleton
              height={64}
              loading={fetchOneUserQuery.isLoading}
              style={{ borderRadius: components.buttonCircle.borderRadius }}
              width={64}
            >
              <TouchableOpacity
                onPress={() => {
                  setCurrentId(Math.floor(Math.random() * MAX_RANDOM_ID) + 1);
                }}
                style={[components.buttonCircle, gutters.marginBottom_16]}
                testID="fetch-user-button"
              >
                <IconByVariant path="send" stroke={colors.purple500} />
              </TouchableOpacity>
            </Skeleton>

            <TouchableOpacity
              onPress={onChangeTheme}
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID="change-theme-button"
            >
              <IconByVariant path="theme" stroke={colors.purple500} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={toggleLanguage}
              style={[components.buttonCircle, gutters.marginBottom_16]}
              testID="change-language-button"
            >
              <IconByVariant path="language" stroke={colors.purple500} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default ExampleScreen;
