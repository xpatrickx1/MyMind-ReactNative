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
    <ImageBackground source={image} resizeMode="cover" style={styles.background}>
      <View style={styles.grid}>
        <CardGrid
          data={games}
          onPress={(game) => navigation.navigate("Game", { gameId: `game${game.id}` })}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', 
  },
  background: {
    flex: 1,
    width: '100%',
    maxWidth: '100%', 
    backgroundSize: "cover", 
    justifyContent: "center",
    gap: 20,
    padding: 40,
    flexDirection: "row", 
    flexWrap: "wrap", 
  },
  grid: { 
    flex: 1,
    gap: 20,
    maxWidth: 390,
    width: '100%', 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "center", 
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