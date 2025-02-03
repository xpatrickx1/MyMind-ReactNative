import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; 
import GradientButton from "./GradientButton";
import InfoScreen from "../screens/InfoScreen";
import ArrowPrew from "../../assets/images/icons/arrowPrew.svg";
import info from "../../assets/images/icons/info.svg";

const image = require("../../assets/images/logo.png")

const Header = ({ navigation, level, totalLevels, showLevel, showLogo, showInfo, showBack, showHeart }) => {
  return (
    <LinearGradient 
      style={styles.header} 
      colors={["#43BCF0", "#571280"]}
      start={{ x: 0.2, y: -0.2 }} 
      end={{ x: 1, y: 1 }}>

      {showBack && (
        <GradientButton style={styles.backButton} onPress={() => navigation.navigate("Home")} Icon={ArrowPrew} size={20} />
       )}

      {showLogo && (
        <Image source={image} style={styles.logo} />
      )}

      {showHeart && (
        <Image source={require("../../assets/images/heart.png")} style={styles.heartIcon} />
      )}

      {showLevel && (
        <LinearGradient 
        style={styles.level} 
        colors={["#00FFB2", "#24BFC9"]}
        start={{ x: 0.2, y: -0.2 }} 
        end={{ x: 1, y: 1 }}
        >
          <View style={styles.levelCounter}>
            <Text style={styles.levelText}>{level}/{totalLevels}</Text>
          </View>
        </LinearGradient>
      )}

      {showInfo && (
        <GradientButton 
          onPress={() => navigation.navigate("InfoScreen")}
          Icon={info} 
          size={17} 
          style={styles.infoButton}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 10, 
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "400",
  },
  logo: {
    maxWidth: 62,
  },
  bold: {
    fontWeight: "bold",
  },
  infoButton: {
    position: "absolute",
    right: 15,
    width: 30,
    height: 30,
  },
  levelText: {
    color: "white",
    fontSize: 18,
  },
  level: {
    position: "absolute",
    right: 25, 
    zIndex: 1,
    borderRadius: 71,
    paddingVertical: 3,
    paddingHorizontal: 11
  },
  backButton: {
    position: "absolute",
    left: 25, 
    zIndex: 1,
    width: 30,
    height: 30,
  },
});

export default Header;
