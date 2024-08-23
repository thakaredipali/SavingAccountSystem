import { StyleSheet } from "react-native";

export const loginScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingTop: 50,
    },
    imageContainer: {
     // flex: 1,
      alignItems: 'center',
      marginTop: 70, 
    },
    image: {
      height: 100,
      width: 100,
      borderRadius: 50, 
    },
    textContainer: {
      alignItems: 'center',
      marginBottom: 10,
    },
    baseText: {
      fontSize: 24,
      fontWeight: 'bold',
      paddingTop: 10,
    },
    innerText: {
      fontSize: 20,
      color: 'grey',
      fontWeight: '600',
      paddingTop: 10,
      paddingBottom: 20,
    },
    errorText: {
    fontSize: 14,
    color: 'red',
    fontWeight: '400',
    paddingHorizontal: 25,
    textAlign: 'left',
      },
    input: {
      width: '90%',
      height: 60,
      marginTop: 20,
      backgroundColor: '#F2F2F2',
      padding: 20,
      borderRadius: 10,
      
    },
    passwordInput: {
        flex: 1,
        height: 60,
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    passwordContainer:{
     width: '90%',
     marginTop: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
      },
    suffixIcon: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{ translateY: -12 }], 
      },
    eyeIcon: {
      width: 20,
      height: 20,
    },
    button: {
      width: '90%',
      height: 60,
      margin: 40,
      padding: 15,
      alignItems: 'center',
      backgroundColor: '#5800EB',
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
    },
  });
  