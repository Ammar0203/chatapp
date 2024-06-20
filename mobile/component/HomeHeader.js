import { useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import Constants from 'expo-constants';
import { Colors, Strings } from "../config";
import useStyle from "../screens/styles/contacts";
import { useHeight, useWidth } from "../api/Dimensions";

export default function HomeHeader({search, setSearch}) {
  const window = useWindowDimensions()
  const styles = useStyle(window)
  const h = useHeight(window.height)
  const w = useWidth(window.width)

  const [isSearching, setIsSearching] = useState(false)

  if(isSearching) return (
    <View style={styles.headerContainer}>
      <View style={styles.searchHeaderContainer}>
        <View style={styles.searchHeader}>
          <View style={styles.searchHeaderIconContainer} >
            <TouchableOpacity onPress={() => setIsSearching(false)}>
              <Image source={require('../assets/images/xIcon.png')} style={styles.xIcon} resizeMode="contain" />
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <TextInput placeholder={Strings.SEARCH} placeholderTextColor={Colors.GRAY} style={styles.search} onChangeText={setSearch} keyboardType="visible-password"/>
          </View>
          <View style={styles.searchHeaderIconContainer} >
            <Image source={require('../assets/images/searchBlack.png')} style={styles.searchIcon} resizeMode="contain" />
          </View>
        </View>
      </View>
    </View>
  )

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>

        <Text style={styles.headerText}>{Strings.TITLE_CONTACTS}</Text>
        
        <View style={styles.searchIconContainer} >
          <TouchableOpacity onPress={() => setIsSearching(true)}>
            <Image source={require('../assets/images/search.png')} style={styles.searchIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}