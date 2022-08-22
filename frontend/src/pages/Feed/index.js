import React, { useState, useMemo,useEffect } from 'react';
import { View, Text, FlatList,TouchableOpacity,Alert, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation, useRoute } from '@react-navigation/native';

import { apiUrl } from "../../utils/apiUrl.js";
import { fetchWithTimeout } from "../../utils/fetchWithTimeout.js";
import { getComplaintFeed } from "../../services/FeedService.js";

import { useAuth } from '../../context/AuthContext.js';

import { styles } from "./styles.js";


const Feed = () => {
//#region HOOKS
  const { token, userId } = useAuth();
  const navigation = useNavigation();
  //#endregion

  //#region 
  const [feed, setFeed] = useState([]);
  //#endregion

  const complaintFeedMemo = useMemo(async () => {
    const data = await getComplaintFeed(token);

    if (data) return data;

    Alert.alert("Falha na conexão", "Erro ao recolher as queixas do feed.");
  }, [token]);

  async function loadPage() {
    const memoData = await complaintFeedMemo;
    setFeed(memoData);
    
  }

  useEffect(()=>{
    loadPage();
  },[]);

  return (
    <View>
      <FlatList
        data={feed}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.postView}>
            <Text>{item.id}</Text>





            <Image style={styles.coverPhoto} source={{uri: `data:image/jpeg;base64,${item.image}`}}/>
          </View>
        )}
      />
    </View>
  );
}

export { Feed };
