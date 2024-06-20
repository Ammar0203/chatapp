import { Image } from "react-native";
import { Urls } from "../config";
import avatar from '../assets/images/avatar.png'

export default (props) => {
  const { type, style } = props
  let { source } = props

  let uri = source instanceof Object ? source.uri : Urls.AVATARS + source;
  
  source = source ? { uri : uri } : avatar;

  // let style = styles[type || 'list'];

  return <Image source={source} style={style} resizeMode='contain' />
};