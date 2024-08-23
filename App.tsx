import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import { store } from './src/redux/store/store';
import HomeScreen from './src/screens/Admin/Home';
import { LoginScreen } from './src/screens/login';
import UserInfo from './src/screens/Admin/UserInfo';
import Dashboard from './src/screens/Customer/Dashboard';
import DepositForm from './src/screens/Customer/Deposite';
import WithdrawForm from './src/screens/Customer/Withdraw';
import UpdateProfile from './src/screens/Customer/UpdateProfile';
import { UserListData } from './src/screens/Admin/Home/type';
import useAuth from './src/utils/auth';
import ViewBranches from './src/screens/Admin/ViewBranches';
import { UserData } from './src/screens/Admin/CreateUser/type';
import { AccountDetails } from './src/screens/Customer/Dashboard/type';
import AllAccounts from './src/screens/Customer/AllAccounts';
import AccountForm from './src/screens/Admin/CreateUser';
import TransactionHistory from './src/screens/Customer/Transaction';
import TransactionHistoryScreen from './src/screens/Customer/Transaction';
import AddNewAccount from './src/screens/Admin/Account';


export type RootStackParamList = {
  LoginScreen: undefined;
  Home: undefined;
  AccountForm: undefined;
  UserInfo: { userData: UserListData };
  Dashboard: undefined;
  DepositForm: undefined;
  WithdrawForm: undefined;
  UpdateProfile: { userData: UserData };
  ViewBranches: undefined
  AllAccounts: {accountDetails: AccountDetails[]}
  TransactionHistoryScreen:undefined
  AddNewAccount: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  const { isAuthenticated, loading, isCustomer } = useAuth();

  if (loading) {
    // Show a loading spinner or placeholder
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={(isAuthenticated && isCustomer) ?'Dashboard' :(isAuthenticated && !isCustomer) ? 'Home' : 'LoginScreen'}>
          <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Home' component={HomeScreen} options={{ headerLeft: () => null }} />
          <Stack.Screen name='AccountForm' component={AccountForm} options={{ headerTitle: 'Account Form' }}/>
          <Stack.Screen name='UserInfo' component={UserInfo}  options={{ headerTitle: 'User Information' }}/>
          <Stack.Screen name='Dashboard' component={Dashboard} />
          <Stack.Screen name='DepositForm' component={DepositForm} options={{ headerTitle: 'Deposit Form' }} />
          <Stack.Screen name='WithdrawForm' component={WithdrawForm} options={{ headerTitle: 'Withdraw Form' }}/>
          <Stack.Screen name='UpdateProfile' component={UpdateProfile}  options={{ headerTitle: 'Update Profile' }}/>
          <Stack.Screen name='ViewBranches' component={ViewBranches} options={{ headerTitle: 'View Branches' }}/>
          <Stack.Screen name='AllAccounts' component={AllAccounts} options={{ headerTitle: 'All Accounts' }} />
          <Stack.Screen name='TransactionHistoryScreen' component={TransactionHistoryScreen} options={{ headerTitle: 'Transaction History' }} />
          <Stack.Screen name='AddNewAccount' component={AddNewAccount} options={{ headerTitle: 'Add New Account' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
