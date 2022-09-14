import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";

// UPLOAD IMAGE
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import * as Location from "expo-location";

import { Menu } from "../../components/Menu/index.js";

import { useAuth } from "../../context/AuthContext.js";

import { getComplaintCategories } from "../../services/ComplaintCategoryService.js";
import { postComplaint } from "../../services/ComplaintService.js";

import { styles } from "./styles.js";


//DROPDOWNLIST

const CreateQueixa = () => {
  //#region HOOKS
  const { user } = useAuth();
  const navigation = useNavigation();
  //#endregion

  //#region STATES/VARIABLES
  // Geolocation info
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);
  // Complaint category ids
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categoryIdList, setCategoryIdList] = useState([]);
  // Complaint category names
  const [categoryNameList, setCategoryNameList] = useState([]);
  const [description, setDescription] = useState("");
  // UPLOAD IMAGE
  const [picture, setPicture] = useState("");
  //#endregion

  //#region MEMOS
  const complaintCategoryMemo = useMemo(async () => {
    const data = await getComplaintCategories();

    if (data) return data;

    Alert.alert("Falha na conexão", "Erro ao recolher categorias de queixas.");
  }, []);
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
  /**
   * Get the current geolocation
   * @returns {boolean} True if geolocation was successfully acquired or false 
   * otherwise
   */ 
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão de Localização negada, não é possível prosseguir");
      return false;
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
    setCurrentLatitude(location.coords.latitude);
    setCurrentLongitude(location.coords.longitude);

    return true;
  };

  const handleComplaintSubmission = async () => {
    try {

      // Getting complaint location
      if (!(await getLocation())) return;
      if (!currentLatitude || !currentLongitude) {
        alert("Não foi possível localizar, por favor tente novamente.");
        return;
      }

      const response = await postComplaint({
        "owner": user.email,
        "title": description,
        "latitude": currentLatitude,
        "longitude": currentLongitude,
        "image": picture
      });

      if (response) {
        navigation.navigate("MainPage");
      } else {
        Alert.alert("Falha na criação");
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true
    });

    if (data.cancelled) {
      return;
    }

    if (!data.uri) {
      return;
    }

    setPicture(data.base64);
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true
    });

    if (data.cancelled) {
      return;
    }

    if (!data.uri) {
      return;
    }

    setPicture(data.base64);
  }
  //#endregion

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Menu />
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
                onChangeText={queixaInput => setDescription(queixaInput)}
              />

              <Text style={styles.title}>Tipo de queixa</Text>
              <SelectDropdown
                data={categoryNameList}
                onSelect={(selectedItem, index) => {
                  setSelectedCategoryId(categoryIdList[index]);
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
                // disabled={!description || !picture || !selectedCategoryId}
                onPress={() => handleComplaintSubmission()}
              >
                <Text style={styles.buttonText}>Criar</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export { CreateQueixa };