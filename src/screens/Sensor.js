import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { Button, Card, Input, Switch } from "react-native-elements";
import api from "../utils/api";

const Sensor = () => {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [ativo, setAtivo] = useState(false);
  const [sensor, setSensor] = useState([]);

  const handleError = (error, message) => {
    console.error(`${message}:`, error);
    Alert.alert(message, error.message || "Erro desconhecido");
  };

  const handleSaveSensor = async () => {
    const obj = {
      dataInicio: dataInicio,
      dataFim: dataFim,
      ativo: ativo,
    };

    try {
      const response = await api.post("/sensor", obj);
      const { status } = response;

      if (status === 201) {
        getSensor();
        Alert.alert("Sensor adicionado com sucesso!");
      } else {
        throw new Error(`Falha ao adicionar sensor. Status: ${status}`);
      }
    } catch (error) {
      handleError(
        error,
        "Erro ao adicionar sensor. Tente novamente mais tarde."
      );
    }
  };

  const getSensor = async () => {
    try {
      const response = await api.get("/sensor");
      const { status, data } = response;

      if (status === 200) {
        setSensor(data);
      } else {
        throw new Error("Erro ao buscar lista de sensores");
      }
    } catch (error) {
      handleError(error, "Erro ao buscar lista de sensores");
    }
  };

  useEffect(() => {
    getSensor();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/ImageBackground.jpg")}
        style={styles.backgroundImage}
      />
      {!sensor ? (
        sensor?.map((item, index) => (
          <Card key={index} containerStyle={styles.cardContainer}>
            <Input
              disabled
              placeholder="Data de Início"
              label="Data de Início"
              value={item?.dataInicio}
              leftIcon={{ type: "font-awesome", name: "calendar" }}
              labelStyle={styles.label}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputText}
            />
            <Input
              disabled
              placeholder="Data de Fim"
              label="Data de Fim"
              value={item?.dataInicio}
              leftIcon={{ type: "font-awesome", name: "calendar" }}
              labelStyle={styles.label}
              containerStyle={styles.inputContainer}
              inputStyle={styles.inputText}
            />
            <View style={styles.switchContainer}>
              <Switch value={item?.ativo} color="#3498db" />
            </View>
          </Card>
        ))
      ) : (
        <Card containerStyle={styles.cardContainer}>
          <Input
            placeholder="Data de Início"
            label="Data de Início"
            onChangeText={setDataInicio}
            value={dataInicio}
            leftIcon={{ type: "font-awesome", name: "calendar" }}
            labelStyle={styles.label}
            containerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
          />
          <Input
            placeholder="Data de Fim"
            label="Data de Fim"
            onChangeText={setDataFim}
            value={dataFim}
            leftIcon={{ type: "font-awesome", name: "calendar" }}
            labelStyle={styles.label}
            containerStyle={styles.inputContainer}
            inputStyle={styles.inputText}
          />
          <View style={styles.switchContainer}>
            <Switch
              value={ativo}
              onValueChange={() => setAtivo(!ativo)}
              color="#3498db"
            />
          </View>
          <Button
            title="Salvar"
            onPress={handleSaveSensor}
            buttonStyle={styles.button}
          />
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardContainer: {
    width: "50%",
    margin: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  label: {
    color: "#000000",
    marginBottom: 5,
  },
  inputContainer: {
    marginVertical: 10,
    width: "80%",
  },
  inputText: {
    color: "#000000",
  },
  switchContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#3498db",
    marginTop: 10,
  },
});

export default Sensor;
