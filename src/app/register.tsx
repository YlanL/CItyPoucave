import * as Device from "expo-device";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import { Text, View, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import API_CONFIG from "../config/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const saveData = async () => {
    if (
      email &&
      firstName &&
      lastName &&
      password &&
      confirmPassword &&
      address &&
      postcode &&
      city
    ) {
      if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas");
        return;
      } else {
        const result = await fetch(`${API_CONFIG.BASE_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            address,
            postcode,
            city,
            password,
          }),
        });
        if (result.ok) {
          alert("Compte crée avec succès");
        } else {
          alert("Erreur lors de l'inscription");
          return;
        }
      }
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column",
          },
        ]}
      >
        <View
          style={{
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "row",
          }}
        >
          <TextInput
            editable
            maxLength={40}
            style={[styles.textInput, { flex: 1 }]}
            placeholder="Prénom"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />

          <TextInput
            editable
            maxLength={40}
            style={[styles.textInput, { flex: 1 }]}
            placeholder="Nom"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
        </View>

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
          maxLength={40}
          style={styles.textInput}
          placeholder="Adresse"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <View
          style={{
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "row",
          }}
        >
          <TextInput
            editable
            maxLength={5}
            style={[styles.textInput, { flex: 1 }]}
            placeholder="Code postale"
            value={postcode}
            onChangeText={(text) => setPostCode(text)}
            inputMode="numeric"
          />

          <TextInput
            editable
            maxLength={40}
            style={[styles.textInput, { flex: 2 }]}
            placeholder="Ville"
            value={city}
            onChangeText={(text) => setCity(text)}
          />
        </View>
        <View style={styles.passwordInput}>
          <TextInput
            editable
            secureTextEntry={!showPassword}
            maxLength={40}
            style={[styles.textInput, { flex: 1 }]}
            placeholder="Mot de passe"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={22}
              color="black"
            ></Ionicons>
          </TouchableOpacity>
        </View>

        <TextInput
          editable
          secureTextEntry={!showPassword}
          maxLength={40}
          style={styles.textInput}
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <Button title="S'inscrire" onPress={saveData} />
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
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
  },
});
