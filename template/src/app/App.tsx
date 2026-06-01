import AppNavigator from './navigation/AppNavigator';
import { AppProviders } from './providers';

function App() {
  return (
    <AppProviders>
      <AppNavigator />
    </AppProviders>
  );
}

export default App;
