import { StyleSheet } from "react-native";

export const style =
    StyleSheet.create({
      container: {
        flexDirection: "row",
        width: "90%",
        minHeight: 40,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      },
      errorBorder: {
        borderWidth: 1,
        borderColor: "#FF2145",
      },
      borderBottom: {
        borderBottomWidth: 1,
      },
      input: {
        flex: 1,
        fontSize: 16,
      },
    });
  
