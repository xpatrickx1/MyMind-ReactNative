import React, { useEffect, useState } from 'react';

import appsFlyer from 'react-native-appsflyer';
import { firebase, app, auth, firestore } from '../firebaseConfig';
import OneSignal from 'react-native-onesignal';
import * as Location from 'expo-location';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import InfoScreen from "./screens/InfoScreen";

const Stack = createStackNavigator();

export default function App() {
  const [location, setLocation] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((usr) => {
      setUser(usr);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getLocationAsync = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Дозвіл на доступ до геолокації відхилено!');
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    } catch (error) {
      setErrorMsg('Помилка при отриманні місцезнаходження: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(location)

  useEffect(() => {

    appsFlyer.initSdk(
      (result) => {
        console.log('AppsFlyer SDK успішно ініціалізовано:', result);
      },
      (error) => {
        console.error('Помилка ініціалізації AppsFlyer SDK:', error);
      }
    );
  }, []);

  useEffect(() => {
    const oneSignalAppId = 'FAKE-ONESIGNAL-APP-ID';

  }, []);

  return (
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="InfoScreen" component={InfoScreen} />
      </Stack.Navigator>
  );
}
