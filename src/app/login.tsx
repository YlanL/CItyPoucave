import { StyleSheet, TextInput, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useState } from "react";

// Adresse de l'API Express (voir .env : EXPO_PUBLIC_API_URL=http://192.168.x.x:3000)
import API_CONFIG from "../config/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const saveData = async () => {
    if (!email || !password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const result = await fetch(`${API_CONFIG.BASE_URL}/login`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await result.json();

      if (result.ok) {
        // data.token contient le JWT (à stocker pour les prochains appels)
        console.log("token :", data.token);
        alert("Connecté avec succès");
      } else {
        alert(data.error ?? "Erreur lors de la connexion");
      }
    } catch (error) {
      alert("Impossible de joindre le serveur");
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flexDirection: "column" }}>
        <TextInput
          editable
          maxLength={40}
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          inputMode="email"
          autoCapitalize="none"
        />

        <TextInput
          editable
          secureTextEntry={true}
          maxLength={40}
          style={styles.textInput}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
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