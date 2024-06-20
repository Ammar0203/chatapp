import { View, Text, useWindowDimensions } from "react-native"
import useStyle from "../screens/styles/auth"

function Error({ error }) {
  const window = useWindowDimensions()
  const styles = useStyle(window)

  return (
    <View style={styles.errorContainer} >
      <View style={styles.errorContent} >
        <Text style={styles.errorText}>{error}</Text>
      </View>
    </View>
  )
}

export default Error