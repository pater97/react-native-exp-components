import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      padding: 10,
      backgroundColor: '#007BFF',
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    buttonContainer:{
        display: "flex",
        flexDirection: "row",
        gap: 10
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: 300,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      fontSize: 20,
    },
    modalButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#007BFF',
      borderRadius: 5,
      width: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    confirmButton:{
        backgroundColor: "black"
    },
    closeButton:{
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1
    },
    confirmText:{

    },
    declineText:{
        color: "black"
    }
  });