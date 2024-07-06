import React, { useState } from "react";
import { withChatContext } from "../context/ChatProvider";
import { Header, Avatar, Error } from "../components";
import styles from "./styles/profile";
import { Auth, Axios, Colors, Strings, Urls } from "../config";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import useStyle from "./styles/profile";
import { useHeight, useWidth } from "../api/Dimensions";
import Success from "../components/Success";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import axios from "axios";

function EditScreen({ chat, navigation }) {
  const window = useWindowDimensions();
  const styles = useStyle(window);
  const h = useHeight(window.height);
  const w = useWidth(window.width);

  let user = chat?.user;

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [about, setAbout] = useState(
    user?.state || Strings.DEFAULT_STATUS_MESSAGE
  );
  const [name, setName] = useState(user?.name);
  const [avatar, setAvatar] = useState(user?.avatar);

  async function handleChoosePhoto() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.canceled) {
      setAvatar(result.assets[0]);
    }
  }

  const validate = () => {
    Keyboard.dismiss();
    let errors = [];
    const isName = !name || name === "";
    const isAbout = !about || about === "";
    if (isName) {
      errors.push("الاسم");
    }
    if (isAbout) {
      errors.push("رسالة الحالة");
    }
    if (errors.length > 0) {
      const error = "الرجاء ادخال " + errors.join(" و");
      console.log(error);
      setError(error);
      return false;
    }
    return true;
  };

  async function save() {
    setError(null);
    setSuccess(null);
    if (!validate()) return;

    const data = new FormData();
    data.append("name", name);
    data.append("about", about);

    if (avatar instanceof Object) {
      if(Platform.OS === 'web') {
        const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
          const byteCharacters = atob(b64Data);
          const byteArrays = [];
        
          for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
        
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
            }
        
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
          }
        
          const blob = new Blob(byteArrays, { type: contentType });
          return blob;
        }
        
        const imageType = avatar.uri.split(";")[0].slice(5);
        const blob = b64toBlob(avatar.uri.split(',')[1], imageType);
        const file = new File([blob], 'avatar.' + imageType.split('/')[1], { type: imageType });
        data.append("avatar", file, 'avatar.' + imageType.split('/')[1]);
        
      }else {
        data.append(
          "avatar",
          {
            uri: avatar.uri,
            name: "avatar",
            type: mime.getType(avatar.uri),
          },
          avatar.uri
        );
      }
    }
    try {
      const token = await Auth.getToken();
      const res = axios({
        method: "post",
        url: Urls.UPDATE_PROFILE,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
        data,
      });
      setSuccess(Strings.PROFILE_UPDATED);
    } catch (e) {
      console.log(e);
      // setError(e.response.data.message);
    }
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar backgroundColor={Colors.GRAY} barStyle="light-content" />
      <Header title={Strings.TITLE_PROFILE} navigation={navigation} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ backgroundColor: Colors.WHITE }}
      >
        <View style={{height: h(90)}}>
          <View
            style={{
              backgroundColor: Colors.GRAY,
              padding: h(2),
            }}
          >
            <View
              style={{
                rowGap: h(2),
              }}
            >
              <TouchableOpacity onPress={() => handleChoosePhoto()}>
                <Avatar
                  source={avatar}
                  type="profile"
                  style={{
                    width: h(30),
                    height: h(30),
                    borderRadius: 180,
                    alignSelf: "center",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: h(2),
              alignItems: "center",
              textAlign: "center",
              gap: h(1),
              fontWeight: "bold",
              height: h(46),
              width: w(100),
              alignSelf: "center",
            }}
          >
            {error && <Error error={error} />}
            {success && <Success success={success} />}
            <Text
              style={{
                fontSize: h(2.5),
                alignSelf: "flex-end",
                marginRight: w(10),
                marginBottom: -h(0.8),
              }}
            >
              {Strings.NAME_PLACEHOLDER}
            </Text>
            <View
              style={{
                height: 45,
                borderWidth: h(0.1),
                borderColor: "#616571",
                borderRadius: 180,
                width: w(90),
                height: h(6),
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row-reverse",
              }}
            >
              <TextInput
                style={{
                  width: "88%",
                  textAlign: "right",
                  fontSize: h(2.2),
                  paddingVertical: h(1),
                  // outlineStyle: 'none',
                }}
                placeholder={Strings.NAME_PLACEHOLDER}
                placeholderTextColor="#616571"
                onChangeText={setName}
                keyboardType="visible-password"
                value={name}
                maxLength={20}
              />
            </View>
            <Text
              style={{
                fontSize: h(2.5),
                alignSelf: "flex-end",
                marginRight: w(10),
                marginBottom: -h(0.8),
              }}
            >
              {Strings.ABOUT_PLACEHOLDER}
            </Text>
            <View
              style={{
                height: 45,
                borderWidth: h(0.1),
                borderColor: "#616571",
                borderRadius: 180,
                width: w(90),
                height: h(6),
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row-reverse",
              }}
            >
              <TextInput
                style={{
                  width: "88%",
                  textAlign: "right",
                  fontSize: h(2.2),
                  paddingVertical: h(1),
                  // outlineStyle: 'none',
                }}
                placeholder={Strings.ABOUT_PLACEHOLDER}
                placeholderTextColor="#616571"
                onChangeText={setAbout}
                value={about}
                maxLength={100}
              />
            </View>

            <View style={{ marginTop: h(1) }}>
              <TouchableOpacity onPress={save}>
                <View
                  style={[
                    {
                      width: w(90),
                      height: h(7),
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 180,
                    },
                    { backgroundColor: "#50abff" },
                  ]}
                >
                  <Text
                    style={{
                      color: "#f2f2f2",
                      fontSize: h(2.3),
                    }}
                  >
                    {Strings.SAVE}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Password");
                }}
              >
                <View
                  style={[
                    {
                      width: w(90),
                      height: h(7),
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 180,
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Text style={{ color: Colors.BLACK, fontSize: h(2.3) }}>
                    {Strings.CHANGE_PASSWORD}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  chat.logout();
                  setTimeout(() => {
                    navigation.navigate("Login");
                  }, 200)
                }}
              >
                <View
                  style={[
                    {
                      width: w(90),
                      height: h(7),
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 180,
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Text style={{ color: Colors.BLACK, fontSize: h(2.3) }}>
                    {Strings.LOGOUT}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default withChatContext(EditScreen);
