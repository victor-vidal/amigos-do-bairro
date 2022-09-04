import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  SafeAreaView,
  ImageBackground
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import { getUsers } from '../../services/UserService.js';

import { styles } from "./styles.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    getUsers().then(response => {
      if (!response) {
        alert("Failed to get users");
        return;
      }

      const user = response.find(
        (user) => user.email == email
      );

      if (!user) {
        alert("User doesn't exists");
        return;
      }

      navigation.navigate("CheckForgotPassword", { user: user });
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>  
          <View style={styles.container}>
              <ImageBackground
                source={require('../../assets/fundo4.png')}
                resizeMode="cover"
                style={styles.image}>

              </ImageBackground>

              <Animatable.View
                animation={"fadeInUp"}
                delay={500}
                style={styles.containerForm}
              >
                <Animatable.Image
                  delay={900}
                  source={require('../../assets/logo2.png')}
                  style={styles.logo}
                  resizeMode="cover"
                />

                <Text style={styles.message}>
                  Recuperar Acesso
                </Text>
                              
                <Text style={styles.title}>Email</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder='Digite o email de recuperação'
                  style={styles.input}
                  keyboardType="email-address"
                  onChangeText={emailInput => setEmail(emailInput)}
                />

                <TouchableOpacity
                  style={styles.button}
                  // onPress={() => navigation.navigate('CheckForgotPassword')}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonRegister}
                  onPress={() => navigation.navigate('Welcome')}
                >
                  <Text style={styles.buttonRegisterText}>
                    VOLTAR
                  </Text>
                </TouchableOpacity>

              </Animatable.View>
            
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export { ForgotPassword };