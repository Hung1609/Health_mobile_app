import { Text, View, Image, StyleSheet, ImageBackground, TouchableOpacity, StatusBar } from "react-native";
import React from "react";
import { Link } from "expo-router";

export default function OnBoarding() {
  return (
    <ImageBackground
      source={require("../assets/images/boarding-bg.jpg")}
      style={styles.background}
    >
      <StatusBar barStyle="dark-content"></StatusBar>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Image 
          source={require("../assets/images/health-care-logo.png")}
          style={styles.logo}
        />
      </View>
      <Link href="/login" style={styles.button}>Get Started</Link>
    </ImageBackground>
  );  
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 100,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

