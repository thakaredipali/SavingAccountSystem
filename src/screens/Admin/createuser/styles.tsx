import { StyleSheet } from "react-native";

export const createUserStyles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      marginTop: 30,
    },
    input: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
      borderRadius: 10,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 5,
    },
    heading: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom: 40,
      textAlign: 'center', // Center the heading text
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginBottom: 10,
    },
    button: {
      height: 50,
      padding: 12,
      marginTop: 20,
      alignItems: 'center',
      backgroundColor: '#5800EB',
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
    },
    backButton: {
      backgroundColor: '#ccc',
      marginTop: 10,
    },
    picker: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 1,
      paddingHorizontal: 10,
      borderRadius: 10,
    },
  });