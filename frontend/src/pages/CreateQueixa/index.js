import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation, useRoute } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";

// UPLOAD IMAGE
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Axios from "axios";

import { useAuth } from "../../context/AuthContext.js";

import { getComplaintCategories } from "../../services/ComplaintCategoryService.js";

import { apiUrl } from "../../utils/apiUrl.js";
import { fetchWithTimeout } from "../../utils/fetchWithTimeout.js";

import { styles } from "./styles.js";


//DROPDOWNLIST

const CreateQueixa = () => {
  //#region HOOKS
  const { token } = useAuth();
  const navigation = useNavigation();
  //#endregion

  //#region STATES/VARIABLES
  // Complaint category names
  const [categoryIdList, setCategoryIdList] = useState([]);
  const [categoryNameList, setCategoryNameList] = useState([]);
  const [queixa, queixaInput] = useState("");
  // UPLOAD IMAGE
  const [avatar, setAvatar] = useState();
  //#endregion

  //#region MEMOS
  const complaintCategoryMemo = useMemo(async () => {
    const data = await getComplaintCategories(token);

    if (data) return data;

    Alert.alert("Falha na conexão", "Erro ao recolher categorias de queixas.");
  }, [token]);
  //#endregion

  //#region USE EFFECTS
  useEffect(() => {
    const loadData = async () => {
      const memoData = await complaintCategoryMemo;
      setCategoryIdList(
        memoData.map(complaintCategory => complaintCategory.id)
      );
      setCategoryNameList(
        memoData.map(complaintCategory => complaintCategory.name)
      );
    }
    loadData();
  }, [])
  //#endregion

  //#region FUNCTIONS
  const handleComplaintSubmission = async () => {
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

  async function imagePickerCallC() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status !== "granted") {
        alert("Nós precisamos dessa permissão.");
        return;
      }
    }

    const data = await ImagePicker.launchCameraAsync({
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

  async function imagePickerCallG() {
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
  //#endregion

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
          onPress={imagePickerCallC}
        >
          <Text style={styles.buttonText}>Tirar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={imagePickerCallG}
        >
          <Text style={styles.buttonText}>Galeria</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Descrição da queixa</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Descreva sua queixa.."
          style={styles.input}
          onChangeText={queixaInput => setEmail(queixaInput)}
        />

        <Text style={styles.title}>Tipo de queixa</Text>
        <SelectDropdown
          data={categoryNameList}
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
        {/* <View style={styles.container}>
          {
            loading ? <Text>Loading ...</Text> :
            apiData.map((post) => (
              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>{post.id}</Text>
                <Text style={{ fontSize: 15, color: "blue" }} >{post.name}</Text>
              </View>
            ))
          }
        </View> */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MainPage")}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

export { CreateQueixa };