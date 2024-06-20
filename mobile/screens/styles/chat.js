import { StyleSheet } from "react-native";
import { useWidth, useHeight } from '../../api/Dimensions'
import { Colors } from "../../config";

const useStyle = ({ width, height }) => {
  const w = useWidth(width)
  const oh = useHeight(height)
  // const w = (percent) => width * percent /100
  const h = (percent) => height * percent /100

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: Colors.WHITE,
    },
    headerContainer: {
      // position: 'absolute',
      // zIndex: 1,
      top: 0,
      backgroundColor: Colors.GRAY,
      width: width,
      alignItems: 'center', 
    },
    header: {
      backgroundColor: Colors.GRAY,
      height: height*0.1,
      width: width,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingHorizontal: h(2),
      columnGap: h(2)
    },
    right: {
      // width: w(12),
      height: height*0.1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    center: {
      // width: w(15),
      height: height*0.1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    left: {
      flex: 1,
      justifyContent: 'center',
      rowGap: h(1),
      alignItems: 'flex-end',
      // paddingHorizontal: h(2)
    },
    avatar: {
      width: h(7.5),
      height: h(7.5),
      borderRadius: 180
    },
    backBtn: {
      width: h(5),
      height: h(7),
    },
    name: {
      fontSize: h(3),
      color: Colors.WHITE,
      fontWeight: 'bold'
    },
    status: {
      fontSize: h(1.8),
      color: Colors.WHITE,
      fontWeight: 'bold'
    },
    textContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    giftedChat: {
      height: height*0.9, 
      backgroundColor: '#ffffff'
    },
    inputContainer: {
      flexDirection: 'row',
      flex: 1,
      backgroundColor: Colors.WHITE,
      paddingHorizontal: 10,
    },
    input: {
      backgroundColor: Colors.LIGHTGRAY,
      flex: 1,
      fontSize: 16,
      color: '#333',
      marginHorizontal: h(1),
      marginVertical: h(0.2),
      paddingVertical: h(0.4),
      paddingHorizontal: h(2),
      borderRadius: 25
    },
    iconContainer: {
      padding: h(1),
    },
    sendContainer: {
      padding: h(1),
    }, 
  })

  return styles
}

export default useStyle