import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ContextProvider } from "./src/hooks/context";
import Cadastro from "./src/screens/Cadastro";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Sensor from "./src/screens/Sensor";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          <Stack.Screen name="Sensor" component={Sensor} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
