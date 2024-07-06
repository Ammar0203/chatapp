import { StyleSheet } from "react-native";
import { useWidth, useHeight } from '../../api/Dimensions'
import { Colors } from "../../config";

const useStyle = ({ width, height }) => {
  const w = useWidth(width)
  const h = useHeight(height)

  const styles = StyleSheet.create({
  })

  return styles
}

export default useStyle