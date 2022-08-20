import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as authService from "../services/AuthService";
import * as userService from "../services/UserService";


const AuthContext = createContext({
    token: null,
    loading: true,
    signIn: () => {},
    signOut: () => {},
    userId: ""
});


// Implementation based on: https://blog.rocketseat.com.br/autenticacao-no-react-native-reactjs-com-context-api-hooks/
const AuthProvider = (props) => {
    //#region STATES/VARIABLES
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(true);
    //#endregion

    //#region USE EFFECTS
    useEffect(() => {
        const loadStorageData = async () => {
            const storagedToken = await AsyncStorage.getItem("@RNAuth:token");
            const storagedUserId = await AsyncStorage.getItem("@RNAuth:userId");

            if (storagedToken && storagedUserId) {
                setToken(storagedToken);
                setUserId(storagedUserId);
            } else {
                setToken(null);
            }

            setLoading(false);
        }

        loadStorageData();
    });
    //#endregion

    //#region FUNCTIONS
    const signIn = async (username, password) => {
        const response = await authService.signIn(username, password);

        if (response) {
            setToken(response.access_token);
            setUserId(response.user_id);
            await AsyncStorage.setItem("@RNAuth:token", response.access_token);
            await AsyncStorage.setItem("@RNAuth:userId", response.user_id);

            return true;
        }
        return false;
    }

    const signOut = async () => {
        await AsyncStorage.clear();
        setToken(null);
    }
    //#endregion

    return (
        <AuthContext.Provider
            value={{ token, loading, signIn, signOut, userId }}
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