import { Image, Text, View, useWindowDimensions, TouchableOpacity } from "react-native";
import { withChatContext } from "../context/ChatProvider";
import useStyle from "../screens/styles/chat";
import { useHeight, useWidth } from "../api/Dimensions";
import moment from "moment";
import Avatar from "./Avatar";

function ChatHeader({navigation, chat}) {
  const window = useWindowDimensions()
  const styles = useStyle(window)
  const h = useHeight(window.height)
  const w = useWidth(window.width)

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.left}>
          <View>
            <Text style={styles.name}>{chat.contact.name}</Text>
          </View>
          <View>
            <Text style={styles.status}>{chat?.status()}</Text>
          </View>
        </View>
        <View style={styles.center}>
          <TouchableOpacity>
            <Avatar source={chat?.contact?.avatar} style={styles.avatar} />
          </TouchableOpacity>
        </View>
        <View style={styles.right}>
          <TouchableOpacity onPress={() => {chat.setCurrentContact(null); navigation.goBack(null)}}>
            <Image source={require('../assets/images/backBtn.png')} style={styles.backBtn} resizeMode='contain' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default withChatContext(ChatHeader)