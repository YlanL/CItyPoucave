import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import API_CONFIG from "../config/api";

interface HealthResponse {
  message: string;
}

export default function HealthScreen() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/health`);

        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }

        const data: HealthResponse = await response.json();

        setMessage(data.message);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion API</Text>

      {loading && <ActivityIndicator size="large" />}

      {message && <Text style={styles.success}>Message API : {message}</Text>}

      {error && <Text style={styles.error}>Erreur : {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  success: {
    color: "green",
    fontSize: 18,
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});
