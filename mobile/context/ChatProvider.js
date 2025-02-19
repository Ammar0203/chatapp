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
    user: null,
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
    socket?.on('typing', onTypingMessage)
    socket?.on('message', onNewMessage)
    socket?.on('new_user', onNewUser)
    socket?.on('update_user', onUpdateUser)

    return () => {
      socket?.off('connect')
      socket?.off('disconnect')
      socket?.off('data')
      socket?.off('user_status')
      socket?.off('message')
      socket?.off('typing')
      socket?.off('new_user')
      socket?.off('update_user')
    }
  }, [state])
  
  async function connect() {
    const token = await Auth.getToken()
    const socket = io(Urls.SOCKET, {query: 'token=' + token})
    setState((prev) => {return {...prev, socket}})
  }

  function onData({user, contacts, messages}) {
    messages = messages.map(formatMessage)
    setState((prev) => {return {...prev, user: user, contacts, messages}})
  }

  function updateUsersState(statusId) {
    let contacts = state.contacts?.map((contact) => {
        if(statusId[contact.id]) contact.status = statusId[contact.id]
        return contact
    })
    let contact = state.contact
    if(contact && statusId[contact.id]) contact.status = statusId[contact.id]
    setState(prev => { return {...prev, contacts, contact} })
  }

  function setCurrentContact(contact) {
    if(!contact || !contact.id) return setState(prev => {return {...prev, contact: null}})
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
    if(!messages) messages = [];
    if(message.sender === contact?.id) {
      setState(prev => {return {...prev, typing: false}})
      socket.emit('seen', contact.id)
      message.seen = true
    }
    setState(prev => {return {...prev, messages: messages.concat(formatMessage(message))}})
  }

  function sendMessage(content) {
    const { socket, user, contact } = state
    if(!contact.id) return
      let message = {
        content: content,
        sender: user.id,
        receiver: contact.id,
        date: new Date().getTime()
      }
      message = formatMessage(message)
      socket.emit('message', message)
  }

  function onTypingMessage(sender) {
    const { contact, typing } = state
    if(contact?.id != sender) return
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
    if(status) {
      if(moment(status).format("Do MMM YYYY") == moment().format("Do MMM YYYY")) return `اخر ظهور ${moment(status).format('h:mm a')}`
      return `اخر ظهور ${moment(status).format('Do MMM YYYY')}`
    }
  }

  function onNewUser(user) {
    const contacts = state.contacts.concat(user)
    setState(prev => { return {...prev, contacts} })
  }

  function onUpdateUser(user) {
    if(state.user.id === user.id) {
        setState(prev => { return {...prev, user} })
        Auth.updateProfile(user)
        return;
    }
    let contacts = state.contacts.map(contact => {
        if(contact.id === user.id) contact = user
        return contact
    })
    setState(prev => { return {...prev, contacts} })
    if(state.contact?.id === user.id) setState(prev => { return {...prev, contact: user} })
  }

  function logout() {
    state.socket.disconnect()
    setState({
      connected: false,
      socket: null,
      contact: null,
      contacts: null,
      messages: null,
      user: null,
      typing: false
    })
    Auth.logout()
  }

  return (
    <ChatContext.Provider value={{...state, setCurrentContact, connect, sendMessage, sendType, status, logout}}>
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