import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { UserListData } from '../Admin/type';


type RootStackParamList = {
    UserInfo: { userData: UserListData };
  };
  
type UserInfoScreenRouteProp = RouteProp<RootStackParamList, 'UserInfo'>;
const UserInfo = () => {
    const route = useRoute<UserInfoScreenRouteProp>();
    const { userData } = route.params;

    return (
        <View style={styles.container}>
          <Text style={styles.heading}>Customer Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{userData.res.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{userData.res.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Mobile:</Text>
            <Text style={styles.value}>{userData.res.mobile}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{userData.res.address}</Text>
          </View>
        </View>
      );
    };
    
    export default UserInfo;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#5800EB',
      },
      row: {
        flexDirection: 'row',
        marginVertical: 10,
      },
      label: {
        fontWeight: 'bold',
        fontSize: 16,
        width: 100,
      },
      value: {
        fontSize: 16,
        flexShrink: 1,
      },
    });