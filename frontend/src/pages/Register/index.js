import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  SafeAreaView
} from "react-native";

import * as Animatable from "react-native-animatable";

import { useNavigation } from "@react-navigation/native";

import { apiUrl } from "../../utils/apiUrl.js";
import { fetchWithTimeout } from "../../utils/fetchWithTimeout.js";

import { styles } from "./styles.js";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await fetchWithTimeout(`${apiUrl}/users`, {
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Animatable.View
              animation={"fadeInLeft"}
              delay={500}
              style={styles.containerHeader}
            >
              <Text style={styles.message}>
                Registre-se
              </Text>
            </Animatable.View>

            <Animatable.View
              animation={"fadeInUp"}
              delay={500}
              style={styles.containerForm}
            >
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
                placeholder='Sua senha'
                style={styles.input}
                onChangeText={passwordInput => setPassword(passwordInput)}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Registrar</Text>
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

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export { Register };