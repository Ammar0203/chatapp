import { Platform, useWindowDimensions, StatusBar, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Image, Text } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { ChatHeader, Chat } from '../components'
import useStyle from './styles/chat'
import { useHeight, useWidth } from '../api/Dimensions'
import { withChatContext } from '../context/ChatProvider'
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import { Colors, Strings } from '../config'
import moment from 'moment'
import { SafeAreaView } from 'react-native-safe-area-context'

function ChatScreen({ navigation, chat, route }) {
  const window = useWindowDimensions()
  const styles = useStyle(window)
  const h = useHeight(window.height)
  const w = useWidth(window.width)

  const textRef = useRef(null)
  const [text, setText] = useState('')
  const lastTypeRef = useRef(false)

  // it fixs a problem when opening a chat in web
  const [r, re] = useState(false)
  if(Platform.OS === 'web' && !r) {
    setTimeout(() => re(!r), 50)
  }
  // 

  useEffect(() => {
    return () => {
      chat.setCurrentContact(null)
    }
  }, [])

  function onSend() {
    let content = text?.trim()
    if(!content) return
    chat.sendMessage(content)
    lastTypeRef.current = false
    setText('')
  }

  function onMessageChange(message) {
    setText(message)
    let lastType = lastTypeRef.current
    if(!lastType || moment() - lastType > 2000){
      lastType = moment()
      chat.sendType()
    }
  }

  const onKeyDown = e => {
    if(Platform.OS === 'web' && e.key === 'Enter' && !e.shiftKey){
      onSend();
    } 
  };

  function addNewLine() {
    setText(Text + '\n')
  }

  // let { account, contact } = chat
  // let messages = chat.messages.filter(
  //   e => e.sender === contact.id || e.receiver === contact.id
  // )

  // const CustomInputToolbar = (props) => {
  //   return (
  //     <View style={styles.inputContainer}>
  //       <TouchableOpacity style={styles.iconContainer}>
  //         {/* Your icon or component goes here */}
  //       </TouchableOpacity>
  //       <TextInput
  //         style={styles.input}
  //         placeholder={Strings.WRITE_YOUR_MESSAGE}
  //         placeholderTextColor="#A0A0A0"
  //         multiline
  //         onKeyPress={onKeyDown}
  //         onChangeText={onMessageChange}
  //         {...props.textInputProps}
  //       />
  //       <TouchableOpacity style={styles.sendContainer} onPress={onSend}>
  //         {/* Your send icon or component goes here */}
  //         <Image source={require('../assets/images/sendIcon.png')} resizeMode='contain' style={{height: h(4), width: h(4)}} />
  //       </TouchableOpacity>
  //     </View>
  //   );
  // };


  return (
    <>
      <StatusBar backgroundColor={Colors.GRAY} barStyle='light-content' />
      <SafeAreaView style={{flex: 1}}>
          <ChatHeader navigation={navigation}/>
          <Chat chat={chat} onSend={onSend} onMessageChange={onMessageChange} onKeyDown={onKeyDown} text={text} addNewLine={addNewLine} />
          {/* <GiftedChat 
            user={{_id: account.id}}
            messages={messages.reverse()}
            renderAvatar={null}
            renderInputToolbar={(props) => <CustomInputToolbar {...props} />}
            messagesContainerStyle={{backgroundColor: 'white'}}
            onSend={onSend}
            /> */}
      </SafeAreaView>
    </>
  )
}

export default withChatContext(ChatScreen)