import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { apiUrl } from '../../utils/apiUrl.js';
import { fetchWithTimeout } from '../../utils/fetchWithTimeout.js';
import { styles } from "./styles.js";

//UPLOAD IMAGE
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Axios from "axios";

//DROPDOWNLIST
import SelectDropdown from 'react-native-select-dropdown'
const countries = ["Egypt", "Canada", "Australia", "Ireland"]

//DATA FROM API
// const [isLoading, setLoading] = useState(true);
// const [apiData, setData] = useState([]);

// const getData = async () => {
//   try {
//     const response = await fetch(`${apiUrl}/categories`);
//     const json = await response.json();
//     setData(json);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     setLoading(false);
//   }
// }

// useEffect(() => {
//   getData();
// }, []);


const CreateQueixa = () => {
  const [queixa, queixaInput] = useState("");

  const navigation = useNavigation();


  //REQUEST
  const handleSubmit = async () => {
    try {
      const response = await fetchWithTimeout(`${apiUrl}/auth/create_recovery_number`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: SON.stringify({
          "email": queixa,
        })
      });

      if (response.ok) {
        const data = await response.json();
        navigation.navigate("MainPage");
      } else {
        Alert.alert("Falha no login", "Credenciais inválidas");
      }
    } catch (error) {
      console.log(error);
    }
  }

  //UPLOAD IMAGE
  const [avatar, setAvatar] = useState();

  async function imagePickerCall() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== "granted") {
        alert("Nós precisamos dessa permissão.");
        return;
      }
    }

    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All
    });

    if (data.cancelled) {
      return;
    }

    if (!data.uri) {
      return;
    }

    setAvatar(data);
  }

  async function uploadImage() {
    const data = new FormData();

    data.append("avatar", {
      uri: avatar.uri,
      type: avatar.type
    });

    await Axios.post("${apiUrl}/files", data);
  }

  return (
    <View style={styles.container}>
      <Animatable.View
        animation={"fadeInLeft"}
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>
          Crie sua Queixa aqui
        </Text>
      </Animatable.View>

      <Animatable.View
        animation={"fadeInUp"}
        delay={500}
        style={styles.containerForm}
      >
        <Text style={styles.title}>Foto da queixa</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={imagePickerCall}
        >
          <Text style={styles.buttonText}>Inserir Imagem</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Descrição da queixa</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder='Descreva sua queixa..'
          style={styles.input}
          onChangeText={queixaInput => setEmail(queixaInput)}
        />

        <Text style={styles.title}>Tipo de queixa</Text>
        <SelectDropdown
          data={countries}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MainPage')}
        //onPress={() => handleSubmit()}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

export { CreateQueixa };