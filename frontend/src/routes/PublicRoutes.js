import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Welcome } from "../pages/Welcome";
import { SignIn } from "../pages/SignIn";
import { Register } from "../pages/Register";
import { ForgotPassword } from "../pages/ForgotPassword";
import { RedefinePassword } from "../pages/RedefinePassword";
import { CheckForgotPassword } from "../pages/CheckForgotPassword";


const PublicStack = createNativeStackNavigator();

// Routes that don't require authentication
const PublicRoutes = () => {
    return (
        <PublicStack.Navigator>
            <PublicStack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
            />
            <PublicStack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
            />
            <PublicStack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
            <PublicStack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{ headerShown: false }}
            />
            <PublicStack.Screen
                name="RedefinePassword"
                component={RedefinePassword}
                options={{ headerShown: false }}
            />
            <PublicStack.Screen
                name="CheckForgotPassword"
                component={CheckForgotPassword}
                options={{ headerShown: false }}
            />
        </PublicStack.Navigator>
    );
};

export { PublicRoutes };
