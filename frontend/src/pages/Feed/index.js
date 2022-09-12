import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Image, TouchableWithoutFeedback } from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { getComplaintFeed } from "../../services/ComplaintService";
import { LikeButton } from '../../services/LikeButton.js';
import { FollowButton } from '../../services/FollowButton.js';

import { Menu } from '../../components/Menu';

import { useAuth } from '../../context/AuthContext.js';

import { styles } from "./styles.js";


const Feed = () => {
  //#region HOOKS
  const { user } = useAuth();
  const navigation = useNavigation();
  //#endregion

  //#region 
  const [feed, setFeed] = useState([]);
  const [state_liked, setState] = useState([]);
  //#endregion

  const complaintFeedMemo = useMemo(async () => {
    const data = await getComplaintFeed();

    if (data) return data;

    Alert.alert("Falha na conexão", "Erro ao recolher as queixas do feed.");
  }, [user]);

  async function loadPage() {
    const memoData = await complaintFeedMemo;
    setFeed(memoData);
  }

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <View style={styles.container} >
      <Menu />
      <View>


      </View>

      <View>
      </View>

      <View>
        <FlatList
          data={feed}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.postView}>
              <Text>{item.id}</Text>


              <Image style={styles.coverPhoto} source={{ uri: `data:image/jpeg;base64,${item.image}` }} />
              <View>
                <LikeButton />
                <FollowButton />
              </View>
            </View>
          )}
        />

      </View>
    </View>
  );
}

export { Feed };
