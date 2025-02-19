import { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { Auth, Axios, Colors, Strings, Urls } from "../config";
import companyLogo from "../assets/images/logo.png";
import useStyle from "./styles/auth";
import { useWidth, useHeight } from "../api/Dimensions";
import { Error, Loader } from "../components";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen({ navigation, route }) {
  const window = useWindowDimensions();
  const styles = useStyle(window);
  const w = useWidth(window.width);
  const h = useHeight(window.height);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    _bootstrapAsync();
  }, [navigation]);

  const _bootstrapAsync = async () => {
    const authenticated = await Auth.auth();
    if (authenticated) {
      setIsLoading(false)
      await navigation.navigate("Home");
    } else setIsLoading(false);
  };

  const validate = () => {
    Keyboard.dismiss();
    let errors = [];
    const isUsername = !username || username === "";
    const isPassword = !password || password === "";
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

  const login = async () => {
    setError(null)
    if (!validate()) return;

    let data = {
      username,
      password,
    };
    try {
      setIsLoading(true);
      let response = await Axios.post(Urls.AUTH, data);
      Auth.setUser(response.data);
      setIsLoading(false);
      navigation.navigate("Home");
    } catch (e) {
      setError(e.response.data.message);
    }
    setIsLoading(false);
  };

  const navToRegister = () => navigation.navigate("Register");

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar backgroundColor={Colors.GRAY} barStyle='light-content' />
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
          <Text style={styles.formTextHeader}>{Strings.LOGIN}</Text>

          {error && <Error error={error} />}

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
            <Pressable onPress={login}>
              <View
                style={[
                  styles.pressableContent,
                  { backgroundColor: "#50abff" },
                ]}
              >
                <Text style={{ color: "#f2f2f2", fontSize: h(2.3) }}>
                  {Strings.LOGIN}
                </Text>
              </View>
            </Pressable>
          </View>

          <View>
            <Pressable onPress={navToRegister}>
              <View
                style={[
                  styles.pressableContent,
                  { borderWidth: h(0.1), borderColor: "#616571" },
                ]}
              >
                <Text style={{ color: "#616571", fontSize: h(2.3) }}>
                  {Strings.CREATE_NEW_ACCOUNT}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
