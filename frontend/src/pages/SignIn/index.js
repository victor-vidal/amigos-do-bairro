import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  SafeAreaView
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../context/AuthContext.js";

import { styles } from "./styles.js";


const SignIn = () => {
  //#region HOOKS
  const { signIn } = useAuth();
  const navigation = useNavigation();
  //#endregion

  //#region STATES/VARIABLES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //#endregion

  return (

    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <ImageBackground
              source={require("../../assets/fundo2.png")}
              resizeMode="cover"
              style={styles.image}>

              <Animatable.View
                animation={"fadeInUp"}
                delay={500}
                style={styles.containerForm}
              >

                <Animatable.Image
                  delay={900}
                  source={require("../../assets/logo.png")}
                  style={styles.logo}
                  resizeMode="cover"
                />

                <Text style={styles.message}>
                  Login
                </Text>

                <Text style={styles.title}>Email</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Digite um email.."
                  keyboardType="email-address"
                  style={styles.input}
                  onChangeText={emailInput => setEmail(emailInput)}
                />

                <Text style={styles.title}>Senha</Text>
                <TextInput
                  secureTextEntry={true}
                  placeholder="Digite sua senha"
                  style={styles.input}
                  onChangeText={passwordInput => setPassword(passwordInput)}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => signIn(email, password)}
                >
                  <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonRegister}
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.buttonRegisterText}>
                    Não possui conta? Cadastre-se
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonRegister}
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  <Text style={styles.buttonRegisterText}>
                    Esqueceu sua senha?
                  </Text>
                </TouchableOpacity>

              </Animatable.View>

            </ImageBackground>

          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export { SignIn };