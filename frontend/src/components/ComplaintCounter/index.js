import React from "react";
import { View, Text, Image } from "react-native";

import { styles } from "./styles";


const ComplaintCounter = ({color, complaintCount, title}) => {
    return (
        <View style={styles.container}>
            <View style={{...styles.coloredContainer, ...{backgroundColor: color}}}>
                <Image
                    style={styles.image} 
                    source={require("../../assets/bulb-10.png")} 
                />
                <Text style={styles.complaintCountContainer}>
                    {complaintCount}
                </Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    );
}

export { ComplaintCounter };
