import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Icon, Input, Switch, Text } from "react-native-elements";

const Sensor = () => {
  const [dataCadastro, setDataCadastro] = useState("");
  const [dataAtualizacao, setDataAtualizacao] = useState("");
  const [ativo, setAtivo] = useState(false);
  const [sensor, setSensor] = useState([
    {
      id: 1,
      dataCadastro: "01/01/2023",
      dataAtualizacao: "31/01/2023",
      ativo: true,
    },
    {
      id: 2,
      dataCadastro: "01/02/2023",
      dataAtualizacao: "28/02/2023",
      ativo: false,
    },
  ]);

  const [edicaoAtiva, setEdicaoAtiva] = useState(false);
  const [idEdicao, setIdEdicao] = useState(null);

  const handleSave = () => {
    if (edicaoAtiva) {
      const index = sensor?.findIndex((item) => item?.id === idEdicao);
      if (index !== -1) {
        const temp = [...sensor];
        temp[index] = {
          id: idEdicao,
          dataCadastro: dataCadastro,
          dataAtualizacao: dataAtualizacao,
          ativo: ativo,
        };
        setSensor(temp);
        setEdicaoAtiva(false);
        setIdEdicao(null);
      }
    } else {
      const novoItem = {
        id: sensor?.length + 1,
        dataCadastro: dataCadastro,
        dataAtualizacao: dataAtualizacao,
        ativo: ativo,
      };
      setSensor([...sensor, novoItem]);
    }

    setDataCadastro("");
    setDataAtualizacao("");
    setAtivo(false);
  };

  const handleEdit = (id) => {
    const itemParaEdicao = sensor?.find((item) => item?.id === id);
    if (itemParaEdicao) {
      setEdicaoAtiva(true);
      setIdEdicao(id);
      setDataCadastro(itemParaEdicao?.dataCadastro);
      setDataAtualizacao(itemParaEdicao?.dataAtualizacao);
      setAtivo(itemParaEdicao?.ativo);
    }
  };

  const handleDelete = (id) => {
    const temp = sensor?.filter((item) => item?.id !== id);
    setSensor(temp);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/ImageBackground.jpg")}
        style={styles.backgroundImage}
      />
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
            value={ativo}
            onValueChange={() => setAtivo(!ativo)}
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
          <Card key={item.id} style={styles.smallCard}>
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
              <Text>Ativo: {item.ativo ? "Sim" : "Não"}</Text>
            </View>
            {!edicaoAtiva && (
              <View style={styles.iconContainer}>
                <Icon
                  style={styles.iconBox}
                  name="pencil"
                  type="font-awesome"
                  color="#3498db"
                  onPress={() => handleEdit(item.id)}
                />
                <Icon
                  style={styles.iconBox}
                  name="trash"
                  type="font-awesome"
                  color="#e74c3c"
                  onPress={() => handleDelete(item.id)}
                />
              </View>
            )}
          </Card>
        ))}
      </ScrollView>
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
});

export default Sensor;
