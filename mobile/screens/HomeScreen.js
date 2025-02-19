import { Platform, View, useWindowDimensions, ScrollView, BackHandler, StatusBar, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Auth, Colors, Strings } from '../config'
import { useEffect, useState } from 'react'
import { Contacts, HomeHeader, Loader } from '../components'
import useStyle from './styles/contacts'
import { useHeight, useWidth } from '../api/Dimensions'
import { withChatContext } from '../context/ChatProvider'

function HomeScreen({ navigation, chat }) {
  const window = useWindowDimensions()
  const styles = useStyle(window)
  const h = useHeight(window.height)
  const w = useWidth(window.width)

  // const [exitApp, setExitApp] = useState(0)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    chat.connect()
  }, [])
  
  useEffect(() => {
    if(chat.contacts) {setIsLoading(false)}
    chat.socket?.on('error', onSocketError)
    return () => {
      chat.socket?.off('error')
    }
  }, [chat])
  
  function onSocketError(error) {
    if (error === 'auth_error') {
      Auth.logout()
      navigation.navigate('Login')
    }
  }
  
  function onContactClick(contact) {
    chat.setCurrentContact(contact)
    navigation.navigate('Chat')
  }

  // if(Platform.OS !== 'web'){
  //   const navigation = useNavigation();
  //   const { routes, index } = navigation.getState();
  //   const currentRoute = routes[index].name;
  //   var backAction = () => {
  //     // if (currentRoute !== 'Home') return true
  //     setTimeout(() => {
  //       setExitApp(0)
  //     }, 2000)
  
  //     if(exitApp === 0) {
  //       setExitApp(exitApp + 1)
  //     } else if (exitApp === 1) {
  //       BackHandler.exitApp()
  //     }
  //     return true
  //   }
  //   useEffect(() => {
  //     if (currentRoute == 'Home') {
  //       const backHandler = BackHandler.addEventListener(
  //         'hardwareBackPress',
  //         backAction,
  //       )
  //       return () => {
  //         backHandler.remove()
  //       }
  //     }
  //   })
  // }

  useEffect(() => {
    const preventBack = navigation.addListener('beforeRemove', (e) => {
      // chat.logout()
      if(!chat.connected) return;
      e.preventDefault()
    })
    return preventBack
  }, [navigation, chat])
  
  return (
    <>
      <StatusBar backgroundColor={Colors.GRAY} barStyle='light-content' />
      <Loader title={Strings.PLEASE_WAIT} loading={isLoading} />
      <SafeAreaView style={styles.scrollView}>
        <View style={styles.container}>
          <HomeHeader search={search} setSearch={setSearch} navigation={navigation} />
          <Contacts contacts={chat.contacts} messages={chat.messages} search={search} onContactClick={onContactClick}/>
        </View>
      </SafeAreaView>
    </>
  )
}
export default withChatContext(HomeScreen)