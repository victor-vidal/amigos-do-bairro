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

const RedefinePassword = () => {
  //HOOKS
  const route = useRoute();

  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  //FUNCTIONS
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/users/${route.params.user_id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${route.params.token}`
        },
        body: JSON.stringify({
          "password": password,
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
          onChangeText={passwordInput => setPassword(passwordInput)}
        />

        <TouchableOpacity
          style={styles.button}
          //onPress={() => navigation.navigate('SignIn')}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.buttonText}>Finalizar</Text>
        </TouchableOpacity>


      </Animatable.View>

    </View>
  );
}

export { RedefinePassword };