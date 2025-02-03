import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from "react-native";
import CardGrid from '../components/CardGrid';
import imageAssets from "../utils/imageAssets";
import backgroundAssets from "../utils/backgroundAssets";
import GameModal from "../components/GameModal";
import Header from "../components/Header";
import GradientButton from "../components/GradientButton";


const generateCards = (gameId) => {
  const pairs = [...imageAssets[gameId], ...imageAssets[gameId]];
  return pairs.sort(() => Math.random() - 0.5).map((image, index) => ({
    id: index,
    image,
    flipped: false,
    matched: false,
  }));
};

export default function GameScreen({ route, navigation }) {
  const { gameId } = route.params;
  const [cards, setCards] = useState(generateCards(gameId));
  const [selected, setSelected] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [level, setLevel] = useState(parseInt(gameId.replace("game", ""), 10));
  const [mistakes, setMistakes] = useState(0);
  const [gameStatus, setGameStatus] = useState(null);
  const totalLevels = 8;

  useEffect(() => {
    setTimeout(() => setShowAll(false), 2000);
  }, []);

  useEffect(() => {
    if (mistakes > 2) {
      setGameStatus("lose");
    }
  }, [mistakes]);

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header navigation={navigation} level={level} totalLevels={totalLevels} showLevel={true} showHeart={true} showBack={true} />,
    });
  }, [navigation]);

  useEffect(() => {
    if (cards.every((card) => card.matched)) {
      setGameStatus("win");
    }
  }, [cards]);

  const handleCardPress = (card) => {
    if (selected.length === 2 || card.flipped || card.matched) return;

    const updatedCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(updatedCards);

    const newSelected = [...selected, card];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setTimeout(() => checkMatch(newSelected), 800);
    }
  };

  const checkMatch = (selected) => {
    if (selected[0].image === selected[1].image) {
      setCards((prev) =>
        prev.map((c) =>
          c.image === selected[0].image ? { ...c, matched: true } : c
        )
      );
    } else {
      setMistakes((prev) => prev + 1);
      setCards((prevCards) =>
        prevCards.map((c) =>
          c.id === selected[0].id || c.id === selected[1].id
            ? { ...c, flipped: false }
            : c
        )
      );
    }
    setSelected([]); 
  };

  const closeModal = () => {
    setGameStatus(null);
  };

  const restartGame = () => {
    closeModal();
    setCards(generateCards(gameId));
    setMistakes(0);
    setGameStatus(null);
    setShowAll(true);
    setTimeout(() => setShowAll(false), 2000);
  };

  const launchNextGame = () => {
    const currentGameId = parseInt(gameId.replace("game", ""), 10)
    const newGameId = currentGameId > totalLevels ? "game1" : ("game" + ((parseInt(gameId.replace("game", ""), 10)) + 1))
    closeModal();
    navigation.navigate("Game", { gameId: newGameId })
    setCards(generateCards(newGameId));
    setLevel(currentGameId + 1)
    setMistakes(0);
    setGameStatus(null);
    setShowAll(true);
    setTimeout(() => setShowAll(false), 2000);
  };

  const getCardStyle = (cardsCount) => {
    let cardWidth = 150;
    if (cardsCount === 4) {
      cardWidth = 150;
    } else if (cardsCount === 8) {
      cardWidth = 120;
    } else if (cardsCount === 12) {
      cardWidth = 102;
    }
    return { width: cardWidth, height: cardWidth };
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundAssets[gameId]} resizeMode="cover" style={styles.background}></ImageBackground>
      <View style={styles.grid}>
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            onPress={() => handleCardPress(card)}
            style={[styles.card, getCardStyle(cards.length)]}
          >
            <Image
              source={showAll || card.flipped || card.matched ? card.image : require("../../assets/images/back.png")}
              style={styles.cardImage}
            />
          </TouchableOpacity>
        ))}

        <GameModal 
          visible={gameStatus !== null}  
          status={gameStatus}
          onNextGame={launchNextGame}  
          onRestart={restartGame}  
          navigation={navigation}
          onClose={() => setGameStatus(null)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1e1e2e" },
  title: { fontSize: 24, color: "white", marginBottom: 20 },
  card: { width: 80, height: 80 },
  cardImage: { width: "100%", height: "100%", borderRadius: 10 },
  button: { marginTop: 20, backgroundColor: "#3498db", padding: 10, borderRadius: 5 },
  buttonText: { color: "white", fontSize: 18 },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    backgroundSize: "cover", 
  },
  grid: {
    width: '100%',
    maxWidth: 360, 
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row", 
    gap: 15,
    flexWrap: "wrap", 
    paddingVertical: 40,
  },
});
