import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from "react-native";

import * as Animatable from "react-native-animatable";

import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles.js";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (response.ok) {
        navigation.navigate("SignIn");
      } else {
        Alert.alert("Falha na criação", "Usuário informado inválido");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>

        <ImageBackground 
          source={require('../../assets/fundo3.png')}
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
                Registre-se
              </Text>
            
            <Text style={styles.title}>Email</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder='Digite o email de cadastro.'
              style={styles.input}
              onChangeText={emailInput => setEmail(emailInput)}
            />

            <Text style={styles.title}>
              Senha
            </Text>

            <TextInput
              secureTextEntry={true}
              placeholder='Digite sua senha..'
              style={styles.input}
              onChangeText={passwordInput => setPassword(passwordInput)}
            />

            <Text style={styles.title}>
              Confirmar Senha 
            </Text>

            <TextInput
              secureTextEntry={true}
              placeholder='Digite novamente sua senha.'
              style={styles.input}
              onChangeText={passwordInput => setPassword(passwordInput)}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonRegister}
              onPress={() => navigation.navigate('SignIn')}
            >
              <Text style={styles.buttonRegisterText}>
                Já possui conta? Acesse
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </ImageBackground>
    </View>
  );
}

export { Register };