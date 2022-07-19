import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Welcome } from '../pages/Welcome';
import { SignIn } from '../pages/SignIn';
import { Register } from '../pages/Register';
import { MainPage } from '../pages/MainPage';


const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MainPage"
                component={MainPage}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}

export { Routes };