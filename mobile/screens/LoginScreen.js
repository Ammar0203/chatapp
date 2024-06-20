import { useEffect, useState } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, Text, TextInput, View, useWindowDimensions } from 'react-native'
import { Auth, Axios, Strings, Urls } from '../config'
import companyLogo from '../assets/images/logo.png';
import useStyle from './styles/auth'
import { useWidth, useHeight } from '../api/Dimensions'
import { Error, Loader } from '../component';

export default function LoginScreen({ navigation, route }) {
  const window = useWindowDimensions()
  const styles = useStyle(window)
  const w = useWidth(window.width)
  const h = useHeight(window.height)

  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    _bootstrapAsync()
  }, [])
  
  const _bootstrapAsync = async () => {
    const authenticated = await Auth.auth()
    if (authenticated) {
      await navigation.navigate('Home')
    }
    else setIsLoading(false)
  }

  const validate = () => {
    Keyboard.dismiss()
    let errors = []
    const isUsername = !username || username === ''
    const isPassword = !password || password === ''
    if(isUsername) {
      errors.push('اسم المستخدم')
    }
    if(isPassword) {
      errors.push('كلمة المرور')
    }
    if(errors.length>0) {
      const error = 'الرجاء ادخال ' + errors.join(' و')
      setError(error)
      return false
    }
    return true
  }

  const login = async () => {
    if(!validate()) return

    let data = {
      username,
      password
    }
    try {
        setIsLoading(true)
        let response = await Axios.post(Urls.AUTH, data)
        Auth.setUser(response.data)
        navigation.navigate('Home')
        setIsLoading(false)
    } catch (e) {
      setError(e.response.data.message)
      setIsLoading(false)
    }
  }

  const navToRegister = () => navigation.navigate('Register', {msg: 'Hello'})

  return (
    <SafeAreaView style={styles.container}>

      <Loader title={Strings.PLEASE_WAIT} loading={isLoading} />

      <ScrollView>

        <KeyboardAvoidingView behavior='padding' style={{flex: 1, gap: h(3), minHeight: 550}}>

          <View style={styles.imageHeaderContainer} >
            <Image 
              style={styles.imageHeaderStyle}
              source={companyLogo}
              resizeMode='contain'
            />
          </View>

          <View style={styles.formContainer}>

            <Text style={styles.formTextHeader}>{Strings.LOGIN}</Text>

            <View style={{gap: h(2)}}>
              
              {error && <Error error={error}/>}

              <View style={styles.textInputContainer} >
                <Image style={styles.textInputIcon} source={require('../assets/images/person.png')} resizeMode='contain'/>
                <TextInput 
                  style={styles.textInputForm}
                  placeholder={Strings.USERNAME_PLACEHOLDER}
                  placeholderTextColor="#616571"
                  onChangeText={setUsername}
                  keyboardType="visible-password"
                />
              </View>

              <View style={styles.textInputContainer} >
                <Image style={styles.textInputIcon} source={require('../assets/images/lock.png')} resizeMode='contain'/>
                <TextInput 
                  style={styles.textInputForm}
                  placeholder={Strings.PASSWORD_PLACEHOLDER}
                  placeholderTextColor="#616571"
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

            </View>

            <View style={{gap: h(2)}}>

              <View>
                <Pressable onPress={login}>
                  <View style={[ styles.pressableContent, {backgroundColor: '#50abff'}]}>
                    <Text style={{color: '#f2f2f2', fontSize: h(2.3)}} >{Strings.LOGIN}</Text>
                  </View>
                </Pressable>
              </View>

              <View>
                <Pressable onPress={navToRegister}>
                  <View
                    style={[styles.pressableContent, {borderWidth: h(0.1), borderColor: '#616571'}]}>
                    <Text style={{color: '#616571', fontSize: h(2.3)}} >{Strings.CREATE_NEW_ACCOUNT}</Text>
                  </View>
                </Pressable>
              </View>
              
            </View>

          </View>

        </KeyboardAvoidingView>
      </ScrollView>

    </SafeAreaView>
  )
}