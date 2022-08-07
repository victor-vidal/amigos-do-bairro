import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAuth } from '../../context/AuthContext.js';

import { styles } from "./styles.js";


const MainPage = () => {
  //#region 
  const { token } = useAuth();
  const navigation = useNavigation();
  //#endregion

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
