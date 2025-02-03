import React, { useEffect } from "react";
import { Text, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
function InfoScreen({ navigation }) {
    useEffect(() => {
        navigation.setOptions({
          header: () => <Header navigation={navigation} showLogo={true} showInfo={false} showBack={true} />,
        });
      }, [navigation]);

    return (
      <LinearGradient  
        colors={["#471280", "#43BCF0"]}
        start={{ x: 0.2, y: -0.2 }} 
        end={{ x: 1, y: 1 }}
        style={styles.background}>

        <ScrollView style={styles.container}>
          <Text style={styles.infoTitle}>
            Rules
          </Text>
          <Text style={styles.infoText}>
              Lorem ipsum dolor sit amet consectetur. A ut sit pellentesque vel. Sit tincidunt praesent adipiscing in magna erat enim nec urna. Aliquet volutpat id arcu fames varius mus ultricies mollis. Adipiscing blandit cursus faucibus vel ullamcorper dignissim at...
          </Text>
        </ScrollView>
      </LinearGradient>
    );
}

const styles = {
  infoTitle: {
    fontSize: 22,
    marginBottom: 30,
    fontWaight: 600,
    color: "#ffffff", 
    textAlign: "center",
    fontFamily: "Baloo2_600SemiBold"
  },
  infoText: {
      fontSize: 18,
      color: "#ffffff",
      fontFamily: "Baloo2_400Regular"
  },
  container: {
    width: '100%', 
    height: '100%',
    padding: 40,
  },
  background: {
    width: '100%',
    height: '100%',
  },
}

export default InfoScreen;