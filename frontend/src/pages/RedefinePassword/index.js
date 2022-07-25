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

    const RedefinePassword = () => {
        const [email, setEmail] = useState("");
      
        const navigation = useNavigation();
      
        const handleSubmit = async () => {
          try {
            const response = await fetch("http://127.0.0.1:8000/create_recovery_number", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              body: new URLSearchParams({
                "email": email,
              })
            });
      
            if (response.ok) {
              const data = await response.json();
              navigation.navigate("SignIn");
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
                Digite sua nova resenha
              </Text>
            </Animatable.View>
      
            <Animatable.View
              animation={"fadeInUp"}
              delay={500}
              style={styles.containerForm}
            >
              <Text style={styles.title}>Nova senha</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder='Digite a nova senha..'
                style={styles.input}
                onChangeText={emailInput => setEmail(emailInput)}
              />
      
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('SignIn')}
                //onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Finalizar</Text>
              </TouchableOpacity>
      

            </Animatable.View>
      
          </View>
        );
      }
      
      export { RedefinePassword };