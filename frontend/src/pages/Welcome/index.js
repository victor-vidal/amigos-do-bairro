import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import { styles } from "./styles.js";

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={require('../../assets/logo.png')}
          style={{ width: '100%' }}
          resizeMode="contain"
        />
      </View>

      <Animatable.View
        delay={600}
        animation="fadeInUp"
        style={styles.containerForm}
      >
        <Text style={styles.title}>Amigos do Bairro</Text>
        <Text style={styles.text}>O jeito mais fácil de denunciar os problemas da região</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>

    </View>
  );
}

export { Welcome };