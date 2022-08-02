import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  SafeAreaView
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import { apiUrl } from '../../utils/apiUrl.js';
import { fetchWithTimeout } from '../../utils/fetchWithTimeout.js';

import { styles } from "./styles.js";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await fetchWithTimeout(`${apiUrl}/auth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        navigation.navigate("MainPage");
      } else {
        Alert.alert("Falha no login", "Credenciais inválidas");
      }
    } catch (error) {
      Alert.alert("Falha no login", "Algo deu errado");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <ImageBackground 
              source={require('../../assets/fundo2.png')}
              resizeMode="cover"
              style={styles.image}>
            
            <Animatable.View
              animation={"fadeInUp"}
              delay={500}
              style={styles.containerForm}
            >
              <Animatable.View
              animation={"fadeInLeft"}
              delay={500}
              style={styles.containerHeader}
            >
              <Text style={styles.message}>
                Login
              </Text>
            </Animatable.View>

              <Text style={styles.title}>Email</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder='Digite um email..'
                keyboardType="email-address"
                style={styles.input}
                onChangeText={emailInput => setEmail(emailInput)}
              />

              <Text style={styles.title}>Senha</Text>
              <TextInput
                secureTextEntry={true}
                placeholder='Digite sua senha'
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

              <TouchableOpacity
                style={styles.buttonRegister}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.buttonRegisterText}>
                  Esqueceu sua senha?
                </Text>
              </TouchableOpacity>

            </Animatable.View>

            </ImageBackground>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export { SignIn };