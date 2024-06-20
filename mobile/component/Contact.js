import { Image, Pressable, Text, TouchableOpacity, View, useWindowDimensions } from "react-native"
import useStyle from "../screens/styles/contacts"
import { useHeight, useWidth } from "../api/Dimensions"
import moment from "moment"
import { Strings } from "../config"
import Avatar from "./Avatar"

export default function Contact({ contact, onClick }) {
  const { name, avatar, counter, status, lastMessage } = contact
  const { date, content } = lastMessage ? lastMessage : {}

  const window = useWindowDimensions()
  const styles = useStyle(window)
  const h = useHeight(window.height)
  const w = useWidth(window.width)

  return (
    <TouchableOpacity onPress={() => onClick(contact)}>
      <View style={styles.contactContainer}>
        
        <View style={styles.avatarContainer}>
          <Avatar source={contact?.avatar} style={styles.avatar} />
          {status == true && <View style={styles.status}/>}
        </View>
        
        <View style={styles.contactLeft}>

          <View style={styles.nameMessage}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.message}>{content || Strings.CLICK_HERE_TO_START_CHAT}</Text>
          </View>

          <View style={styles.timeLastMessageContainer}>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{date ? moment(date).format('hh:mm a') : ''}</Text>
            </View>
            {counter > 0 && (
              <View style={styles.messagesNumberContainer}>
                <Text style={styles.messagesNumberText}>{counter}</Text>
              </View>
            )}
          </View>

        </View>
      </View>
    </TouchableOpacity>
  )
}