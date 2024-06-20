import { FlatList, Image, Pressable, Text, View, useWindowDimensions } from "react-native"
import useStyle from "../screens/styles/contacts"
import { useHeight, useWidth } from "../api/Dimensions"
import Contact from "./Contact"
import { useState } from "react"

export default function Contacts({onContactClick, contacts, messages, search = ''}) {
  const window = useWindowDimensions()
  const styles = useStyle(window)
  const h = useHeight(window.height)
  const w = useWidth(window.width)

  const setMessageAndCounter = contact => {
    let _messages = messages.filter(e => e.sender === contact.id || e.receiver === contact.id)
    contact.lastMessage = _messages[_messages.length - 1]
    contact.counter = _messages.filter(e => !e.seen && e.sender === contact.id ).length
    return contact
  }

  const renderContact = (contact) => {
    if(!contact.name.includes(search)) return
    contact = setMessageAndCounter(contact)
    return (
      <Contact contact={contact} onClick={onContactClick} key={contact.id}/>
    )
  }

  return (
    <View style={styles.contactsContainer}>
      <FlatList 
        showsVerticalScrollIndicator={false}
        data={contacts}
        renderItem={(({item}) => renderContact(item))}
      />
    </View>
  )
}