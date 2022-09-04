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
          navigation.navigate("RedefinePassword", { user: route.params.user });
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