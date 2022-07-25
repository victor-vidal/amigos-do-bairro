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

import { styles } from "./styles.js";

    const ForgotPassword = () => {
        const [email, setEmail] = useState("");
      
        const navigation = useNavigation();
      
        const handleSubmit = async () => {
          try {
            const response = await fetch("http://127.0.0.1:8000/auth/create_recovery_number", {
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
        );
      }
      
      export { ForgotPassword };