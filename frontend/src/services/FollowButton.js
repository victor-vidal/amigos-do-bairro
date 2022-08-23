import React, { useState } from "react";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FollowButton = () => {
  const [following, setFollow] = useState(false);

  return (
    <Pressable onPress={() => setFollow((isFollowing) => !isFollowing)}>
      <MaterialCommunityIcons
        name={following ? "star" : "star-outline"}
        size={32}
        color={following ? "yellow" : "black"}
      />
    </Pressable>
  );
};
export { FollowButton };