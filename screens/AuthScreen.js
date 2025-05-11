import React, { useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";

export default function AuthScreen({ onSignIn }) {
  const { googleWebClientId, googleIosClientId, googleAndroidClientId } =
    Constants.manifest.extra;

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:    googleWebClientId,
    iosClientId:     googleIosClientId,
    androidClientId: googleAndroidClientId,
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { accessToken } = response.authentication;
      fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((r) => r.json())
        .then(onSignIn)
        .catch(console.error);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Button
        disabled={!request}
        title="Sign in with Google"
        onPress={() => promptAsync()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
