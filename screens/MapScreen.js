import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export default function MapScreen() {
  const region = {
    latitude:  -6.2,
    longitude: 106.816666,
    latitudeDelta:  0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
      >
        <Marker coordinate={region} title="Jakarta" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map:       { flex: 1, width: Dimensions.get("window").width },
});
