import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Icon, Input, Switch, Text } from "react-native-elements";
import { useAppContext } from "../hooks/context";
import api from "../utils/api";

const Sensor = () => {
  const [dataCadastro, setDataCadastro] = useState("");
  const [dataAtualizacao, setDataAtualizacao] = useState("");
  const [botaoAtivo, setBotaoAtivo] = useState(false);
  const [edicaoAtiva, setEdicaoAtiva] = useState(false);
  const [idEdicao, setIdEdicao] = useState(null);
  const [sensor, setSensor] = useState([]);

  const { token } = useAppContext();

  const handleError = (error, message) => {
    console.error(`${message}:`, error);
    Alert.alert(message, error.message || "Erro desconhecido");
  };

  const handleSave = async () => {
    try {
      if (edicaoAtiva) {
        const response = await api.put(`sensor/${idEdicao}`, {
          dataCadastro,
          dataAtualizacao,
          botaoAtivo,
        });
        const { status } = response;

        if (status === 200) {
          const temp = [...sensor];
          const index = temp.findIndex((item) => item.sensor_id === idEdicao);
          temp[index] = response.data;
          setEdicaoAtiva(false);
          setIdEdicao(null);
          getSensor();
          Alert.alert("Sensor atualizado com sucesso!");
        } else {
          throw new Error(`Erro ao atualizar sensor. Status: ${status}`);
        }
      } else {
        const response = await api.post("sensor", {
          dataCadastro,
          dataAtualizacao,
          botaoAtivo,
        });
        const { status } = response;

        if (status === 201) {
          getSensor();
          Alert.alert("Sensor adicionado com sucesso!");
        } else {
          throw new Error("Erro ao salvar sensor");
        }
      }

      setDataCadastro("");
      setDataAtualizacao("");
      setBotaoAtivo(false);
    } catch (error) {
      handleError(error, "Erro ao salvar dados do sensor");
    }
  };

  const handleEdit = async (sensor_id) => {
    try {
      const response = await api.get(`sensor/${sensor_id}`);
      const { status } = response;

      if (status === 200) {
        const itemParaEdicao = response.data;
        setEdicaoAtiva(true);
        setIdEdicao(sensor_id);
        setDataCadastro(itemParaEdicao.dataCadastro);
        setDataAtualizacao(itemParaEdicao.dataAtualizacao);
        setBotaoAtivo(itemParaEdicao.botaoAtivo);
      } else {
        throw new Error(
          `Erro ao carregar os dados do sensor para edição. Status: ${status}`
        );
      }
    } catch (error) {
      handleError(error, "Erro ao carregar dados do sensor para edição");
    }
  };

  const handleDelete = async (sensor_id) => {
    try {
      const response = await api.delete(`/sensor/${sensor_id}`);
      const { status } = response;

      if (status === 204) {
        const temp = sensor.filter((_, index) => index !== sensor_id);
        setSensor(temp);
        getSensor();
        Alert.alert("Sensor excluído com sucesso!");
      } else {
        throw new Error(`Erro ao excluir sensor. Status: ${status}`);
      }
    } catch (error) {
      handleError(error, "Erro ao excluir sensor");
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

      {token ? (
        <>
          <Card containerStyle={styles.mainCard}>
            <Input
              placeholder="Data de Cadastro"
              label="Data de Cadastro"
              onChangeText={setDataCadastro}
              value={dataCadastro}
              labelStyle={styles.label}
              containerStyle={styles.inputContainer}
            />
            <Input
              placeholder="Data de Atualização"
              label="Data de Atualização"
              onChangeText={setDataAtualizacao}
              value={dataAtualizacao}
              labelStyle={styles.label}
              containerStyle={styles.inputContainer}
            />
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Ativo</Text>
              <Switch
                value={botaoAtivo}
                onValueChange={() => setBotaoAtivo(!botaoAtivo)}
                color="#3498db"
              />
            </View>
            <Button
              title={edicaoAtiva ? "Atualizar" : "Adicionar"}
              onPress={handleSave}
              buttonStyle={styles.button}
            />
          </Card>

          <ScrollView style={styles.cardListContainer}>
            {sensor?.map((item) => (
              <Card key={item.sensor_id} style={styles.smallCard}>
                <Input
                  placeholder="Data de Cadastro"
                  label="Data de Cadastro"
                  value={item.dataCadastro}
                  disabled={!edicaoAtiva}
                  labelStyle={styles.label}
                  inputStyle={styles.inputText}
                />
                <Input
                  placeholder="Data de Atualização"
                  label="Data de Atualização"
                  value={item.dataAtualizacao}
                  disabled={!edicaoAtiva}
                  labelStyle={styles.label}
                  inputStyle={styles.inputText}
                />
                <View style={styles.switchContainerSmall}>
                  <Text>Ativo: {item.botaoAtivo === true ? "Sim" : "Não"}</Text>
                </View>
                {!edicaoAtiva && (
                  <View style={styles.iconContainer}>
                    <Icon
                      style={styles.iconBox}
                      name="pencil"
                      type="font-awesome"
                      color="#3498db"
                      onPress={() => handleEdit(item.sensor_id)}
                    />
                    <Icon
                      style={styles.iconBox}
                      name="trash"
                      type="font-awesome"
                      color="#e74c3c"
                      onPress={() => handleDelete(item.sensor_id)}
                    />
                  </View>
                )}
              </Card>
            ))}
          </ScrollView>
        </>
      ) : (
        <View>
          <Text style={styles.text}>Por favor, faça seu login...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  inputContainer: {
    width: 175,
  },
  mainCard: {
    width: "90%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  label: {
    color: "#000000",
    marginBottom: 5,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  switchLabel: {
    marginRight: 10,
  },
  switchContainerSmall: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#3498db",
    marginTop: 10,
  },
  cardListContainer: {
    width: "90%",
    height: "50%",
    marginTop: 10,
  },
  smallCard: {
    width: "100%",
    height: 120,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  iconContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
  },
  iconBox: {
    padding: 5,
    marginRight: 5,
  },
  inputText: {
    color: "#000000",
  },
  text: {
    fontSize: 30,
    color: "#000000",
    fontWeight: "bold",
  },
});

export default Sensor;
