import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Icon, Input } from "react-native-elements";

const TelaSecundaria = () => {
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
    // ... Lógica de salvar
  };

  const handleEdit = (id) => {
    // ... Lógica de edição
  };

  const handleDelete = (id) => {
    // ... Lógica de exclusão
  };

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.backgroundCard}>
        <ImageBackground
          source={require("../../assets/ImageBackground.jpg")} // Substitua pelo caminho real da sua imagem de fundo
          style={styles.backgroundImage}
          imageStyle={styles.backgroundImageStyle}
        >
          <View style={styles.cardContent}>
            <Input
              placeholder="Data de Início"
              label="Data de Início"
              onChangeText={setDataInicio}
              value={dataInicio}
              labelStyle={styles.label}
            />
            {/* ... Outros inputs e componentes ... */}
            <Button
              title={edicaoAtiva ? "Atualizar" : "Adicionar"}
              onPress={handleSave}
              buttonStyle={styles.button}
            />
          </View>
        </ImageBackground>
      </Card>

      <ScrollView style={styles.cardListContainer}>
        {listaDeDados.map((item) => (
          <Card key={item.id} containerStyle={styles.smallCard}>
            {/* Seu conteúdo aqui */}
            <Input
              placeholder="Data de Início"
              label="Data de Início"
              value={item.dataInicio}
              disabled={!edicaoAtiva}
              labelStyle={styles.label}
              inputStyle={styles.inputText}
            />
            {/* ... Outros inputs e componentes ... */}
            {edicaoAtiva && (
              <View style={styles.iconContainer}>
                <Icon
                  name="pencil"
                  type="font-awesome"
                  color="#3498db"
                  onPress={() => handleEdit(item.id)}
                />
                <Icon
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
    backgroundColor: "white", // Fundo branco para o componente principal
  },
  backgroundCard: {
    borderRadius: 10,
    overflow: 'hidden',
    height: "50%",
    padding: 0
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImageStyle: {
    resizeMode: 'cover',
  },
  cardContent: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 10,
  },
  label: {
    color: "black",
    marginBottom: 5,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
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
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  iconContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-end",
  },
  inputText: {
    color: "black",
  },
});

export default TelaSecundaria;
