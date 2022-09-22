import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ScreenOrientation from 'expo-screen-orientation';   
import { useAuth } from "../../context/AuthContext";

import { styles } from "./styles";


const Menu = () => {
    const { user, signOut } = useAuth();
    const navigation = useNavigation();

    const [toggled, setToggled] = useState(false);

    const [orientationIsLandscape,setOrientation] = useState(true);

    async function changeScreenOrientation(){
        if(orientationIsLandscape==true){
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        }
        else{
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        }
    }

    const toggleOrientation = () => {
        setOrientation(!orientationIsLandscape);
        changeScreenOrientation();
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.menuButton}
                onPressIn={() => setToggled(prevState => !prevState)}
            >
                <Image 
                    style={styles.menuIcon} 
                    source={require("../../assets/menu-icon.png")} 
                />
            </TouchableOpacity>
            <View 
                style={{
                    display: toggled? "flex" : "none",
                    position: "absolute",
                    width: "80%",
                    height: "100%",
                    backgroundColor: "#ECECEC",
                    zIndex: 1
                }}
            >
                <View style={styles.menuHeader}>
                    <Image 
                        style={styles.userAvatar} 
                        source={{uri: user.avatar}} 
                    />
                    <View style={styles.menuHeaderTextContainer}>
                        <Text style={styles.menuHeaderText}>
                            Bem vindo(a)
                        </Text>
                        <Text style={styles.menuHeaderText}>
                            {user.firstName} {user.lastName}
                        </Text>
                    </View>
                </View>
                <View>
                    <View style={styles.menuHeaderLinksContainer}>
                        <TouchableOpacity 
                            style={styles.menuHeaderLinkContainer}
                            onPressIn={() => navigation.navigate("MainPage")}
                        >
                            <Image 
                                style={styles.menuHeaderLinkIcon} 
                                source={require("../../assets/home.png")} 
                            />
                            <Text style={styles.menuHeaderLinkText}>
                                Home
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.menuHeaderLinkContainer}
                            onPressIn={() => navigation.navigate("CreateQueixa")}
                            >
                            <Image 
                                style={styles.menuHeaderLinkIcon}
                                source={require("../../assets/adicionar-reclamacao.png")} 
 
                                />
                            <Text style={styles.menuHeaderLinkText}>
                                Nova Reclamação
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.menuHeaderLinkContainer}
                            onPressIn={() => navigation.navigate("Feed")}
                        >
                            <Image 
                                style={styles.menuHeaderLinkIcon}
                                source={require("../../assets/feed-rss.png")} 
                            />
                            <Text style={styles.menuHeaderLinkText}>
                                Reclamações
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuHeaderLinkContainer}>
                            <Image 
                                style={styles.menuHeaderLinkIcon} 
                                source={require("../../assets/bulb-10.png")} 
                            />
                            <Text style={styles.menuHeaderLinkText}>
                                Favoritos
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuHeaderLinkContainer}>
                            <Image 
                                style={styles.menuHeaderLinkIcon}
                                source={require("../../assets/suporte-tecnico.png")} 
                            />
                            <Text style={styles.menuHeaderLinkText}>
                                Suporte
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuHeaderLinkContainer} onPress={toggleOrientation}>
                            <Image 
                                style={styles.menuHeaderLinkIcon}
                                source={require("../../assets/rotation.png")} 
                            />
                            <Text style={styles.menuHeaderLinkText}>
                                Orientation
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.menuHeaderLinkContainer}
                            onPressIn={() => signOut()}
                        >
                            <Image 
                                style={styles.menuHeaderLinkIcon}
                                source={require("../../assets/exit-door.jpg")} 
                            />
                            <Text style={styles.menuHeaderLinkText}>
                                Sair
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

export { Menu };
