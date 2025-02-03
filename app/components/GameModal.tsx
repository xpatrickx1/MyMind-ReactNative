import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GradientButton from "./GradientButton";
import HomeIcon from "../../assets/images/icons/home.svg";
import ArrowPrew from "../../assets/images/icons/arrowPrew.svg";
import ArrowNext from "../../assets/images/icons/arrowNext.svg";

const GameOverModal = ({ navigation, visible, status, onNextGame, onRestart, onClose  }) => {
  console.log(status)
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <LinearGradient 
            style={styles.modalBg} 
            locations={[0, 0.56, 1]}
            colors={["#2BD5E8", "#8864E8"]}
            start={{ x: 0.2, y: -0.2 }} 
            end={{ x: 1, y: 1 }}
            ></LinearGradient>
              <LinearGradient 
              style={styles.textBg} 
              locations={[0, 0.5, 0.9]}
              colors={["#43BCF0", "#541896", "#711280"]}
              start={{ x: 0.2, y: -0.2 }} 
              end={{ x: 1, y: 1 }}
              ></LinearGradient>
                <Text style={styles.modalText}>{status === "win" ? "You Won!" : "You lost!"}</Text>
              
          
        </View>
        <View style={styles.buttonContainer}>
          <GradientButton 
            onPress={() => {
              onClose();
              navigation.navigate("Home")}} 
            Icon={HomeIcon} 
            size={22} 
            style={styles.homeButton}
          />
          <GradientButton 
            onPress={() => {status === "win" ? onNextGame() : onRestart()}} 
            Icon={status === "win" ? ArrowNext : ArrowPrew} 
            size={20} 
            style={styles.homeButton}
            />
        </View>
      </View>
      
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(53, 53, 53, .3)",
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 3.5,   
    borderColor: "#fff", 
    borderStyle: "solid",
    width: "100%",
    height: '100%',
    maxHeight: 182,
    maxWidth: 290,
    borderRadius: 21, 
  },
  modalBg: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    maxHeight: 182,
    maxWidth: 283, 
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 55,
    borderRadius: 14, 
  },
  textBg: {
    paddingVertical: 18,
    paddingHorizontal: 21,
    borderRadius: 14, 
    position: 'absolute',
    width: '100%',
    height: '100%',
    maxHeight: 72,
    maxWidth: 163,  
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    right: 0,
    bottom: 0,
  },
  modalText: {
    position: "relative",
    textAlign: "center",
    fontSize: 26,
    color: "white",
    fontWeight: "400",
    textTransform: "uppercase",
    zIndex: 5,
  },
  buttonContainer: {
    flex: 1,
    maxHeight: 40,
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 15,
    marginTop: 10,
    width: "100%",
    maxWidth: 160,
  },
  homeButton: {
    width: 40,
    height: 40,
  }
});

export default GameOverModal;