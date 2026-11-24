import * as Device from "expo-device";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import { Text, View } from "react-native";

export default function Register() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[
          styles.container,
          {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column",
          },
        ]}
      >
        <View
          style={
            
            {
              // Try setting `flexDirection` to `"row"`.
              flexDirection: "row",
            }
          }
        >
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={40}
            style={[styles.textInput, { flex: 1 }]}
            placeholder="Prénom"
          />

          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={40}
            style={[
              styles.textInput,
             { flex : 1}
            ]}
            placeholder="Nom"
          />
        </View>

        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          style={styles.textInput}
          placeholder="Email"
        />

        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          style={styles.textInput}
          placeholder="Adresse"
        />

        <View
          style={
            
            {
              // Try setting `flexDirection` to `"row"`.
              flexDirection: "row",
            }
          }
        >
          <TextInput
            editable
            multiline
            numberOfLines={1}
            maxLength={5}
            style={[styles.textInput, { flex: 1 }]}
            placeholder="Code postale"
          />

          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={40}
            style={[
              styles.textInput,
             { flex : 2}
            ]}
            placeholder="Ville"
          />
        </View>

        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          style={styles.textInput}
          placeholder="Mot de passe"
        />
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
  container: {},
  box: {
    flex: 1,
  },
});
