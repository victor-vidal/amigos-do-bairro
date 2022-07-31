import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import { apiUrl } from '../../utils/apiUrl.js';
import { fetchWithTimeout } from '../../utils/fetchWithTimeout.js';

import { styles } from "./styles.js";

    const CreateQueixa = () => {
        const [queixa, queixaInput] = useState("");
      
        const navigation = useNavigation();
      
        const handleSubmit = async () => {
          try {
            const response = await fetchWithTimeout(`${apiUrl}/auth/create_recovery_number`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: SON.stringify({
                "email": queixa,
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
            <Animatable.View
              animation={"fadeInLeft"}
              delay={500}
              style={styles.containerHeader}
            >
              <Text style={styles.message}>
                Crie sua Queixa aqui
              </Text>
            </Animatable.View>
      
            <Animatable.View
              animation={"fadeInUp"}
              delay={500}
              style={styles.containerForm}
            >
              <Text style={styles.title}>Foto da queixa</Text>
            <TextInput
                style={styles.input}
              />

              <Text style={styles.title}>Descrição da queixa</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder='Descreva sua queixa..'
                style={styles.input}
                onChangeText={queixaInput => setEmail(queixaInput)}
              />

            <Text style={styles.title}>Tipo de queixa</Text>
            <TextInput
                style={styles.input}
              />

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('MainPage')}
                //onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
      
            </Animatable.View>
      
          </View>
        );
      }
      
      export { CreateQueixa };