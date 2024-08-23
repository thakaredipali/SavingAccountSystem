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
import { LoginFormValues, LoginUserData } from './type';
import jwt_decode, { jwtDecode } from "jwt-decode"
import Toast from 'react-native-simple-toast';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { loginScreenStyle } from './style';
import { postApi } from '../../axiosconfig/apihelper';
import { getData, storeData } from '../../utils/storage';
import { CommonActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';


type LoginProps = NativeStackScreenProps<RootStackParamList,'LoginScreen'>

  export const loginValidationSchema = Yup.object().shape({
    username: Yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup
      .string()
      .required('Password is required')
  });
  export const LoginScreen = ({navigation}: LoginProps) => {
    const dispatch = useDispatch();
    const [isPasswordVisible, setPasswordVisibility] = useState(false);


  
    const togglePasswordVisibility = () => {
      setPasswordVisibility(!isPasswordVisible);
    };



    const handleLogin = async (values:LoginFormValues) => {
        try {
  
          const response = await postApi( 'login',  values);
          Toast.show('Login successful!', Toast.SHORT);
          saveData(response.data.token)
          storeData('loginData',values.password)
          const storedUserData: LoginUserData = jwtDecode(response.data.token??'');
          if(storedUserData && storedUserData.Role == 'customer'){
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Dashboard' }],
              })
            );
          }else{           
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            })
          );
        }
        } catch (error: any) {
          Toast.show(error.response.data.error_description || 'Login failed!', Toast.LONG);
        }
      };

      const saveData = async (values: string) => {
        await storeData('token',values );
      };
    

    return (
    <Formik
      initialValues={{ username: '', password: '' }}
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
          onChangeText={handleChange('username')}
          value={values.username}
          onBlur={handleBlur('username')}
        />
       
       </View>
{isSubmitting || errors.username ? <Text style={loginScreenStyle.errorText}>{errors.username}</Text> : null}
   
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
    //  onPress={()=> {navigation.push('Home')
    //   saveData(values);
    //  }}
    
     >
          <Text style={loginScreenStyle.buttonText}>Login</Text>
        </TouchableOpacity>
        </View>   
      </SafeAreaView>
      )}
     </Formik>
    );
  };
  


 