import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import CardGrid from '../components/CardGrid';
import Header from "../components/Header";


const games = [
  { id: 5, image: require("../../assets/images/games/game1.png") },
  { id: 8, image: require("../../assets/images/games/game2.png") },
  { id: 6, image: require("../../assets/images/games/game3.png") },
  { id: 7, image: require("../../assets/images/games/game4.png") },
  { id: 1, image: require("../../assets/images/games/game5.png") },
  { id: 2, image: require("../../assets/images/games/game6.png") },
  { id: 3, image: require("../../assets/images/games/game7.png") },
  { id: 4, image: require("../../assets/images/games/game8.png") },
];

const image = require("../../assets/images/hsbg.png")

function HomeScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      header: () => <Header navigation={navigation} showLogo={true} showInfo={true} showBack={false} />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.background}></ImageBackground>
      <View style={styles.grid}>
        <CardGrid
          data={games}
          onPress={(game) => navigation.navigate("Game", { gameId: `game${game.id}` })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', 
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: 'absolute',
    width: '100%',
    maxWidth: '100%', 
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  grid: { 
    flex: 1,
    gap: 20,
    maxWidth: 390,
    width: '100%', 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "center", 
    alignItems: "center",
    paddingVertical: 40,
    backgroundImage: 'url(' +  require("../../assets/images/hsbg.png") + ')' },
  cardImage: { width: "100%", height: "100%", borderRadius: 10 },
  card: { width: 130, height: 130, margin: 5 },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default HomeScreen;