import {SafeAreaProvider} from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import AppNavigation from './src/routes';
import { Provider } from 'react-redux';
import  store from './src/stores/stores';
import SplashScreen from 'react-native-splash-screen';

const App: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => { SplashScreen.hide(); }, 50);

    return () => {
      clearTimeout(timer)
    }
  },[])

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
