import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation, useRoute } from '@react-navigation/native';

import { styles } from "./styles.js";

    const CheckForgotPassword = () => {
        const route = useRoute();

        const [code, setCode] = useState("");

        const navigation = useNavigation();
      
        const handleSubmit = async () => {
          try {
            const response = await fetch("http://127.0.0.1:8000/auth/check_recovery_number", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                "email": route.params.email,
                "number": code
              })
            });
      
            if (response.ok) {
              const data = await response.json();
              navigation.navigate("RedefinePassword", { token: data.access_token, user_id: data.user_id });
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
                Digite o código enviado por email
              </Text>
            </Animatable.View>
      
            <Animatable.View
              animation={"fadeInUp"}
              delay={500}
              style={styles.containerForm}
            >
              <Text style={styles.title}>Código</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder='Digite o código'
                style={styles.input}
                onChangeText={emailInput => setCode(emailInput)}
              />
      
              <TouchableOpacity
                style={styles.button}
                //onPress={() => navigation.navigate('RedefinePassword')}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
      
            </Animatable.View>
      
          </View>
        );
      }
      
      export { CheckForgotPassword };