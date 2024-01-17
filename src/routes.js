import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './pages/home';
import { Registered } from './pages/registered';

const Stack = createStackNavigator();

export function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="HOME"
                component={Home}
                options={{
                    headerShown: false,
                }}    
            />
            <Stack.Screen
                name="CADASTROS"
                component={Registered}
                options={{
                    headerShown: false,
                }}   
            />
        </Stack.Navigator>
    )
}