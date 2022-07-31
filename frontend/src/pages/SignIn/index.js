import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import { styles } from "./styles.js";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/auth/token", {
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
        const data = await response.json();
        navigation.navigate("MainPage");
      } else {
        Alert.alert("Falha no login", "Credenciais inválidas");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
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
          <Animatable.Image
            delay={900}
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="cover"
          />
          
          <Text style={styles.message}>
            Login
          </Text>

          <Text style={styles.title}>Email</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder='Digite um email..'
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
  );
}

export { SignIn };