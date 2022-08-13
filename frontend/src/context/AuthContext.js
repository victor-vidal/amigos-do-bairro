import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as authService from "../services/AuthService";
import * as userService from "../services/UserService";


const AuthContext = createContext({
    token: null,
    loading: true,
    signIn: () => {},
    signOut: () => {},
    user: { id: "", email: "" }
});


// Implementation based on: https://blog.rocketseat.com.br/autenticacao-no-react-native-reactjs-com-context-api-hooks/
const AuthProvider = (props) => {
    //#region STATES/VARIABLES
    const [token, setToken] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    //#endregion

    //#region USE EFFECTS
    useEffect(() => {
        const loadStorageData = async () => {
            const storagedToken = await AsyncStorage.getItem("@RNAuth:token");
            const currentUser = await userService.getCurrentUser(storagedToken);

            if (storagedToken && currentUser) {
                setToken(storagedToken);
                setUser(currentUser);
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
            setUser(response.user);
            await AsyncStorage.setItem("@RNAuth:token", response.access_token);

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
            value={{ token, loading, signIn, signOut, user }}
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