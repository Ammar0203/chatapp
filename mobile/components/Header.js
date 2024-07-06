import {
  Image,
  Text,
  View,
  useWindowDimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { withChatContext } from "../context/ChatProvider";
import useStyle from "../screens/styles/chat";
import { useHeight, useWidth } from "../api/Dimensions";
import moment from "moment";
import Avatar from "./Avatar";
import { Colors } from "../config";

function Header({ title, navigation }) {
  const window = useWindowDimensions();
  const styles = useStyle(window);
  const h = useHeight(window.height);
  const w = useWidth(window.width);

  return (
    <View style={[styles.headerContainer, {marginTop: StatusBar.currentHeight}]}>
      <View style={styles.header}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: h(3), color: Colors.WHITE}}>{title}</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack(null);
            }}
          >
            <Image
              source={require("../assets/images/backBtn.png")}
              style={styles.backBtn}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Header;
