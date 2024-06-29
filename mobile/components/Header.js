import React from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Constants from "expo-constants";
import { Colors } from "../config";
import { useHeight, useWidth } from "../api/Dimensions";

export default ({ title }) => {
  const window = useWindowDimensions();
  const h = useHeight(window.height);
  const w = useWidth(window.width);

  return (
    <View style={{ backgroundColor: Colors.GRAY }}>
      <View
        style={{
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: Colors.GRAY,
          marginTop: Constants.statusBarHeight,
          height: h(6),
          marginBottom: h(1),
          justifyContent: 'center'
        }}
      >
        <View>
          <Text style={{ alignSelf: "center", fontSize: h(3), color: Colors.WHITE }}>{title}</Text>
        </View>
      </View>
    </View>
  );
};
