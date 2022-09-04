import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getUsers } from "../services/UserService";


const AuthContext = createContext({
    user: null,
    loading: true,
    signIn: () => {},
    signOut: () => {},
});


// Implementation based on: https://blog.rocketseat.com.br/autenticacao-no-react-native-reactjs-com-context-api-hooks/
const AuthProvider = (props) => {
    //#region STATES/VARIABLES
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    //#endregion

    //#region USE EFFECTS
    useEffect(() => {
        const loadStorageData = async () => {
            const storagedUser = await AsyncStorage.getItem("@RNAuth:user");

            if (storagedUser) {
                setUser(JSON.parse(storagedUser));
            } else {
                setUser(null);
            }

            setLoading(false);
        }

        loadStorageData();
    });
    //#endregion

    //#region FUNCTIONS
    const signIn = async (username, password) => {
        getUsers().then(async response => {
            if (!response) {
                alert("Failed to get users");
                return;
            }

            const user = response.find(
                (user) => user.email == username && user.password == password
            );

            if (!user) {
                alert("Credenciais inválidas");
                return;
            };

            await AsyncStorage.setItem("@RNAuth:user", JSON.stringify(user));
            setUser(user);
        });
    }

    const signOut = async () => {
        await AsyncStorage.clear();
        setToken(null);
    }
    //#endregion

    return (
        <AuthContext.Provider
            value={{ user, signIn, signOut }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}


const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider.");
    }

    return context;
}


export { AuthContext, AuthProvider, useAuth };