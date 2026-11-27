import { StyleSheet } from "react-native";
import WebView from "react-native-webview";

import leafletMapDocument from "./leafletMapDocument";

//affichage de la carte pour mobile

export default function LeafletMap() {
  return (
    <WebView
      source={{ html: leafletMapDocument }}
      style={styles.map}
      javaScriptEnabled
      accessible
      accessibilityLabel="Carte interactive"
    />
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    backgroundColor: "#e2e8f0",
  },
});
