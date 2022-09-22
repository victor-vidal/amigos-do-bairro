import React, { useState } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";

import { useAuth } from "../../context/AuthContext";
import { useLang } from "../../context/LanguageContext";

import { styles } from "./styles";


const Menu = () => {
    const { user, signOut } = useAuth();
    const { language, changeLanguage } = useLang();
    const navigation = useNavigation();

    const [toggled, setToggled] = useState(false);

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
                            {language == 'pt-BR'? "Bem vindo(a)" : "Welcome"}
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
                                {language == 'pt-BR'? "Nova Reclamação" : "New Complaint"}
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
                                {language == 'pt-BR'? "Reclamações" : "Complaints"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuHeaderLinkContainer}>
                            <Image 
                                style={styles.menuHeaderLinkIcon} 
                                source={require("../../assets/bulb-10.png")} 
                            />
                            <Text style={styles.menuHeaderLinkText}>
                                {language == 'pt-BR'? "Favoritos" : "Favorites"}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuHeaderLinkContainer}>
                            <Image 
                                style={styles.menuHeaderLinkIcon}
                                source={require("../../assets/suporte-tecnico.png")} 
                            />
                            <Text style={styles.menuHeaderLinkText}>
                                {language == 'pt-BR'? "Suporte" : "Support"}
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
                                {language == 'pt-BR'? "Sair" : "Exit"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View 
                        style={{
                            marginTop: '20%',
                            justifyContent: 'center', 
                            width: '100%', 
                            alignItems: 'center'
                        }} 
                    >
                        <SelectDropdown 
                            buttonStyle={{backgroundColor: "white", borderWidth: 0.5}}
                            data={['pt-BR', 'en']}
                            defaultValue={language}
                            onSelect={(selectedItem, index) => changeLanguage(selectedItem)}
                            buttonTextAfterSelection={(selectedItem, index) => selectedItem}
                            rowTextForSelection={(item, index) => item}
                            buttonTextStyle={{ color: '#F47E51', fontSize: 18 }}
                            rowTextStyle={{ color: '#F47E51', fontSize: 18 }}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

export { Menu };
