import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Home = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/ImageBackground.jpg")}
        style={styles.backgroundImage}
      />
      <Text style={styles.text}>Global Solution</Text>
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
  text: {
    fontSize: 30,
    color: "#000000",
    fontWeight: "bold",
  },
});

export default Home;
