import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Icon, Input, Switch, Text } from "react-native-elements";

const TelaPrincipal = () => {
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [ativo, setAtivo] = useState(false);
  const [listaDeDados, setListaDeDados] = useState([
    { id: 1, dataInicio: "01/01/2023", dataFim: "31/01/2023", ativo: true },
    { id: 2, dataInicio: "01/02/2023", dataFim: "28/02/2023", ativo: false },
    // Adicione mais itens conforme necessário
  ]);

  const [edicaoAtiva, setEdicaoAtiva] = useState(false);
  const [idEdicao, setIdEdicao] = useState(null);

  const handleSave = () => {
    if (edicaoAtiva) {
      // Lógica para editar um item existente
      const index = listaDeDados.findIndex((item) => item.id === idEdicao);
      if (index !== -1) {
        const novosDados = [...listaDeDados];
        novosDados[index] = { id: idEdicao, dataInicio, dataFim, ativo };
        setListaDeDados(novosDados);
        setEdicaoAtiva(false);
        setIdEdicao(null);
      }
    } else {
      // Lógica para adicionar um novo item
      const novoItem = {
        id: listaDeDados.length + 1,
        dataInicio,
        dataFim,
        ativo,
      };
      setListaDeDados([...listaDeDados, novoItem]);
    }

    // Limpar os campos de entrada após salvar
    setDataInicio("");
    setDataFim("");
    setAtivo(false);
  };

  const handleEdit = (id) => {
    // Ativar a edição e preencher os campos com os dados existentes
    const itemParaEdicao = listaDeDados.find((item) => item.id === id);
    if (itemParaEdicao) {
      setEdicaoAtiva(true);
      setIdEdicao(id);
      setDataInicio(itemParaEdicao.dataInicio);
      setDataFim(itemParaEdicao.dataFim);
      setAtivo(itemParaEdicao.ativo);
    }
  };

  const handleDelete = (id) => {
    // Lógica para excluir um item
    const novosDados = listaDeDados.filter((item) => item.id !== id);
    setListaDeDados(novosDados);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/ImageBackground.jpg")}
        style={styles.backgroundImage}
      />
      <Card containerStyle={styles.mainCard}>
        <Input
          placeholder="Data de Início"
          label="Data de Início"
          onChangeText={setDataInicio}
          value={dataInicio}
          labelStyle={styles.label}
          containerStyle={styles.inputContainer}
        />
        <Input
          placeholder="Data de Fim"
          label="Data de Fim"
          onChangeText={setDataFim}
          value={dataFim}
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
        {listaDeDados.map((item) => (
          <Card key={item.id} style={styles.smallCard}>
            <Input
              placeholder="Data de Início"
              label="Data de Início"
              value={item.dataInicio}
              disabled={!edicaoAtiva}
              labelStyle={styles.label}
              inputStyle={styles.inputText}
            />
            <Input
              placeholder="Data de Fim"
              label="Data de Fim"
              value={item.dataFim}
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

export default TelaPrincipal;
