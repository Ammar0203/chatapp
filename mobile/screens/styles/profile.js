import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../config";
import { useHeight, useWidth } from "../../api/Dimensions";

const useStyle = ({ width, height }) => {
  const w = useWidth(width);
  const h = useHeight(height);

  const styles = StyleSheet.create({
    avatarContainer: {
      backgroundColor: Colors.GRAY,
      padding: 30,
    },
    avatar: {
      alignSelf: "center",
      width: 200,
      height: 200,
      borderRadius: 200,
      marginBottom: 20,
    },
    name: {
      alignSelf: "center",
      color: Colors.WHITE,
    },
    status: {
      alignSelf: "center",
      marginTop: 10,
    },
    about: {
      alignSelf: "center",
      marginTop: 20,
      fontSize: 20,
    },
  });
  return styles;
};

export default useStyle;