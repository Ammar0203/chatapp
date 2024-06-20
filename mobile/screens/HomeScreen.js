import { Platform, View, useWindowDimensions, ScrollView, BackHandler, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Strings } from '../config'
import { useEffect, useState } from 'react'
import { Contacts, HomeHeader, Loader } from '../component'
import useStyle from './styles/contacts'
import { useHeight, useWidth } from '../api/Dimensions'
import { withChatContext } from '../context/ChatProvider'

function HomeScreen({ navigation, chat }) {
  const window = useWindowDimensions()
  const styles = useStyle(window)
  const h = useHeight(window.height)
  const w = useWidth(window.width)

  const [exitApp, setExitApp] = useState(0)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    chat.connect()
  }, [])
  
  useEffect(() => {
    if(chat.contacts) setIsLoading(false)
  }, [chat])

  function onContactClick(contact) {
    chat.setCurrentContact(contact)
    navigation.navigate('Chat')
  }

  if(Platform.OS !== 'web'){
    var backAction = () => {
      setTimeout(() => {
        setExitApp(0)
      }, 2000)
  
      if(exitApp === 0) {
        setExitApp(exitApp + 1)
      } else if (exitApp === 1) {
        BackHandler.exitApp()
      }
      return true
    }
    useEffect(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      )
      return () => {
        backHandler.remove()
      }
    })
  }

  useEffect(() => {
    const preventBack = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault()
    })
    return preventBack
  }, [navigation])

  return (
    <>
      <StatusBar backgroundColor={Colors.GRAY} barStyle='light-content' />
      <Loader title={Strings.PLEASE_WAIT} loading={isLoading} />
      <SafeAreaView style={styles.scrollView}>
        <View style={styles.container}>
          <HomeHeader search={search} setSearch={setSearch} />
          <Contacts contacts={chat.contacts} messages={chat.messages} search={search} onContactClick={onContactClick}/>
        </View>
      </SafeAreaView>
    </>
  )
}
export default withChatContext(HomeScreen)