import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { CommonActions, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { UserListData } from '../Home/type';
import DeleteButton from '../../../components/deleteButton';
import { deleteApi } from '../../../axiosconfig/apihelper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Toast from 'react-native-simple-toast';
import { userInfoStyles } from './style';

type RootStackParamList = {
  UserInfo: { userData: UserListData };
  AddNewAccount: { userId: number };
};

type UserInfoProp = RouteProp<RootStackParamList, 'UserInfo'>;
type UserInfoScreenRouteProp = NativeStackScreenProps<RootStackParamList, 'UserInfo'>;


const UserInfo = ({navigation}: UserInfoScreenRouteProp) => {

  const route = useRoute<UserInfoProp>();

  const { userData } = route.params;

  const handleDeleteAccount = async (accountId: number, user_id: number) => {
    try {
      const response = await deleteApi(`account/delete?acc_no=${accountId}&user_id=${user_id}`, {});
      Toast.show(response.data.msg, Toast.LONG);   
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
      
  } catch (err) {
      console.log('Error fetching data:', err);
  }
    
  };



  return (
    <View style={userInfoStyles.container}>
      <View style={userInfoStyles.card}>
        <Text style={userInfoStyles.heading}>Customer Information</Text>
        <View style={userInfoStyles.row}>
          <Text style={userInfoStyles.label}>Name:</Text>
          <Text style={userInfoStyles.value}>{userData.res.name}</Text>
        </View>
        <View style={userInfoStyles.row}>
          <Text style={userInfoStyles.label}>Email:</Text>
          <Text style={userInfoStyles.value}>{userData.res.email}</Text>
        </View>
        <View style={userInfoStyles.row}>
          <Text style={userInfoStyles.label}>Mobile:</Text>
          <Text style={userInfoStyles.value}>{userData.res.mobile}</Text>
        </View>
        <View style={userInfoStyles.row}>
          <Text style={userInfoStyles.label}>Address:</Text>
          <Text style={userInfoStyles.value}>{userData.res.address}</Text>
        </View>
      </View>

      <View style={userInfoStyles.card}>
      <Text style={userInfoStyles.heading}>Account Information</Text>
        <TouchableOpacity style={userInfoStyles.addButton} onPress={() => navigation.navigate('AddNewAccount', { userId: userData.res.user_id })}>
          <Text style={userInfoStyles.addButtonText}>Add</Text>
        </TouchableOpacity>
        {userData.res.accounts? (
        <ScrollView horizontal>
          {userData.res.accounts?.map((account, index) => (
            <View key={index} style={userInfoStyles.accountContainer}>
              <View style={userInfoStyles.row}>
                <Text style={userInfoStyles.label}>Account No:</Text>
                <Text style={userInfoStyles.value}>{account.acc_no}</Text>
              </View>
              <View style={userInfoStyles.row}>
                <Text style={userInfoStyles.label}>Branch ID:</Text>
                <Text style={userInfoStyles.value}>{account.branch_id}</Text>
              </View>
              <View style={userInfoStyles.row}>
                <Text style={userInfoStyles.label}>Branch Name:</Text>
                <Text style={userInfoStyles.value}>{account.branch_name}</Text>
              </View>
              <View style={userInfoStyles.row}>
                <Text style={userInfoStyles.label}>Branch Location:</Text>
                <Text style={userInfoStyles.value}>{account.branch_location}</Text>
              </View>
              <View style={userInfoStyles.row}>
                <Text style={userInfoStyles.label}>Account Type:</Text>
                <Text style={userInfoStyles.value}>{account.acc_type}</Text>
              </View>
              <View style={userInfoStyles.row}>
                <Text style={userInfoStyles.label}>Balance:</Text>
                <Text style={userInfoStyles.value}>{account.balance}</Text>
              </View>
              <DeleteButton onConfirm={()=>handleDeleteAccount(account.acc_no,userData.res.user_id)}></DeleteButton>
            </View>
          ))}
        </ScrollView>
        ): (
          <Text style={userInfoStyles.noAccountsText}>No accounts available</Text>
        )}
      </View>
    </View>
  );
};

export default UserInfo;


