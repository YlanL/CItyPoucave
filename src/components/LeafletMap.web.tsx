import { createElement } from "react";
import { StyleSheet, View } from "react-native";

import leafletMapDocument from "./leafletMapDocument";

//iframe pour afficher la carte web

export default function LeafletMap() {
  return (
    <View style={styles.container}>
      {createElement("iframe", {
        title: "Carte interactive",
        srcDoc: leafletMapDocument,
        style: { width: "100%", height: "100%", border: "none", display: "block" },
        allowFullScreen: true,
        loading: "lazy",
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
