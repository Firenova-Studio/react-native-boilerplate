import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';

import { fetchUser } from '@/entities/user/api/fetchUser';
import i18n from '@/shared/config/i18n';
import { SupportedLanguages } from '@/shared/lib/i18n';
import { storage } from '@/shared/lib/storage';

import TestAppWrapper from '@/tests/TestAppWrapper';

import ExampleScreen from './ExampleScreen';

jest.mock('@/entities/user/api/fetchUser', () => ({
  fetchUser: jest.fn(),
}));

const mockedFetchUser = jest.mocked(fetchUser);

describe('Example screen', () => {
  beforeEach(() => {
    storage.clearAll();
    mockedFetchUser.mockReset();
    jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());
    void i18n.changeLanguage(SupportedLanguages.FR_FR);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('toggles the language', async () => {
    render(<ExampleScreen />, {
      wrapper: TestAppWrapper,
    });

    expect(i18n.language).toBe(SupportedLanguages.FR_FR);
    fireEvent.press(screen.getByTestId('change-language-button'));

    await waitFor(() => {
      expect(i18n.language).toBe(SupportedLanguages.EN_EN);
    });
  });

  it('toggles the theme', () => {
    render(<ExampleScreen />, {
      wrapper: TestAppWrapper,
    });

    expect(storage.getString('theme')).toBe('default');
    fireEvent.press(screen.getByTestId('change-theme-button'));

    expect(storage.getString('theme')).toBe('dark');
  });

  it('fetches a user and shows the success alert', async () => {
    mockedFetchUser.mockResolvedValue({
      id: 1,
      name: 'Tom',
    });
    jest.spyOn(Math, 'random').mockReturnValue(0);

    render(<ExampleScreen />, {
      wrapper: TestAppWrapper,
    });

    fireEvent.press(screen.getByTestId('fetch-user-button'));

    await waitFor(() => {
      expect(mockedFetchUser).toHaveBeenCalledWith(1);
    });

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith("Salut, je m'appelle Tom");
    });
  });
});
