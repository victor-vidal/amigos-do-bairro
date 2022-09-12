import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

import { ComplaintCounter } from "../../components/ComplaintCounter/index.js";
import { Menu } from "../../components/Menu/index.js";

import { useAuth } from "../../context/AuthContext.js";

import { styles } from "./styles.js";


const MainPage = () => {
  //#region 
  const { user, signOut } = useAuth();
  const navigation = useNavigation();
  //#endregion

  return (
    <ScrollView>
      <Menu />
      <ImageBackground
        source={require('../../assets/mainPage.png')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.containerHeader}>
          <Text style={styles.titleWelcome}>Bem Vindo(a)</Text>
          <Text style={styles.text}>{user.firstName} {user.lastName}!</Text>
        </View>
        <Animatable.View
          animation={"fadeInUp"}
          delay={500}
          style={styles.containerForm}
        >
          <Text style={styles.title}>Início</Text>
          <Text style={styles.text}>Numeros de Reclamações</Text>

          <View
            style={{
              marginTop: "5%",
              height: "100%",
              overflow: 'scroll'
            }}
          >
            <View style={{ 
              flexDirection: 'row',
              marginBottom: '5%'
            }}>
              <ComplaintCounter 
                color="#A3B7FF"
                complaintCount={385}
                title="Iluminação"
              />
              <ComplaintCounter 
                color="rgba(39, 194, 0, 0.55)"
                complaintCount={221}
                title="Meio Ambiente"
              />
              <ComplaintCounter 
                color="#FCB90D"
                complaintCount={900}
                title="Trânsito"
              />
            </View>
            <View style={{
              flexDirection: 'row',
              marginBottom: '5%'
            }}>
              <ComplaintCounter 
                color="#A3B7FF"
                complaintCount={344}
                title="Esgoto"
              />
              <ComplaintCounter 
                color="rgba(39, 194, 0, 0.55)"
                complaintCount={124}
                title="Animais"
              />
              <ComplaintCounter 
                color="#FCB90D"
                complaintCount={30}
                title="Trânsito"
              />
            </View>
            <View style={{
              flexDirection: 'row',
              marginBottom: '5%'
            }}>
              <ComplaintCounter 
                color="#A3B7FF"
                complaintCount="999..."
                title="Iluminação"
              />
              <ComplaintCounter 
                color="rgba(39, 194, 0, 0.55)"
                complaintCount={771}
                title="Meio Ambiente"
              />
              <ComplaintCounter 
                color="#FCB90D"
                complaintCount={545}
                title="Trânsito"
              />
            </View>
          </View>
        </Animatable.View>
      </ImageBackground>
    </ScrollView>
  );
}

export { MainPage };
