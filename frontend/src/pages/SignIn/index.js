import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import styles from "./styles.js";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  // https://stackoverflow.com/questions/60639983/react-native-expo-fetch-throws-network-request-failed
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://192.168.15.189:8000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          "username": email,
          "password": password,
        })
      });

      if (response.ok) {
        const data = response.json();
        Alert.alert("Successfull login", `Token: ${data.access_token}`);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Failed to login", "Invalid credentials");
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.View
        animation={"fadeInLeft"}
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>
          Bem-vindo(a)
        </Text>
      </Animatable.View>

      <Animatable.View
        animation={"fadeInUp"}
        delay={500}
        style={styles.containerForm}
      >
        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder='Digite um email..'
          style={styles.input}
          onChangeText={emailInput => setEmail(emailInput)}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder='Sua senha'
          style={styles.input}
          onChangeText={passwordInput => setPassword(passwordInput)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonRegisterText}>
            Não possui conta? Cadastre-se
          </Text>
        </TouchableOpacity>

      </Animatable.View>

    </View>
  );
}

export { SignIn };