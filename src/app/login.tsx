import * as Device from "expo-device";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import { Text, View, Button } from "react-native";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const saveData = async () => {
    if (email && password) {
      const url = "/login"; //api
      let result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (result.ok) {
        alert("Connecté avec succès");
      } else {
        alert("Erreur lors de la connexion");
        return;
      }
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          {
            flexDirection: "column",
          },
        ]}
      >
        <TextInput
          editable
          maxLength={40}
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          inputMode="email"
        />

        <TextInput
          editable
          secureTextEntry={true}
          maxLength={40}
          style={styles.textInput}
          placeholder="Mot de passe"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Se connecter" onPress={saveData} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    margin: 12,
  },
});
