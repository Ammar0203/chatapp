import { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { Auth, Axios, Strings, Urls } from "../config";
import companyLogo from "../assets/images/logo.png";
import useStyle from "./styles/auth";
import { useWidth, useHeight } from "../api/Dimensions";
import { Error, Loader } from "../components";

export default function RegisterScreen({ navigation, route }) {
  const window = useWindowDimensions();
  const styles = useStyle(window);
  const w = useWidth(window.width);
  const h = useHeight(window.height);

  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    _bootstrapAsync();
  }, []);

  const _bootstrapAsync = async () => {
    const authenticated = await Auth.auth();
    if (authenticated) {
      // await navigation.navigate("Home");
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}, { name: "Chat"}, { name: "Profile"}],
      });
    } else setIsLoading(false);
  };

  const validate = () => {
    Keyboard.dismiss();
    let errors = [];
    const isName = !name || name === "";
    const isUsername = !username || username === "";
    const isPassword = !password || password === "";
    if (isName) {
      errors.push("الاسم");
    }
    if (isUsername) {
      errors.push("اسم المستخدم");
    }
    if (isPassword) {
      errors.push("كلمة المرور");
    }
    if (errors.length > 0) {
      const error = "الرجاء ادخال " + errors.join(" و");
      setError(error);
      return false;
    }
    return true;
  };

  const register = async () => {
    if (!validate()) return;

    let data = {
      name,
      username,
      password,
    };
    try {
      setIsLoading(true);
      let response = await Axios.post(Urls.REGISTER, data);
      Auth.setUser(response.data);
      navigation.navigate("Home");
      setIsLoading(false);
    } catch (e) {
      setError(e.response.data.message);
    }
    setIsLoading(false);
  };

  const backToLogin = () => navigation.navigate("Login");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Loader title={Strings.PLEASE_WAIT} loading={isLoading} />
      <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>  
        <View style={styles.imageHeaderContainer}>
          <Image
            style={styles.imageHeaderStyle}
            source={companyLogo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formTextHeader}>
            {Strings.TITLE_CREATE_NEW_ACCOUNT}
          </Text>
          {error && <Error error={error} />}

          <View style={styles.textInputContainer}>
            <Image
              style={styles.textInputIcon}
              source={require("../assets/images/person.png")}
              resizeMode="contain"
            />
            <TextInput
              style={styles.textInputForm}
              placeholder={Strings.NAME_PLACEHOLDER}
              placeholderTextColor="#616571"
              onChangeText={setName}
              keyboardType="visible-password"
            />
          </View>

          <View style={styles.textInputContainer}>
            <Image
              style={styles.textInputIcon}
              source={require("../assets/images/person.png")}
              resizeMode="contain"
            />
            <TextInput
              style={styles.textInputForm}
              placeholder={Strings.USERNAME_PLACEHOLDER}
              placeholderTextColor="#616571"
              onChangeText={setUsername}
              keyboardType="visible-password"
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
              placeholder={Strings.PASSWORD_PLACEHOLDER}
              placeholderTextColor="#616571"
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View>
            <Pressable onPress={register}>
              <View
                style={[
                  styles.pressableContent,
                  { backgroundColor: "#50abff" },
                ]}
              >
                <Text style={{ color: "#f2f2f2", fontSize: h(2.3) }}>
                  {Strings.CREATE_NEW_ACCOUNT}
                </Text>
              </View>
            </Pressable>
          </View>

          <View>
            <Pressable onPress={backToLogin}>
              <View
                style={[
                  styles.pressableContent,
                  { borderWidth: h(0.1), borderColor: "#616571" },
                ]}
              >
                <Text style={{ color: "#616571", fontSize: h(2.3) }}>
                  {Strings.BACK_TO_LOGIN}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
