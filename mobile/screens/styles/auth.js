import { StyleSheet } from "react-native";
import { useWidth, useHeight } from '../../api/Dimensions'

const useStyle = ({ width, height }) => {
  const w = useWidth(width)
  const h = useHeight(height)

  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    textInputContainer: {
      height: 45,
      borderWidth: h(0.1),
      borderColor: "#616571",
      borderRadius: 180,
      width: w(90),
      height: h(6),
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'row-reverse',
    },
    textInputIcon: {
      width: h(3), 
      height: h(3), 
      marginHorizontal: h(1)
    },
    textInputForm: {
      width: '88%',
      textAlign: "right",
      fontSize: h(2.2),
      paddingVertical: h(1),
      // outlineStyle: 'none',
    },
    imageHeaderContainer: {
      backgroundColor: "#616571",
      paddingVertical: h(7),
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageHeaderStyle: {
      width: w(50),
      height: h(20)
    },
    formContainer: {
      alignItems: 'center',
      textAlign: 'center',
      gap: h(2),
      fontWeight: 'bold'
    },
    formTextHeader: {
      color: "#616571",
      fontSize: h(4),
    },
    pressableContent: {
      width: w(90),
      height: h(7), 
      alignItems: 'center', 
      justifyContent: 'center', 
      borderRadius: 180,
    },
    errorContainer: {
      marginVertical: -h(1),
      marginTop: -h(1)
    },
    errorContent: {
      justifyContent: 'center', 
      alignItems: 'center', 
      paddingHorizontal: w(16), 
      paddingVertical: h(1),
      backgroundColor: '#f16b4a', 
      width: w(90), 
      // height: h(6),
      borderRadius: 180,
    },
    errorText: {
      color: '#f2f2f2',
      fontSize: h(2.2),
      textAlign: 'center'
    }
  })

  return styles
}

export default useStyle