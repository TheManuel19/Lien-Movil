import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import TabNavElement from './src/elements/TabNavElement.jsx';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavElement />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
