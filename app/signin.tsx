import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import InputField from '@/components/InputField'
import SocialLoginButtons from '@/components/SocialLoginButtons'

type Props = {}

const SignInScreen = (props: Props) => {
  return (
   

<View style={styles.container}>
      <Text style={styles.title}>Login to Your Account</Text>
      <InputField placeholder="Email" autoCapitalize="none" placeholderTextColor={Colors.gray} keyboardType="email-address" />
      <InputField placeholder="Password" secureTextEntry={true} placeholderTextColor={Colors.gray} />
         {/* <Link href={"/(tabs)"} asChild> */}
       
      <TouchableOpacity onPress={() => {
        router.dismissAll();
        router.push('/(tabs)');
      }} style={{backgroundColor: Colors.primary, paddingVertical: 15, borderRadius: 8, alignSelf: 'stretch', marginTop: 10,}}>
        <Text style={{color: Colors.white, fontSize: 16, fontWeight: '600', textAlign: 'center'}}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signinContainer}>
                      <Text style={styles.loginTxt}>Don't have an account? </Text>
                      <Link href={"/signup"} asChild>
                        <TouchableOpacity>
                          <Text style={styles.loginTxtSpan}>Sign up</Text>
                        </TouchableOpacity>
                      </Link>
      </View>
        <View style={styles.divider} />
        <SocialLoginButtons  emailHref={"/signin"} />
      </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
   signinContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginTxt: {
    color: Colors.gray,
    fontWeight: '500'
  },
  loginTxtSpan: {
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 5
    
  },
  divider: {
    borderTopColor: Colors.lightGray,
    borderTopWidth: 1,
    marginVertical: 20,
    width: '30%',
    marginBottom: 30,
  }
  
})