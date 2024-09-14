import { View, Text } from "react-native";
import React from "react";

export default function home() {
  return (
    <View>
      <Text
        style={{
          fontSize: 40,
          fontFamily: "outfitBold",
          textAlign: "center",
          marginVertical:20
         
        }}
      >
        Home
      </Text>
    </View>
  );
}
