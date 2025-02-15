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
  SafeAreaView
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation, useRoute } from '@react-navigation/native';

import { updateUser } from '../../services/UserService.js';

import { styles } from "./styles.js";

const RedefinePassword = () => {
  //HOOKS
  const route = useRoute();

  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  //FUNCTIONS
  const handleSubmit = async () => {
    const response = await updateUser(route.params.user.id, {
      "password": password
    });

    if (response) {
      navigation.navigate("SignIn");
    } else {
      Alert.alert("Falha na redefinição");
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export { RedefinePassword };