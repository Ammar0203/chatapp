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
            <View style={{height: h(10), width: w(13), justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => {navigation.navigate('Edit')}} style={{height: h(1.8), justifyContent: 'space-between'}}>
                <View style={{height: h(0.3), width: h(2.4), backgroundColor: Colors.WHITE}} />
                <View style={{height: h(0.3), width: h(2.4), backgroundColor: Colors.WHITE}} />
                <View style={{height: h(0.3), width: h(2.4), backgroundColor: Colors.WHITE}} />
              </TouchableOpacity>
            </View>
            <Text style={styles.headerText}>{Strings.TITLE_CONTACTS}</Text>
          </>
        ) : (
          <>
            <View style={styles.searchIconContainer}>
              <TouchableOpacity onPress={() => setIsSearching(false)} style={{height: h(2), width: h(3), justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
                {/* <Image
                  source={require("../assets/images/xIcon.png")}
                  style={styles.xIcon}
                  resizeMode="contain"
                /> */}
                <View style={{height: h(0.3), width: h(2.4), backgroundColor: Colors.WHITE, transform: [{rotateZ: '45deg'}], position: 'absolute'}} />
                <View style={{height: h(0.3), width: h(2.4), backgroundColor: Colors.WHITE, transform: [{rotateZ: '-45deg'}], position: 'absolute'}} />
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

        <TouchableOpacity onPress={() => setIsSearching(true)} style={styles.searchIconContainer}>
          <Image
            source={require("../assets/images/search.png")}
            style={styles.searchIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
