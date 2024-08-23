import { StyleSheet } from "react-native";

export const depositeFormstyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f8f8f8',
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    formCard: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      elevation: 5,
    },
    balanceContainer: {
      flexDirection: 'row',
      justifyContent:'flex-end',
      marginBottom: 20,
    },
    balanceLabel: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    balanceAmount: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    formContainer: {
    },
    input: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
      borderRadius: 10,
    },
    button: {
      backgroundColor: '#5800EB',
      padding: 15,
      borderRadius: 10,
      height: 50,
      marginTop: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      marginBottom: 10,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
  });
  