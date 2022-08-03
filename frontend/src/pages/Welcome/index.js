import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import { useNavigation } from '@react-navigation/native';

import { styles } from "./styles.js";

const Welcome = () => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}  >
      <ImageBackground 
        source={require('../../assets/fundo1.png')}
        resizeMode="cover"
        style={styles.image}>
        
        <View style={{
          flex:1,
          paddingHorizontal: '8%'
        }}>
          <Animatable.View
            delay={600}
            animation="fadeInUp"
            style={styles.containerForm }
          >
            <Animatable.Image
              animation={"fadeInUp"}
              delay={900}
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="cover"
            />
            
            <Text style={styles.title}>Amigos do Bairro</Text>
            <Text style={styles.text}>O jeito mais fácil de você ajudar seu bairro!</Text>

            <View style={{
              flexDirection:'row',
              padding: '10%',
              position: 'relative',
              alignSelf: 'center',
              alignItems: 'center'
            }}>
              
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('SignIn')}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.buttonText}>Registrar</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </ImageBackground>
    </View>
  );
}

export { Welcome };