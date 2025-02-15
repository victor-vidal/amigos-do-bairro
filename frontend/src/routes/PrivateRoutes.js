import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MainPage } from "../pages/MainPage";
import { CreateQueixa } from "../pages/CreateQueixa";
import { Feed } from "../pages/Feed";
import { Queixa } from "../pages/Queixa";

const PrivateStack = createNativeStackNavigator();

// Routes that require authentication
const PrivateRoutes = () => {
    return (
        <PrivateStack.Navigator>
            <PrivateStack.Screen
                name="MainPage"
                component={MainPage}
                options={{ headerShown: false }}
            />
            <PrivateStack.Screen
                name="Feed"
                component={Feed}
                options={{ headerShown: false }}
            />
            <PrivateStack.Screen
                name="Queixa"
                component={Queixa}
                options={{ headerShown: false }}
            />
            <PrivateStack.Screen
                name="CreateQueixa"
                component={CreateQueixa}
                options={{ headerShown: false }}
            />
        </PrivateStack.Navigator>
    );
};

export { PrivateRoutes };
