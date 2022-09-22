import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

import { ComplaintCounter } from "../../components/ComplaintCounter/index.js";
import { Menu } from "../../components/Menu/index.js";

import { useAuth } from "../../context/AuthContext.js";
import { useLang } from "../../context/LanguageContext.js";

import { styles } from "./styles.js";


const MainPage = () => {
  //#region 
  const { user, signOut } = useAuth();
  const { language } = useLang();
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
          <Text style={styles.titleWelcome}>
            {language == 'pt-BR'? "Bem Vindo(a)" : "Welcome"}
          </Text>
          <Text style={styles.text}>{user.firstName} {user.lastName}!</Text>
        </View>
        <Animatable.View
          animation={"fadeInUp"}
          delay={500}
          style={styles.containerForm}
        >
          <Text style={styles.title}>
            {language == 'pt-BR'? "Início" : "Home"}
          </Text>
          <Text style={styles.text}>
            {language == 'pt-BR'? "Numeros de Reclamações" : "Number of Complaints"}
          </Text>

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
                title={language == 'pt-BR'? "Iluminação" : "Street lighting"}
                />
              <ComplaintCounter 
                color="rgba(39, 194, 0, 0.55)"
                complaintCount={221}
                title={language == 'pt-BR'? "Meio Ambiente" : "Environment"}
              />
              <ComplaintCounter 
                color="#FCB90D"
                complaintCount={900}
                title={language == 'pt-BR'? "Trânsito" : "Traffic"}
              />
            </View>
            <View style={{
              flexDirection: 'row',
              marginBottom: '5%'
            }}>
              <ComplaintCounter 
                color="#A3B7FF"
                complaintCount={344}
                title={language == 'pt-BR'? "Esgoto" : "Sewage"}
                />
              <ComplaintCounter 
                color="rgba(39, 194, 0, 0.55)"
                complaintCount={124}
                title={language == 'pt-BR'? "Animais" : "Animals"}
              />
              <ComplaintCounter 
                color="#FCB90D"
                complaintCount={30}
                title={language == 'pt-BR'? "Trânsito" : "Traffic"}
              />
            </View>
            <View style={{
              flexDirection: 'row',
              marginBottom: '5%'
            }}>
              <ComplaintCounter 
                color="#A3B7FF"
                complaintCount="999..."
                title={language == 'pt-BR'? "Iluminação" : "Street lighting"}
              />
              <ComplaintCounter 
                color="rgba(39, 194, 0, 0.55)"
                complaintCount={771}
                title={language == 'pt-BR'? "Meio Ambiente" : "Environment"}
              />
              <ComplaintCounter 
                color="#FCB90D"
                complaintCount={545}
                title={language == 'pt-BR'? "Trânsito" : "Traffic"}
              />
            </View>
          </View>
        </Animatable.View>
      </ImageBackground>
    </ScrollView>
  );
}

export { MainPage };
