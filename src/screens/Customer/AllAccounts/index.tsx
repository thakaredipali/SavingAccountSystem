import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { AccountDetails } from '../Dashboard/type';
import { RouteProp, useRoute } from '@react-navigation/native';
import { allAccountsStyles } from './styles';



type RootStackParamList = {
    AllAccounts: { accountDetails: AccountDetails[] };
  };
  
  type AccountDetailsScreenRouteProp = RouteProp<RootStackParamList, 'AllAccounts'>;
  const AllAccounts = () => {
    const route = useRoute<AccountDetailsScreenRouteProp>();
  const { accountDetails } = route.params;

  return (
    <ScrollView style={allAccountsStyles.container}>
      <Text style={allAccountsStyles.heading}>All Accounts</Text>
      {accountDetails.map((account, index) => (
        <View key={index} style={allAccountsStyles.accountContainer}>
          <View style={allAccountsStyles.infoRow}>
            <Text style={allAccountsStyles.label}>Account No:</Text>
            <Text style={allAccountsStyles.description}>{account.acc_no}</Text>
          </View>
          <View style={allAccountsStyles.infoRow}>
            <Text style={allAccountsStyles.label}>Account Type:</Text>
            <Text style={allAccountsStyles.description}>{account.acc_type}</Text>
          </View>
          <View style={allAccountsStyles.infoRow}>
            <Text style={allAccountsStyles.label}>Balance:</Text>
            <Text style={allAccountsStyles.description}>{account.balance}</Text>
          </View>
          <View style={allAccountsStyles.infoRow}>
            <Text style={allAccountsStyles.label}>Branch ID:</Text>
            <Text style={allAccountsStyles.description}>{account.branch_id}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};



export default AllAccounts;
