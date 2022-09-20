import React, { useState, useMemo, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Alert, 
  Image, 
  TouchableWithoutFeedback, 
  ImageBackground, 
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import SelectDropdown from "react-native-select-dropdown";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { getComplaintFeed } from "../../services/ComplaintService";
import { LikeButton } from '../../services/LikeButton.js';
import { FollowButton } from '../../services/FollowButton.js';

import { Menu } from '../../components/Menu';
import { getComplaintCategories } from "../../services/ComplaintCategoryService.js";
import { useAuth } from '../../context/AuthContext.js';

import { styles } from "./styles.js";
import CheckBox from 'react-native-check-box';


const Feed = () => {
  //#region HOOKS
  const { user } = useAuth();
  const navigation = useNavigation();
  //#endregion

  //#region 
  const [feed, setFeed] = useState([]);
  const [feedDisplay, setFeedDisplay] = useState([]);
  const [state_liked, setState] = useState([]);
  const [statusQueixa, setStatusQueixa] = useState([]);
  const [categoryIdList, setCategoryIdList] = useState([]);
  const [categoryNameList, setCategoryNameList] = useState([]);
  const [myComplaintsFlag, setMyComplaintsFlag] = useState(false);  
  //#endregion

  const complaintFeedMemo = useMemo(async () => {
    const data = await getComplaintFeed();

    if (data) return data;

    Alert.alert("Falha na conexão", "Erro ao recolher as queixas do feed.");
  }, []);

  const complaintCategoryMemo = useMemo(async () => {
    const data = await getComplaintCategories();

    if (data) return data;

    Alert.alert("Falha na conexão", "Erro ao recolher categorias de queixas.");
  }, []);

  async function loadPage() {
    const memoData = await complaintFeedMemo;
    setFeed(memoData);
    setFeedDisplay(memoData);
    memoData.resolved ? setStatusQueixa("Resolvido") : setStatusQueixa("Não resolvido")
  }

  function resolved(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <Text>Resolvido</Text>;
    }
    return <Text>Não Resolvido</Text>;
  }

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
    loadPage();
  }, [])

  useEffect(() => {
    if (!myComplaintsFlag) {
      setFeedDisplay(feed);
      return;
    }

    setFeedDisplay(feed.filter(item => item.owner == user.email));
  }, [myComplaintsFlag]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Menu style={styles.menu} />
            <ImageBackground
              source={require('../../assets/mainPage.png')}
              resizeMode="cover"
              style={styles.image}
            >
              <View style={styles.containerHeader}>
                <Text style={styles.titleWelcome}>Bem Vindo(a)</Text>
                <Text style={styles.text}>{user.firstName} {user.lastName}!</Text>
                <Text style={styles.titleWelcome}> Feed</Text>
                <SelectDropdown
                  data={categoryNameList}
                  onSelect={(selectedItem, index) => { setSelectedCategoryId(categoryIdList[index]); }}
                  buttonTextAfterSelection={(selectedItem, index) => { return selectedItem }}
                  rowTextForSelection={(item, index) => { return item }}
                  
                />
                <CheckBox 
                  style={{ marginTop: 10, marginBottom: 10 }}
                  isChecked={myComplaintsFlag}
                  onClick={() => setMyComplaintsFlag(prevState => !prevState)} 
                  rightText="Filtrar por minhas queixas"
                  rightTextStyle={{ color: '#F47E51', fontSize: 18 }}
                />
              </View>
              <View style={styles.flatList}>

                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={feedDisplay}
                  keyExtractor={item => String(item.id)}
                  renderItem={({ item }) => (
                    <View style={styles.postView}>

                      {item.resolved ? <Text style={styles.resolvido}>Resolvida!</Text> : <Text style={styles.nResolvido}>Não resolvida...</Text>}
                      <Image style={styles.coverPhoto} source={{ uri: `data:image/jpeg;base64,${item.image}` }} />
                      <View style={styles.twoButton}>
                        <LikeButton />
                        <FollowButton />
                      </View>

                    </View>
                  )}
                />
              </View>
            </ImageBackground>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

export { Feed };
