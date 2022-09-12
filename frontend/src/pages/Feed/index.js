import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Image, TouchableWithoutFeedback } from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import { getComplaintFeed } from "../../services/ComplaintService";
import { LikeButton } from '../../services/LikeButton.js';
import { FollowButton } from '../../services/FollowButton.js';

import { useAuth } from '../../context/AuthContext.js';

import { styles } from "./styles.js";


const Feed = () => {
  //#region HOOKS
  const { user } = useAuth();
  const navigation = useNavigation();
  //#endregion

  //#region 
  const [feed, setFeed] = useState([]);
  const [statusQueixa, setStatusQueixa] = useState([]);
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
    memoData.resolved? setStatusQueixa("Resolvido"):setStatusQueixa("Não resolvido")
  }

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <View>

      <View>
        <FlatList
          data={feed}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View>

              <Text>{statusQueixa}</Text>
              <Image style={styles.coverPhoto} source={{ uri: `data:image/jpeg;base64,${item.image}` }} />
              <View style={styles.twoButton}>
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
