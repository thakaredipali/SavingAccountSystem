
import React from 'react'
import Toast from 'react-native-simple-toast';
import { StyleSheet, Text, View } from 'react-native'
import { CreateAccount } from '../CreateUser'
import { CommonActions, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { postApi } from '../../../axiosconfig/apihelper';
import { CreateAccountValues } from './type';


type RootStackParamList = {
    AddNewAccount: { userId: number };
  };
  
 type AddNewAccountRouteProp = RouteProp<RootStackParamList, 'AddNewAccount'>;

const AddNewAccount = () => {
    const navigation = useNavigation();
    const route = useRoute<AddNewAccountRouteProp>();
    const { userId } = route.params;
    const handleSubmitButton = async (values: CreateAccountValues) => {
        try {
          const data = {
            ...values,
            user_id: userId,
            branch_id: Number(values.branch_id),
            balance: Number(values.balance),
          };
          const response = await postApi('account/create', data);
          Toast.show('Acccount created successfully', Toast.SHORT);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Home' }], 
            })
          );
          
        } catch (error) {
          console.error('failed:', error);
        }
      };
    
      const handleBack = () => {
        navigation.goBack()
      };
  return (
    <View>
     <CreateAccount onBack={handleBack} onSubmit={handleSubmitButton} />
    </View>
  )
}

export default AddNewAccount

