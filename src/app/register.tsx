import * as Device from 'expo-device';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';
import {Text} from 'react-native';

export default function Register(){
    return <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1
        }}>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          style={styles.textInput}
          placeholder="Nom"
        />

         <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          style={styles.textInput}
          placeholder="Prénom"
        />

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

        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          style={styles.textInput}
          placeholder="Code postale"
        />

         <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={40}
          style={styles.textInput}
          placeholder="Ville"
        />

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

    
}

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    borderColor: '#000',
    borderWidth: 1,
    margin: 12,
  },
});