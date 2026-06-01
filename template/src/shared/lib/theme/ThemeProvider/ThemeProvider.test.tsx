import { fireEvent, render, screen } from '@testing-library/react-native';
import { Button, Text, View } from 'react-native';

import { storage } from '@/shared/lib/storage';

import useTheme from '../hooks/useTheme';
import ThemeProvider from './ThemeProvider';

function TestChildComponent() {
  const { changeTheme, variant } = useTheme();

  return (
    <View>
      <Text testID="theme-variant">{variant}</Text>
      <Button
        onPress={() => {
          changeTheme('dark');
        }}
        testID="change-btn"
        title="button"
      />
    </View>
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    storage.clearAll();
  });

  it('initializes with the default theme when storage is empty', () => {
    render(
      <ThemeProvider>
        <TestChildComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText('default')).toBeTruthy();
    expect(storage.getString('theme')).toBe('default');
  });

  it('loads the theme from storage when it exists', () => {
    storage.set('theme', 'dark');

    render(
      <ThemeProvider>
        <TestChildComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText('dark')).toBeTruthy();
  });

  it('changes the theme and persists it', () => {
    render(
      <ThemeProvider>
        <TestChildComponent />
      </ThemeProvider>,
    );

    fireEvent.press(screen.getByTestId('change-btn'));

    expect(screen.getByText('dark')).toBeTruthy();
    expect(storage.getString('theme')).toBe('dark');
  });
});
