import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider } from "./src/context/AuthContext";
import { LanguageProvider } from "./src/context/LanguageContext";

import { Routes } from "./src/routes";


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <LanguageProvider>
          <StatusBar backgroundColor="#F47E51" barStyle="light-content" />
          <Routes />
        </LanguageProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
