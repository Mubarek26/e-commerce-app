import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Animated, { FadeInRight } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import SocialLoginButtons from "@/components/SocialLoginButtons";
import { Colors } from "@/constants/Colors";
type Props = {};

const WelcomeScreen = (props: Props) => {
  return (
    <>
      <ImageBackground source={require("../assets/images/ecommerce-splash.jpg")} style={{flex: 1}} resizeMode="cover">
        <LinearGradient colors={["transparent", "rgba(255,255,255,0.9)", "rgba(255,255,255,1)"]} style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'flex-end', alignItems: 'center' }}>
          <Animated.Text style={styles.title} entering={FadeInRight.delay(500).duration(300)}>Shopx</Animated.Text>
                            <Animated.Text style={styles.description} entering={FadeInRight.delay(800).duration(300)}>Your one-stop shop for everything!</Animated.Text>
                            <Text  >Welcome Screen</Text>
          <SocialLoginButtons emailHref={"/signup"} />
        </LinearGradient>
      </ImageBackground>
    </>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
   title: {
      fontSize: 28,
      fontWeight: "bold",
      color: Colors.primary,
      letterSpacing: 2,
      marginBottom: 5
  
    },
    description: {
      fontSize: 16,
      color: Colors.gray,
      textAlign: 'center',
      marginBottom: 20,
    },
});

