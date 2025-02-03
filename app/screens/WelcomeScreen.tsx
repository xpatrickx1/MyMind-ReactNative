import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

import * as Location from 'expo-location';
import { WebView } from 'react-native-webview'
;
import { LinearGradient } from 'expo-linear-gradient';
import GradientButton from "../components/GradientButton";
import MyWebContent from "../components/MyWebContent";
const WelcomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [userInUkraine, setUserInUkraine] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('відхилено!');
        setLoading(false);
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        const addresses = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        
        if (addresses && addresses.length > 0) {
          const country = addresses[0].country;
          if (country === 'Ukraine' || country === 'Україна') {
            setUserInUkraine(true);
          } else {
            setUserInUkraine(false);
          }
        }
      } catch (error) {
        setErrorMsg(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.centered}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Помилка: {errorMsg}</Text>
          <MyWebContent />
        </View>
        <View style={styles.centered}>
          <GradientButton text="Go to HomeScreen" onPress={() => navigation.navigate("Home")} style={styles.startButton} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#43BCF0', '#541896', '#711280']}
        style={styles.background}
      />

      <Image
        style={styles.tinyLogo}
        source={require("../../assets/images/hslogo.png")}
      />
      
      <GradientButton text="START" onPress={() => navigation.navigate("Home")} style={styles.startButton} />
    </View>
  );
}
  

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", paddingBottom: 90 },
  title: { fontSize: 24, fontWeight: "bold" },
  tinyLogo: { maxWidth: 248, width: 248, height: 248 },
  button: { backgroundColor: "blue", padding: 10, marginTop: 20, borderRadius: 5 },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  startButton: {
    position: "absolute",
    bottom: 90, 
    zIndex: 1,
    width: 160,
  },
});

export default WelcomeScreen;