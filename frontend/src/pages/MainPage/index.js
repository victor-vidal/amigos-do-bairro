import React from 'react';
import { View, Text, TouchableOpacity,Image, ImageBackground } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAuth } from '../../context/AuthContext.js';

import { styles } from "./styles.js";
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';


const MainPage = () => {
  //#region 
  const { token, signOut } = useAuth();
  const navigation = useNavigation();
  //#endregion

  return (
      <View >

        <ImageBackground
          source={require('../../assets/mainPage.png')}
          resizeMode="cover"
          style={styles.image}>

          <View style={styles.containerHeader}>
          <Text style={styles.titleWelcome}>Bem Vindo!(a)</Text>
          <Text style={styles.text}>Carlos Eduardo</Text>
          </View>


        <Animatable.View
          animation={"fadeInUp"}
          delay={500}
          style={styles.containerForm}
        > 
          <Text style={styles.title}>Início</Text>
          <Text style={styles.text}>Numeros de Reclamações!</Text>

          <View style={{ 
            flexDirection: 'row'
            }}>
            <TouchableOpacity
              style={styles.buttonMenu}
              onPress={() => navigation.navigate('CreateQueixa')}
            >
              <Text style={styles.buttonText}>Criar Queixa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonMenu}
              onPress={() => navigation.navigate('Feed')}
            >
              <Text style={styles.buttonText}>Feed</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonMenu}
              onPress={() => signOut()}
            >
              <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
          
         
        </ImageBackground>
      </View>
  );
}

export { MainPage };
