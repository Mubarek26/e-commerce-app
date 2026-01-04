import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { Href, Link } from 'expo-router'
import Google from "../assets/images/google-logo.svg";
import { Ionicons } from '@expo/vector-icons';
type Props = {
    emailHref?: Href<any>;
    googleHref?: Href<any>;
    appleHref?: Href<any>;
}

const SocialLoginButtons = (props: Props) => {
    const {emailHref, googleHref, appleHref}= props;
  return (
     <View style={styles.wrapper}>
                  
                  <View style={styles.socialLoginWrapper}>
                  <Animated.View entering={FadeInDown.delay(1000).duration(300).springify()}>
                     <Link href={emailHref} asChild>
                      <TouchableOpacity style={styles.button}>
                        <Ionicons name="mail-outline" size={30} />
                        <Text style={styles.btnTxt}>continue with Email</Text>
                      </TouchableOpacity>
                  </Link>
                    </Animated.View>
                  </View>
    
                  <View style={styles.socialLoginWrapper}>
                      <Animated.View entering={FadeInDown.delay(1200).duration(300).springify()}>
                    <Link href={"/signup"} asChild>
                      <TouchableOpacity style={styles.button}>
                        <Google width={30} height={30} />
                        <Text style={styles.btnTxt}>continue with Google </Text>
                        </TouchableOpacity>
                  </Link>
                      </Animated.View> 
                  </View>
                  <View style={styles.socialLoginWrapper}>
                      <Animated.View entering={FadeInDown.delay(1400).duration(300).springify()}>
                    <Link href={"/signup"} asChild>
                      <TouchableOpacity style={styles.button}>
                        <Ionicons name="logo-apple" size={30} />
                        <Text style={styles.btnTxt}>continue with Apple </Text>
                        </TouchableOpacity>
                  </Link>
                      </Animated.View>
                  </View>
    <View style={styles.signinContainer}>
                    <Text style={styles.loginTxt}>Already have an account? </Text>
                    <Link href={"/signin"} asChild>
                      <TouchableOpacity>
                        <Text style={styles.loginTxtSpan}>Sign in</Text>
                      </TouchableOpacity>
                    </Link>
                  </View>
                   </View>
  )
}

export default SocialLoginButtons
const styles = StyleSheet.create({
    wrapper: {
    paddingBottom: 50,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
 
  socialLoginWrapper: {
    marginVertical: 10,
    alignSelf: 'stretch',
  },
  btnTxt: {
    fontWeight: '600',
    fontSize: 14,
    color:Colors.black
  },
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 10,
    borderWidth:StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
    borderRadius: 25,
    width: "100%",
    
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
    
  }
})