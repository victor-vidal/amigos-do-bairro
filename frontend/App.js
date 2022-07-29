import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#F47E51" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}