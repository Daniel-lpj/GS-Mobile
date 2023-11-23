import React, { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import api from "../utils/api";

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = async () => {
    const obj = {
      nome: nome,
      email: email,
      senha: senha,
    };

    try {
      const response = await api.post("/registrar", obj);

      if (response.status === 201) {
        Alert.alert("Cadastro bem-sucedido!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Falha no cadastro. Verifique seus dados.");
      }
    } catch (error) {
      console.error("Erro ao fazer o cadastro:", error);
      Alert.alert("Erro ao fazer o cadastro. Tente novamente mais tarde.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/ImageBackground.jpg")}
        style={styles.backgroundImage}
      />
      <Input
        placeholder="Nome"
        leftIcon={{ type: "font-awesome", name: "user" }}
        onChangeText={setNome}
        value={nome}
        containerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
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
      <Button
        title="Cadastrar"
        onPress={handleCadastro}
        buttonStyle={styles.button}
      />
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
    backgroundColor: "#3498ba",
    marginTop: 10,
  },
});

export default Cadastro;
