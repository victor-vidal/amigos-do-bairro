import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  TextInput} from 'react-native';

import * as Animatable from 'react-native-animatable';

export default function SignIn() {
 return (
   <View style={styles.container}> 
    <Animatable.View animation={"fadeInLeft"} delay={500} style={styles.containerHeader}>
      <Text style={styles.message}>Bem-vindo(a)</Text>
    </Animatable.View>

    <Animatable.View animation={"fadeInUp"} delay={500} style={styles.containerForm}>
      <Text style={styles.title}>Email</Text>
      <TextInput
        placeholder='Digite um email..'
        style={styles.input}
      />

      <Text style={styles.title}>Senha</Text>
      <TextInput
        placeholder='Sua senha'
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonRegister}>
        <Text style={styles.buttonRegisterText}>Não possui conta? Cadastre-se</Text>
      </TouchableOpacity>

    </Animatable.View>

   </View>
  );
} 

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#38A69D'
  },
  containerHeader:{
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%'
  },
  message:{
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF'
  },
  containerForm:{
    flex:1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12
  },
  input:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16
  },
  button:{
    backgroundColor: '#38A69D',
    borderRadius: 4,
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14
  },
  buttonText:{
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  },
  buttonRegister:{
    margin: 14,
    alignSelf: 'center'
  },
  buttonRegisterText:{
    color: '#A1A1A1',
  }

})