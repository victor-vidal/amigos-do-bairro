import React, { useState } from 'react';
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
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import { apiUrl } from '../../utils/apiUrl.js';
import { fetchWithTimeout } from '../../utils/fetchWithTimeout.js';

import { styles } from "./styles.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const response = await fetchWithTimeout(`${apiUrl}/auth/create_recovery_number`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "email": email,
        })
      });

      if (response.ok) {
        const data = await response.json();
        navigation.navigate("CheckForgotPassword", { email: email });
      } else {
        Alert.alert("Falha no login", "Credenciais inválidas");
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
                Digite o seu email
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
                style={styles.input}
                keyboardType="email-address"
                onChangeText={emailInput => setEmail(emailInput)}
              />

              <TouchableOpacity
                style={styles.button}
                // onPress={() => navigation.navigate('CheckForgotPassword')}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>

            </Animatable.View>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export { ForgotPassword };