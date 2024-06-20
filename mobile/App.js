import 'moment/locale/ar';
import { useEffect, useState } from "react";
import * as Font from 'expo-font'
import { StyleSheet } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { Loader } from "./component";
import { Auth, Strings } from "./config";
import { ChatProvider } from './context/ChatProvider';
import ChatScreen from './screens/ChatScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false)

  const _auth = async () => {
    const authenticated =  await Auth.auth()
    if(authenticated) setIsSignedIn(authenticated)
  }
  _auth()

  useEffect(() => {
    _getFonts()
    setIsLoading(false)
  }, [])
  
  const _getFonts = async () => {
    await Font.loadAsync({
      'noto-font' : require('./assets/fonts/NotoKufiArabic-Regular.ttf')
    })
  }
  
  if (isLoading) return (
    <Loader title={Strings.PLEASE_WAIT} loading={isLoading} />
  )

  return (
    <ChatProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name='Login' component={LoginScreen}/>
          <Stack.Screen name='Register' component={RegisterScreen}/>
          <Stack.Screen name='Home' component={HomeScreen} 
            options={{
              gestureEnabled: false,
              // headerShown: true,
              headerLeft: () => <></>,
            }}
          />
          <Stack.Screen name='Chat' component={ChatScreen} 
            options={{
              // gestureEnabled: false,
              // headerShown: true,
              // headerLeft: () => <></>,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ChatProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})