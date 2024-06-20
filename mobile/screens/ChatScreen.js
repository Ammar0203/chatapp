import { Platform, useWindowDimensions, StatusBar, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Image } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { ChatHeader } from '../component'
import useStyle from './styles/chat'
import { useHeight, useWidth } from '../api/Dimensions'
import { withChatContext } from '../context/ChatProvider'
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import { Colors, Strings } from '../config'
import moment from 'moment'

function ChatScreen({ navigation, chat, route }) {
  const window = useWindowDimensions()
  const styles = useStyle(window)
  const h = useHeight(window.height)
  const w = useWidth(window.width)

  const textRef = useRef(null)
  const lastTypeRef = useRef(false)

  const [r, re] = useState(false)
  if(Platform.OS === 'web' && !r) {
    setTimeout(() => re(!r), 50)
  }

  useEffect(() => {
    return () => {
      chat.setCurrentContact(null)
    }
  }, [])

  function onSend() {
    let content = textRef?.current?.trim()
    if(!content) return
    chat.sendMessage(content)
    lastTypeRef.current = false
    textRef.current = ''
  }

  function onMessageChange(message) {
    textRef.current = message
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

  let { account, contact } = chat
  let messages = chat.messages.filter(
    e => e.sender === contact.id || e.receiver === contact.id
  )

  const CustomInputToolbar = (props) => {
    return (
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          {/* Your icon or component goes here */}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder={Strings.WRITE_YOUR_MESSAGE}
          placeholderTextColor="#A0A0A0"
          multiline
          onKeyPress={onKeyDown}
          onChangeText={onMessageChange}
          {...props.textInputProps}
        />
        <TouchableOpacity style={styles.sendContainer} onPress={onSend}>
          {/* Your send icon or component goes here */}
          <Image source={require('../assets/images/sendIcon.png')} resizeMode='contain' style={{height: h(4), width: h(4)}} />
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <>
      <StatusBar backgroundColor={Colors.GRAY} barStyle='light-content' />
      <ChatHeader navigation={navigation}/>
      <GiftedChat 
        user={{_id: account.id}}
        messages={messages.reverse()}
        renderAvatar={null}
        renderInputToolbar={(props) => <CustomInputToolbar {...props} />}
        messagesContainerStyle={{backgroundColor: 'white'}}
        onSend={onSend}
      />
    </>
  )
}
export default withChatContext(ChatScreen)