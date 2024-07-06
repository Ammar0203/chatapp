import {
  Platform,
  View,
  useWindowDimensions,
  ScrollView,
  BackHandler,
  StatusBar,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useStyle from "./styles/auth";
import { useHeight, useWidth } from "../api/Dimensions";
import { withChatContext } from "../context/ChatProvider";
import { Auth, Colors, Strings, Urls } from "../config";
import { Error, Header } from "../components";
import { useState } from "react";
import axios from "axios";
import Success from "../components/Success";

function PasswordScreen({ navigation, chat }) {
  const window = useWindowDimensions();
  const styles = useStyle(window);
  const h = useHeight(window.height);
  const w = useWidth(window.width);

  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validate = () => {
    Keyboard.dismiss();
    let errors = [];
    const isPassword = !password || password === "";
    const isNewPassword = !newPassword || newPassword === "";
    if (isPassword) {
      errors.push("كلمة المرور الحالية");
    }
    if (isNewPassword) {
      errors.push("كلمة المرور الجديدة");
    }
    if (errors.length > 0) {
      const error = "الرجاء ادخال " + errors.join(" و");
      console.log(error);
      setError(error);
      return false;
    }
    return true;
  };

  async function send() {
    setSuccess(null);
    setError(null);
    if(!validate()) return;
    const data = {password, newPassword}
    try {
      axios.defaults.headers.common.Authorization = await Auth.getToken()
      await axios.post(Urls.CHANGE_PASSWORD, data)
      setSuccess('تم تغير كلمة المرور')
    }catch(err) {
      console.log(err.response.data.message)
      setError(err.response.data.message)
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar backgroundColor={Colors.GRAY} barStyle="light-content" />
      <View style={styles.container}>
        <Header title={Strings.CHANGE_PASSWORD} navigation={navigation} />
        <ScrollView keyboardShouldPersistTaps="handled">
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
            <View style={[styles.textInputContainer, {marginTop: h(1)}]}>
              <Image
                style={styles.textInputIcon}
                source={require("../assets/images/lock.png")}
                resizeMode="contain"
              />
              <TextInput
                style={styles.textInputForm}
                placeholder={Strings.PASSWORD_PLACEHOLDER}
                placeholderTextColor="#616571"
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <View style={styles.textInputContainer}>
              <Image
                style={styles.textInputIcon}
                source={require("../assets/images/lock.png")}
                resizeMode="contain"
              />
              <TextInput
                style={styles.textInputForm}
                placeholder={Strings.NEW_PASSWORD_PLACEHOLDER}
                placeholderTextColor="#616571"
                onChangeText={setNewPassword}
                secureTextEntry
              />
            </View>

            <View style={{ marginTop: h(1) }}>
              <TouchableOpacity onPress={() => send()}>
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
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
export default withChatContext(PasswordScreen);
