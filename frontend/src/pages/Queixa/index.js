import React, { useState, useMemo, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image,
  TouchableWithoutFeedback, 
  ImageBackground, 
  Keyboard,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { LikeButton } from '../../services/LikeButton.js';
import { FollowButton } from '../../services/FollowButton.js';

import { Menu } from '../../components/Menu';
import { useAuth } from '../../context/AuthContext.js';

import { styles } from "./styles.js";



const Queixa = ( {navigator, route} ) => {
  //#region HOOKS
  const { user } = useAuth();
  const param = route.params;
  //#endregion
 

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Menu style={styles.menu}/>
            <ImageBackground
              source={require('../../assets/mainPage.png')}
              resizeMode="cover"
              style={styles.image}
            >
              <View style={styles.containerHeader}>
                <Text style={styles.titleWelcome}>Bem Vindo(a)</Text>
                <Text style={styles.text}>{user.firstName} {user.lastName}!</Text>
                <Text style={styles.titleWelcome}>Queixa </Text>
              </View>
                <ScrollView>
                  <View >
                    <Image style={styles.coverPhoto} source={{ uri: `data:image/jpeg;base64,${param.image}` }}/>
                  </View>
                  <Text style={styles.text}>Descrição: {param.title} </Text>
                  <Text style={styles.text}>Categoria: {param.category}</Text>
                  <Text style={styles.text}>Cidade: {param.city}</Text>
                  <Text style={styles.text}>Bairro: {param.suburb}</Text>
                  <Text style={styles.text}>Rua: {param.road}</Text>
                  <Text style={styles.text}>Coordenadas: {param.latitude}, {param.longitude}</Text>
                  {param.resolved ? <Text style={styles.resolvido}>Resolvida!</Text> : <Text style={styles.nResolvido}>Não resolvida...</Text>}
                  <View style={styles.twoButton}>
                    <LikeButton />
                    <FollowButton />
                  </View>
                </ScrollView>

            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

export { Queixa };
