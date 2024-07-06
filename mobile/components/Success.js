import { View, Text, useWindowDimensions } from "react-native"
import useStyle from "../screens/styles/auth"

function Success({ success }) {
  const window = useWindowDimensions()
  const styles = useStyle(window)

  return (
    <View style={styles.errorContainer} >
      <View style={[styles.errorContent, {backgroundColor: '#4d9a56'}]} >
        <Text style={styles.errorText}>{success}</Text>
      </View>
    </View>
  )
}

export default Success