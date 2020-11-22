import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import Onboarding from "react-native-onboarding-swiper";

const styles = StyleSheet.create({
  img: {
    height: 350,
    resizeMode: 'contain'
  },
});

const OnboardingScreen = () => {
  return <Onboarding
    pages={[
      {
        backgroundColor: "#ffffff",
        image: <Image style={styles.img} source={require('../assets/old_mascot/onboarding/onboarding_1.png')} />,
        title: "Welcome!",
        subtitle: "Let's get started. To get you as productive as you can be, we'll have to stop those pesky notifications from disturbing you.",
      },
      {
        backgroundColor: "#fff",
        image: <Image style={styles.img} source={require('../assets/old_mascot/onboarding/onboarding_2.png')} />,
        title: "Get it done",
        subtitle: "We'll give you a digest at the end of each day so you know how you're doing!",
      },

      {
        backgroundColor: "#fff",
        image: <Image style={styles.img} source={require('../assets/old_mascot/onboarding/onboarding_3.png')} />,
        title: "Track your progress",
        subtitle: "Sign in and let us keep track of your progress to help you stay motivated!",
      }
    ]}
  />;
}

export default OnboardingScreen;