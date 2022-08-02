import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Welcome } from '../pages/Welcome';
import { SignIn } from '../pages/SignIn';
import { Register } from '../pages/Register';
import { MainPage } from '../pages/MainPage';
import { ForgotPassword } from '../pages/ForgotPassword';
import { CheckForgotPassword } from '../pages/CheckForgotPassword';
import { RedefinePassword } from '../pages/RedefinePassword';
import { CreateQueixa } from '../pages/CreateQueixa';

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CreateQueixa"
                component={CreateQueixa}
                options={{ headerShown: false }}
            />
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
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="RedefinePassword"
                component={RedefinePassword}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CheckForgotPassword"
                component={CheckForgotPassword}
                options={{ headerShown: false }}
            />
            

        </Stack.Navigator>
    )
}

export { Routes };