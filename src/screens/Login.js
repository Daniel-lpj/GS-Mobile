import React, { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import api from "../utils/api";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = () => {
    navigation.navigate("Cadastro");
  };

  const handleLogin = async () => {
    const obj = {
      email: email,
      senha: senha,
    };

    try {
      const response = await api.post("/login", obj);

      if (response.status === 200) {
        Alert.alert("Login bem-sucedido!");
        navigation.navigate("Sensor");
      } else {
        Alert.alert("Falha no login. Verifique sua senha.");
      }
    } catch (error) {
      console.error("Erro ao fazer o login:", error);
      Alert.alert("Erro ao fazer o login. Tente novamente mais tarde.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/ImageBackground.jpg")}
        style={styles.backgroundImage}
      />
      <Input
        placeholder="Email"
        leftIcon={{ type: "font-awesome", name: "envelope" }}
        onChangeText={setEmail}
        value={email}
        containerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
      />
      <Input
        placeholder="Senha"
        leftIcon={{ type: "font-awesome", name: "lock" }}
        secureTextEntry
        onChangeText={setSenha}
        value={senha}
        containerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
      />
      <View>
        <Button
          title="Entrar"
          onPress={handleLogin}
          buttonStyle={styles.button}
        />
        <Button
          title="Cadastre-se"
          onPress={handleCadastro}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  inputContainer: {
    marginVertical: 10,
    width: "80%",
  },
  inputText: {
    color: "#000000",
  },
  button: {
    backgroundColor: "#3498db",
    marginTop: 10,
  },
});

export default Login;
