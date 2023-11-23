import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContextProvider from "./src/hooks/context";
import Cadastro from "./src/screens/Cadastro";
import Login from "./src/screens/Login";
import Sensor from "./src/screens/Sensor";
import TelaPrincipal from "./src/screens/TelaPrincipal";
import TelaSecundaria from "./src/screens/TelaSecundaria";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Tela"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Sensor" component={Sensor} />
          <Stack.Screen name="Tela" component={TelaPrincipal} />
          <Stack.Screen name="Tela2" component={TelaSecundaria} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
