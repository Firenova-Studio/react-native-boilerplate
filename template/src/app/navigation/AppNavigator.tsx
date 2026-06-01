import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ExampleScreen } from '@/screens/example';
import { StartupScreen } from '@/screens/startup';
import { useTheme } from '@/shared/lib/theme';

import type { RootStackParamList } from './types';
import { AppRoutes } from './routes';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { navigationTheme, variant } = useTheme();

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator key={variant} screenOptions={{ headerShown: false }}>
        <Stack.Screen component={StartupScreen} name={AppRoutes.Startup} />
        <Stack.Screen component={ExampleScreen} name={AppRoutes.Example} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
