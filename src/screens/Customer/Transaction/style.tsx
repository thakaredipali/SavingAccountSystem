import { StyleSheet } from "react-native";

export const transactionHistoryStyles = StyleSheet.create({
    card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 15,
      marginVertical: 10,
      marginHorizontal: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 3,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      paddingRight: 10

    },
    value: {
      fontSize: 18,
      color: '#333',
      flex: 1,

    },
    deposit: {
      color: 'green',
    },
    withdraw: {
      color: 'red',
    },
  });
