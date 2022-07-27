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

const MainPage = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>MAIN PAGE</Text>

      <Animatable.View
              animation={"fadeInUp"}
              delay={500}
            >
      
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('CreateQueixa')}
              >
                <Text style={styles.buttonText}>Criar Queixa</Text>
              </TouchableOpacity>
      
            </Animatable.View>
    </View>
  );
}

export { MainPage };