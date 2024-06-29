import React, { useRef, useState, useEffect } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Keyboard,
  Platform
} from 'react-native';
import useStyle from "../screens/styles/chat";
import { useHeight, useWidth } from "../api/Dimensions";
import { Colors, Strings } from "../config";
import moment from 'moment';

function Chat({ chat, onSend, onMessageChange, onKeyDown, text, addNewLine }) {
  const window = useWindowDimensions();
  const styles = useStyle(window);
  const h = useHeight(window.height);
  const w = useWidth(window.width);

  const scrollRef = useRef();
  const scrollOffset = useRef(0);
  const [isAtBottom, setIsAtBottom] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => handleKeyboardDidShow(e)
    );
    // const keyboardDidHideListener = Keyboard.addListener(
    //   'keyboardDidHide',
    //   (e) => handleKeyboardDidHide(e)
    // );

    return () => {
      // keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleKeyboardDidShow = (e) => {
    console.log("Keyboard did show, restoring scroll position:", scrollOffset.current);
    console.log('Keyboards height:', e.endCoordinates.height)
    setTimeout(() => {
      scrollRef.current.scrollTo({ y: scrollOffset.current + e.endCoordinates.height, animated: true });
    }, 100)
  };

  // const handleKeyboardDidHide = () => {
    // if (isAtBottom) {
    //   console.log("Keyboard did hide, scrolling to end");
    //   scrollRef.current.scrollToEnd({ animated: true });
    // }
  // };

  const handleContentSizeChange = () => {
    if (
      isAtBottom ||
      chat.messages[chat.messages.length - 1].sender === chat.account.id
    ) {
      console.log("Content size changed, scrolling to end");
      scrollRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20; // Adjust the threshold as needed
    setIsAtBottom(isBottom);
    scrollOffset.current = contentOffset.y;
    console.log("Scroll offset:", contentOffset.y, "Is at bottom:", isBottom);
  };

  function NewDay({ date, children }) {
    return (
      <>
        <View style={{ alignItems: "center", margin: h(2) }}>
          <Text style={{ fontSize: h(2), color: Colors.GRAY }}>
            {date === moment().format("Do MMM YYYY")
              ? "اليوم"
              : date}
          </Text>
        </View>
        {children}
      </>
    );
  }

  function OutcommingMessage({ message }) {
    return (
      <View
        style={{
          backgroundColor: Colors.LIGHTGRAY,
          alignSelf: "flex-start",
          marginHorizontal: w(3.5),
          marginVertical: h(1),
          marginRight: h(3),
          paddingHorizontal: w(2),
          paddingVertical: h(1),
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: h(2.4), color: Colors.BLACK }}>
          {message.content}
        </Text>
        <View
          style={{
            alignSelf: "flex-start",
            marginHorizontal: h(0.5),
            marginTop: h(0.5),
          }}
        >
          <Text style={{ fontSize: h(1.9), color: Colors.BLACK, opacity: 0.8 }}>
            {moment(message.date).format("h:mm a")}
          </Text>
        </View>
      </View>
    );
  }

  function IncommingMessage({ message }) {
    return (
      <View
        style={{
          backgroundColor: Colors.BLUE,
          alignSelf: "flex-end",
          marginHorizontal: w(3.5),
          marginVertical: h(1),
          marginLeft: h(3),
          paddingHorizontal: w(2),
          paddingVertical: h(1),
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: h(2.4), color: Colors.WHITE }}>
          {message.content}
        </Text>
        <View
          style={{
            alignSelf: "flex-end",
            marginHorizontal: h(0.5),
            marginTop: h(0.5),
          }}
        >
          <Text style={{ fontSize: h(1.9), color: Colors.WHITE, opacity: 0.9 }}>
            {moment(message.date).format("h:mm a")}
          </Text>
        </View>
      </View>
    );
  }

  function Messages() {
    let { contact } = chat;
    let messages = chat.messages.filter(
      (e) => e.sender === contact.id || e.receiver === contact.id
    );

    const groupMessagesByDate = (messages) => {
      return messages.reduce((acc, message) => {
        // const date = new Date(message.date).toDateString();
        const date = moment(message.date).format('Do MMM YYYY')
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(message);
        return acc;
      }, {});
    };

    const groupedMessages = groupMessagesByDate(messages);
    return (
      <>
        {Object.keys(groupedMessages).map((date) => (
          <NewDay date={date} key={date}>
            {groupedMessages[date].map((message, index) => (
              <View key={message.date + index}>
                {message.sender === chat.contact.id ? (
                  <OutcommingMessage message={message} key={message.date + "-incoming"} />
                ) : (
                  <IncommingMessage message={message} key={message.date + "-outgoing"} />
                )}
              </View>
            ))}
          </NewDay>
        ))}
      </>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.WHITE,
          width: w(100),
          alignSelf: "center",
        }}
      >
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
          ref={scrollRef}
          onContentSizeChange={handleContentSizeChange}
          onScroll={handleScroll}
          scrollEventThrottle={16} // Adjust as needed
        >
          <Messages />
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            height: h(7),
            alignItems: "center",
            justifyContent: "space-evenly",
            // borderTopWidth: 1
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => onSend()}
          >
            <Image
              source={require("../assets/images/sendIcon.png")}
              resizeMode="contain"
              style={{ height: h(5), width: h(5) }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder={Strings.WRITE_YOUR_MESSAGE}
            placeholderTextColor="#A0A0A0"
            multiline
            style={{
              overflow: 'hidden',
              width: w(85),
              height: h(7),
              padding: h(1),
              textAlign: "right",
            }}
            onFocus={() => {
              console.log("TextInput focused, current scroll offset:", scrollOffset);
            }}
            onChangeText={(text) => onMessageChange(text)}
            onKeyPress={(e) => onKeyDown(e)}
            value={text}
            onSubmitEditing={() => addNewLine()}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Chat;