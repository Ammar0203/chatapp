import { StyleSheet } from "react-native";
import { useWidth, useHeight } from '../../api/Dimensions'
import { Colors } from "../../config";

const useStyle = ({ width, height }) => {
  const w = useWidth(width)
  const h = useHeight(height)

  const styles = StyleSheet.create({
    container: {
      flex: 1, 
      minHeight: height, 
      backgroundColor: Colors.WHITE
    },
    scrollView: {
      flex: 1,
      backgroundColor: Colors.GRAY,
    },
    safeAreaView: {
      marginBottom: h(12)
    },
    contactsContainer: {
      flex: 1,
      width: width,
      alignItems: 'center'
    },
    header: {
      flexDirection: 'row',
      backgroundColor: Colors.GRAY,
      height: h(10),
      width: w(100),
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    headerText: {
      fontSize: h(2.4),
      color: Colors.WHITE,
      fontWeight: 'bold'
    },
    contactContainer: {
      width: w(100),
      height: h(10),
      borderBottomWidth: h(0.1),
      borderColor: Colors.GRAY,
      flexDirection: 'row-reverse',
      padding: h(1),
      backgroundColor: Colors.WHITE
    },
    avatar: {
      width: h(7),
      height: h(7),
      borderRadius: 180
    },
    avatarContainer: {
      marginRight: h(1),
      justifyContent: 'center',
      alignItems: 'center'
    },
    nameMessage: {
      gap: h(0.8)
    },
    name: {
      color: Colors.BLACK,
      fontSize: h(2.6),
      textAlign: 'right'
    },
    message: {
      color: Colors.GRAY,
      fontSize: h(1.8),
      textAlign: 'right'
    },
    contactLeft: {
      flex: 1,
      marginHorizontal: h(2),
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: h(1),
    },
    timeLastMessageContainer: {
      height: h(7),
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    },
    timeContainer: {

    },
    timeText: {
      color: Colors.GRAY,
      fontSize: h(1.8),
      textAlign: 'center'
    },
    messagesNumberContainer: {
      backgroundColor: '#509a56',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 180,
      height: h(3),
      minWidth: h(3),
      paddingHorizontal: h(0.6),
    },
    messagesNumberText: {
      textAlign: 'center',
      fontSize: h(1.2),
      color: Colors.WHITE
    },
    status: {
      backgroundColor: '#509a56',
      height: h(1.5),
      width: h(1.5),
      borderRadius: 180,
      position: 'absolute',
      top: h(0.5),
      right: h(0.3),
    },
    searchIcon: {
      height: h(2.5),
      width: h(2.5),
    },
    searchIconContainer: {
      height: h(10),
      width: h(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    searchHeaderIconContainer: {
      height: h(6),
      width: h(6),
      justifyContent: 'center',
      alignItems: 'center',
    },
    search: {
      backgroundColor: Colors.WHITE,
      textAlign: 'right',
      height: h(5),
      width: w(70),
      color: Colors.BLACK,
      paddingHorizontal: h(1),
      fontSize: h(2.3)
    },
    searchContainer: {
      justifyContent: 'center',
      alignContent: 'center'
    },
    searchHeader: {
      flexDirection: 'row',
      backgroundColor: Colors.WHITE,
      height: h(6),
      width: w(95),
      justifyContent: 'space-between'
    },
    xIcon: {
      height: h(3),
      width: h(3),
    },
    searchHeaderContainer: {
      flexDirection: 'row',
      backgroundColor: Colors.GRAY,
      height: h(10),
      width: w(100),
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerContainer: {
      width: width,
      backgroundColor: Colors.GRAY,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

  return styles
}

export default useStyle