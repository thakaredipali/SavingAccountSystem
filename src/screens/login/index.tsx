import {
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    Image,
    View,
    StyleSheet,
  } from 'react-native';
  import { useState } from 'react';
  import * as Yup from 'yup'
  import { Formik } from 'formik';
import { LoginFormValues } from './type';
import { postApi } from '../../axiosconfig/apihelper';

  


  export const loginValidationSchema = Yup.object().shape({
    email: Yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup
      .string()
      .required('Password is required')
  });
  export const LoginScreen = () => {
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  
    const togglePasswordVisibility = () => {
      setPasswordVisibility(!isPasswordVisible);
    };



    const handleLogin = async (values:LoginFormValues) => {
        try {
          console.warn(values)
          const data = await postApi( 'https://api.escuelajs.co/api/v1/auth/login',  values);
          console.warn('Login successful:', data);
          // Handle successful login
        } catch (error) {
          console.error('Login failed:', error);
        }
      };

    return (

    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginValidationSchema}
      onSubmit={handleLogin}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched,isSubmitting }) => (
      <SafeAreaView style={loginScreenStyle.container}>

        <View style={loginScreenStyle.imageContainer}>
          <Image
            style={loginScreenStyle.image}
            source={{
              uri: 'https://static-00.iconduck.com/assets.00/user-circle-circle-geometric-human-person-single-user-icon-256x256-bgikuq8i.png',
            }}
          />
        </View>
        <View style={loginScreenStyle.textContainer}>
          {/* <Text style={loginScreenStyle.baseText}>Welcome to Saifty!</Text> */}
          <Text style={loginScreenStyle.innerText}>Keep your data safe!</Text>
     
        <TextInput
          style={loginScreenStyle.input}
          placeholder=" Enter Email"
         // onChangeText={text => setEmail(text)}
          onChangeText={handleChange('email')}
          value={values.email}
          onBlur={handleBlur('email')}
        />
       
       </View>
{isSubmitting || errors.email ? <Text style={loginScreenStyle.errorText}>{errors.email}</Text> : null}
   
<View style={loginScreenStyle.textContainer}>
<View style={loginScreenStyle.passwordContainer}>
      <View style={loginScreenStyle.inputWrapper}>
        <TextInput
          style={loginScreenStyle.passwordInput}
          placeholder="Enter Password"
          secureTextEntry={!isPasswordVisible}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          //onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={loginScreenStyle.suffixIcon}
         onPress={togglePasswordVisibility}
         >
          <Image
            source={require('../../../src/assets/icon/hide.png')} // Replace with your icon
            style={loginScreenStyle.eyeIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
    </View>
    {isSubmitting || errors.password ? (
            <Text style={loginScreenStyle.errorText}>{errors.password}</Text>
          ) : null}
    <View style={loginScreenStyle.textContainer}>   
    <TouchableOpacity style={loginScreenStyle.button}
     onPress={handleSubmit as any}
     >
          <Text style={loginScreenStyle.buttonText}>Login</Text>
        </TouchableOpacity>
        </View>   
      </SafeAreaView>
      )}
     </Formik>
    );
  };
  
  const loginScreenStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
     // alignItems: 'center',
      paddingTop: 50, // Additional space at the top for SafeArea
    },
    imageContainer: {
      flex: 1,
     // justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70, // Adjust this value to fine-tune the vertical position of the image
    },
    image: {
      height: 100,
      width: 100,
      borderRadius: 50, // Optional: Makes the image circular
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
  

 