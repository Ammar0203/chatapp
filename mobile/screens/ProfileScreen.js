import React from "react";
import { withChatContext } from "../context/ChatProvider";
import { Header, Avatar } from "../components";
import styles from "./styles/profile";
import { Colors, Strings } from "../config";
import { Text, View, useWindowDimensions } from "react-native";
import useStyle from "./styles/profile";
import { useHeight, useWidth } from "../api/Dimensions";

function ProfileScreen(props) {
  const window = useWindowDimensions();
  const styles = useStyle(window);
  const h = useHeight(window.height);
  const w = useWidth(window.width);

  let contact = props.chat.contact;
  let status = props.chat.status();
  return (
    <View>
      <Header title={Strings.TITLE_PROFILE} />
      <View>
        <View
          style={{
            backgroundColor: Colors.GRAY,
            padding: h(4)
          }}
        >
          <View 
            style={{
              rowGap: h(2)
            }}
          >
            <Avatar
              source={contact.avatar}
              type="profile"
              style={{
                width: h(30),
                height: h(30),
                borderRadius: 180,
                alignSelf: 'center'
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                color: Colors.WHITE,
                fontSize: h(3)
              }}
            >
              {contact.name}
            </Text>
            <Text
              style={{
                alignSelf: "center",
                marginTop: 10,
                color: Colors.WHITE,
                fontSize: h(2.3),
                opacity: 0.8
              }}
            >
              {status}
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{
              alignSelf: "center",
              marginTop: 20,
              fontSize: h(4),
            }}
          >
            {contact.about || Strings.DEFAULT_STATUS_MESSAGE}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default withChatContext(ProfileScreen);
