import Icon from '@react-native-vector-icons/material-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getApi } from '../../../axiosconfig/apihelper';
import { useDispatch } from 'react-redux';
import { getAccountDetails } from '../../../redux/action/action';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';
import { AccountDetails } from './type';
import { UserData } from '../../Admin/CreateUser/type';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import LogoutModal from '../../../components/logOutModel';
import { clearAllData } from '../../../utils/storage';
import { dashboardStyles } from './style';

type DashboardProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

interface CustomerState {
    res: {
        address: string;
        email: string;
        mobile: string;
        name: string;
        role: string;
        user_id: number;
    };
}

const Dashboard = ({navigation}: DashboardProps) => {
    const dispatch = useDispatch();
    const [accountDetails, setAccountDetails] = useState<AccountDetails[]>([]); 
    const [userData, setUserData] = useState<UserData>(); 
    const [modalVisible, setModalVisible] = useState(false);


    const fetchData = useCallback(async () => {
        try {
            const response = await getApi('get_user', {});
            setUserData(response.data);
        } catch (err) {
            console.log('Error getuser data:', err);
        }
    }, []);

    const fetchAccount = useCallback(async () => {
        try {
            const response = await getApi('get_my_accounts', {});
            if(response.data){
            setAccountDetails(response.data);
            dispatch(getAccountDetails(response.data));
            }
        } catch (err: any) {
            if(err.response.data.error_code==401){
                navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'LoginScreen' }],
                    })
                  );
            }
            console.log('Error get_my_accounts data:', err);

        }
    }, [dispatch]);

    useFocusEffect(
        useCallback(() => {
            fetchData();
            fetchAccount();
        }, [fetchData, fetchAccount])
    );


    if (!userData) {
        return (
            <View style={dashboardStyles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const handleLogout = () => {
        setModalVisible(false);
        setTimeout(() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'LoginScreen' }],
            })
          );
        }, 500); 
        clearAllData()

    };
  const handleLogoutPress = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };

    return (
        <View style={dashboardStyles.container}>
        <TouchableOpacity style={dashboardStyles.logoutButton} onPress={handleLogoutPress}>
        <Text style={dashboardStyles.logoutText}>Logout</Text>
        <LogoutModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onConfirm={handleLogout}
      /></TouchableOpacity>
            <View style={dashboardStyles.card}>
                <View>
             <View style={dashboardStyles.cardHeader}>
                    <Text style={dashboardStyles.heading}>Customer Information</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile',{ userData: userData })} >
                    <Image
                        source={require('../../../../src/assets/icon/pen.png')}
                        style={dashboardStyles.icon}
                    />
                    </TouchableOpacity>
                </View> 
                </View>
                <View style={dashboardStyles.infoRow}>
                    <Image
                        source={require('../../../../src/assets/icon/user.png')}
                        style={dashboardStyles.icon}
                    />
                    <Text style={dashboardStyles.infoText}>{userData.name}</Text>
                </View>
                <View style={dashboardStyles.infoRow}>
                    <Image
                        source={require('../../../../src/assets/icon/telephone.png')}
                        style={dashboardStyles.icon}
                    />
                    <Text style={dashboardStyles.infoText}>{userData.mobile}</Text>
                </View>
                <View style={dashboardStyles.infoRow}>
                    <Image
                        source={require('../../../../src/assets/icon/mail.png')}
                        style={dashboardStyles.icon}
                    />
                    <Text style={dashboardStyles.infoText}>{userData.email}</Text>
                </View>
                <View style={dashboardStyles.infoRow}>
                    <Image
                        source={require('../../../../src/assets/icon/location.png')}
                        style={dashboardStyles.icon}
                    />
                    <Text style={dashboardStyles.infoText}>{userData.address}</Text>
                </View>
            </View>

            {/* Second Card */}
            <View style={dashboardStyles.secondCard}>
            <Text style={dashboardStyles.heading}>Account Details</Text>
  {accountDetails.length > 0 ? (
    <>
      <View style={dashboardStyles.infoRow}>
        <Text style={dashboardStyles.label}>Account No:</Text>
        <Text style={dashboardStyles.description}>{accountDetails[0].acc_no}</Text>
      </View>
      <View style={dashboardStyles.infoRow}>
        <Text style={dashboardStyles.label}>Account Type:</Text>
        <Text style={dashboardStyles.description}>{accountDetails[0].acc_type}</Text>
      </View>
      <View style={dashboardStyles.infoRow}>
        <Text style={dashboardStyles.label}>Balance:</Text>
        <Text style={dashboardStyles.description}>{accountDetails[0].balance}</Text>
      </View>
      <View style={dashboardStyles.infoRow}>
        <Text style={dashboardStyles.label}>Branch ID:</Text>
        <Text style={dashboardStyles.description}>{accountDetails[0].branch_id}</Text>
      </View>
      <View style={dashboardStyles.row}>

               
      {accountDetails.length > 1 && (
        <TouchableOpacity
          style={dashboardStyles.viewMoreButton}
          onPress={() =>
            navigation.navigate('AllAccounts', { accountDetails: accountDetails })
          }
        >
          <Text style={dashboardStyles.viewMoreText}>View More</Text>
        </TouchableOpacity>
      )}
      </View>
    </>
  ) : (
    <Text style={dashboardStyles.noDataText}>No data found</Text>
  )}
      <TouchableOpacity
          style={dashboardStyles.viewMoreButton}
          onPress={() =>
            navigation.navigate('TransactionHistoryScreen')
          }
        >
          <Text style={dashboardStyles.viewMoreText}>Transactions</Text>
        </TouchableOpacity>


         </View>
            <View style={dashboardStyles.buttonRow}>
                <TouchableOpacity style={dashboardStyles.button} onPress={() => navigation.navigate('DepositForm')} >
                    <Text style={dashboardStyles.buttonText}>Deposit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={dashboardStyles.button} onPress={() => navigation.navigate('WithdrawForm')} >
                    <Text style={dashboardStyles.buttonText}>Withdraw</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};



export default Dashboard;
