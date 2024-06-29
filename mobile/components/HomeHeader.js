import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Constants from "expo-constants";
import { Auth, Colors, Strings } from "../config";
import useStyle from "../screens/styles/contacts";
import { useHeight, useWidth } from "../api/Dimensions";

export default function HomeHeader({ navigation, search, setSearch }) {
  const window = useWindowDimensions();
  const styles = useStyle(window);
  const h = useHeight(window.height);
  const w = useWidth(window.width);

  const [isSearching, setIsSearching] = useState(false);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        {!isSearching ? (
          <>
            <TouchableOpacity
              onPress={() => {
                Auth.logout();
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }, { name: "Register"}],
                });
              }}
            >
              <Text>تسجيل الخروج</Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>{Strings.TITLE_CONTACTS}</Text>
          </>
        ) : (
          <>
            <View style={styles.searchIconContainer}>
              <TouchableOpacity onPress={() => setIsSearching(false)}>
                <Image
                  source={require("../assets/images/xIcon.png")}
                  style={styles.xIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder={Strings.SEARCH}
              placeholderTextColor={Colors.GRAY}
              style={styles.search}
              onChangeText={setSearch}
              keyboardType="visible-password"
            />
          </>
        )}

        <View style={styles.searchIconContainer}>
          <TouchableOpacity onPress={() => setIsSearching(true)}>
            <Image
              source={require("../assets/images/search.png")}
              style={styles.searchIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
