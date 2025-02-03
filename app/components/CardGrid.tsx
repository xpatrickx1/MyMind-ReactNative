import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function CardGrid({ data, onPress }) {
  return (
    <View style={styles.grid}>
      {data.map((item) => (
        <TouchableOpacity key={item.id} onPress={() => onPress(item)} style={styles.card}>
          <Image source={item.image} style={styles.cardImage} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
    grid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 10,
      maxWidth: 320,
    },
    card: {
      width: 130,
      height: 130,
      backgroundColor: "#fff",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    cardImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain",
    },
  });