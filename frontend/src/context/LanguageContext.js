import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from 'expo-localization';


const LanguageContext = createContext({
    language: 'pt-BR',
    changeLanguage: (language) => {}
});

const LanguageProvider = (props) => {
    const [language, setLanguage] = useState('pt-BR');

    useEffect(() => {
        const loadStorageData = async () => {
            const storagedLanguage = await AsyncStorage.getItem("@RNAuth:language");

            if (storagedLanguage) {
                setLanguage(storagedLanguage);
            } else {
                setLanguage(Localization.locale);
            }
        }

        loadStorageData();
    });

    const changeLanguage = async (language) => {
        await AsyncStorage.setItem("@RNAuth:language", language);
        setLanguage(language);
    }

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {props.children}
        </LanguageContext.Provider>
    );
}

const useLang = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('useLang must be used within an LanguagueProvider');
    }

    return context;
}

export { LanguageContext, LanguageProvider, useLang };
