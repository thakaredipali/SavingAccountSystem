import { StyleSheet } from "react-native";

export const allAccountsStyles = StyleSheet.create({
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
    accountContainer: {
      marginBottom: 20,
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
    },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    label: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      width: 150, 
    },
    description: {
      fontSize: 16,
      color: '#555',
      flex: 1, 
    },
  });