import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
const GradientButton = ({ onPress, text, Icon, style, size = 24 }) => {
  return (
    <LinearGradient
      colors={["#43BCF0", "#541896", "#711280"]}
      locations={[0, 0.56, 1]}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[style, styles.border]}
    >
      <TouchableOpacity style={[styles.button, Icon && styles.iconButton]} onPress={onPress}>
      {Icon ? (
          <Icon width={size} height={size} fill="white" />
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  border: {
    padding: 3,
    borderRadius: 30,
  },
  button: {
    flex: 1,
    backgroundColor: "#64C1FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 160,
  },
  iconButton: {
    borderRadius: 50,
    paddingHorizontal: 0,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "medium",
  },
});

export default GradientButton;
