import React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function MyWebContent() {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <iframe
          src="https://uk.wikipedia.org"
          title="Wikipedia"
          style={styles.iframe}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <WebView source={{ uri: 'https://uk.wikipedia.org' }} style={styles.webview} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  iframe: {
    width: '100%',
    height: '100%',
    borderWidth: 0,
  },
});
