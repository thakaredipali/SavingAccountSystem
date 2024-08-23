import { StyleSheet } from "react-native";

export const updateProfileStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
      padding: 20,
    },
    card: {
      width: '100%',
      maxWidth: 400,
      backgroundColor: '#ffffff',
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
    heading: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#333',
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    input: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginBottom: 10,
    },
    button: {
      height: 50,
      backgroundColor: '#5800EB',
      paddingVertical: 15,
      borderRadius: 10,
      marginTop: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });