import React, { useEffect } from "react";
import * as SplashScreen from 'expo-splash-screen';

import { useAuth } from "../context/AuthContext";

import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";


const Routes = () => {
    //#region HOOKS
    const { user, loading } = useAuth();
    //#endregion
    
    //#region USE EFFECTS
    useEffect(() => {
        SplashScreen.preventAutoHideAsync();
    });

    useEffect(() => {
        const handleLoading = async () => {
            if (!loading) await SplashScreen.hideAsync();
        }
        handleLoading();
    }, [loading]);

    return (
        user? <PrivateRoutes /> : <PublicRoutes />
    );
}

export { Routes };
