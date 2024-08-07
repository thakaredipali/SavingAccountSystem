import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { LoginScreen } from './src/screens/login'




const App = () => {
  return (
    <SafeAreaView>
      <ScrollView>
      <LoginScreen/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App