import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 100,
    backgroundColor: "#dbebf2",
  },
});

export default Home;
