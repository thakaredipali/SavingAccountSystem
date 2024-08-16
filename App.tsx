import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/Admin'
import { LoginScreen } from './src/screens/login'
import { enableScreens } from 'react-native-screens';
import MainForm from './src/components/AccountForm'
import { Provider } from 'react-redux'
import { store } from './src/redux/store/store'
import UserInfo from './src/screens/UserInfo'
import { UserListData } from './src/screens/Admin/type'



enableScreens();
export type RootStackParamList = {
  LoginScreen: undefined;
  Home: undefined
  MainForm: undefined
  UserItem: undefined
  UserInfo: { userData: UserListData };
};


const Stack = createNativeStackNavigator<RootStackParamList>()

function App(): JSX.Element{
  return (
 <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName= 'LoginScreen'>
      <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Home' component={HomeScreen}  options={{ 
                        headerLeft: () => null,
                    }} />
      <Stack.Screen name='MainForm' component={MainForm}/>
      <Stack.Screen name='UserInfo' component={UserInfo}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App