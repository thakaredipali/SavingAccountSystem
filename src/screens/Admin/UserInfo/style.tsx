import { StyleSheet } from "react-native";

export const userInfoStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    card: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      marginBottom: 20,
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    row: {
      flexDirection: 'row',
      marginVertical: 10,
    },
    label: {
      fontWeight: 'bold',
      fontSize: 18,
      width: 140,
    },
    value: {
      fontSize: 16,
      flexShrink: 1,
    },
    accountContainer: {
      padding: 10,
      marginHorizontal: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 3,
      borderColor: '#ddd',
      borderWidth: 1,
      width: 300, 
    },
    addButton: {
      position: 'absolute',
      right: 10,
      top: 10,
      padding: 10,
    },
    addButtonText: {
      color: '#007bff',
      fontWeight: 'bold',
      fontSize: 16
    },
    deleteButton: {
      backgroundColor: '#5800EB',
      padding: 10,
      marginTop: 20,
      marginBottom:20,
      borderRadius: 5,
      alignItems: 'center',
    },
    noAccountsText: {
      fontSize: 16,
      fontStyle: 'italic',
      textAlign: 'center',
      marginVertical: 10,
      color: '#999',
    },
    deleteButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  
  });