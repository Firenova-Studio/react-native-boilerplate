import { render, screen, waitFor } from '@testing-library/react-native';

import { queryClient } from '@/app/providers';
import { storage } from '@/shared/lib/storage';

import App from './App';

describe('App bootstrap', () => {
  beforeEach(() => {
    storage.clearAll();
    queryClient.clear();
  });

  it('boots through the app entrypoints and resets from startup to example', async () => {
    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText('Bienvenue sur Le Boilerplate React Native'),
      ).toBeTruthy();
    });
  });
});
