import io from 'socket.io-client'
import { Auth, Strings, Urls } from '../config'
import { createContext, useEffect, useRef, useState } from 'react'
import moment from 'moment'

const ChatContext = createContext()

export function ChatProvider(props) {
  const [state, setState] = useState({
    connected: false,
    socket: null,
    contact: null,
    contacts: null,
    messages: null,
    account: null,
    typing: false
  })

  const timeoutRef = useRef(null)

  useEffect(() => {
    const { socket } = state
    if(!socket) return () => {}
    socket?.on('connect', () => setState((prev) => {return {...prev, connected: true}}))
    socket?.on('disconnect', () => setState((prev) => {return {...prev, connected: false}}))
    socket?.on('data', onData)
    socket?.on('user_status', updateUsersState)
    // socket?.on('typing', onTypingMessage)
    socket?.on('message', onNewMessage)

    return () => {
      socket?.off('connect')
      socket?.off('disconnect')
      socket?.off('data')
      socket?.off('user_status')
      socket?.off('message')
      socket?.off('typing')
    }
  }, [state])
  
  async function connect() {
    const token = await Auth.getToken()
    const socket = io(Urls.SOCKET, {query: 'token=' + token})
    setState((prev) => {return {...prev, socket}})
  }

  function onData({user, contacts, messages}) {
    messages = messages.map(formatMessage)
    setState((prev) => {return {...prev, account: user, contacts, messages}})
  }

  function updateUsersState(statusId) {
    let contacts = state.contacts.map((contact) => {
        if(statusId[contact.id]) contact.status = statusId[contact.id]
        return contact
    })
    let contact = state.contact
    if(contact && statusId[contact.id]) contact.status = statusId[contact.id]
    setState(prev => { return {...prev, contacts, contact} })
  }

  function setCurrentContact(contact) {
    if(!contact || !contact.id) return
    const { socket } = state
    socket.emit('seen', contact.id)
    let messages = state.messages
    messages.forEach((message, index) => {
      if(message.sender === contact.id) message.seen = true
    })
    setState(prev => {return {...prev, contact, messages}})
  }

  function formatMessage(message) {
    message._id = message._id || message.date;
    message.text = message.content;
    message.createdAt = message.date;
    message.user = { _id: message.sender };
    return message;
  }

  function onNewMessage(message) {
    const { socket, contact, messages } = state
    if(message.sender === contact.id) {
      setState(prev => {return {...prev, typing: false}})
      socket.emit('seen', contact.id)
      message.seen = true
    }
    setState(prev => {return {...prev, messages: messages.concat(formatMessage(message))}})
  }

  function sendMessage(content) {
    const { socket, account, contact } = state
    if(!contact.id) return
      let message = {
        content: content,
        sender: account.id,
        receiver: contact.id,
        date: new Date().getTime()
      }
      message = formatMessage(message)
      socket.emit('message', message)
  }

  function onTypingMessage(sender) {
    const { contact, typing } = state
    if(contact.id != sender) return
    setState(prev => {return {...prev, typing: sender}})
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setState(prev => {return {...prev, typing: false}})
    }, 2000)
  }

  function sendType() {
    const { socket, contact } = state
    socket.emit('typing', contact.id)
  }

  function status() {
    const { contact, typing } = state
    let status = contact.status
    if(typing) return Strings.WRITING_NOW
    if(status == true) return Strings.ONLINE
    if(status) return moment(status).fromNow()
  }

  return (
    <ChatContext.Provider value={{...state, setCurrentContact, connect, sendMessage, sendType, status}}>
      {props.children}
    </ChatContext.Provider>
  )
}

export function withChatContext(Component) {
  function ComponentWithChat(props) {
    return (
      <ChatContext.Consumer>
        {chat => <Component {...props} chat={chat} />}
      </ChatContext.Consumer>
    )
  }

  return ComponentWithChat
}