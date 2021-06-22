import React from "react";
import {
  Dimensions,
  Image,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBOARDING_STATUS_KEY } from "../../util/constants";

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    paddingTop: 0.2 * Dimensions.get("screen").height,
  },
  img: {
    height: 0.5 * Dimensions.get("screen").width,
    width: 0.7 * Dimensions.get("screen").width,
    resizeMode: "contain",
  },
  subtitleText: { marginHorizontal: 30, fontSize: 16, textAlign: "justify" },
});

const { DnDMode } = NativeModules;
interface Props {
  onFinish: () => void;
}

const OnboardingScreen = ({ onFinish }: Props) => {
  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_STATUS_KEY, JSON.stringify(true));
    } catch (e) {
      console.log("Issue with Async storage onboarding completion");
    }
    onFinish();
    Platform.OS === "android" && DnDMode.getDnDPermission();
  };
  return (
    <Onboarding
      containerStyles={styles.container}
      onSkip={completeOnboarding}
      onDone={completeOnboarding}
      pages={[
        {
          backgroundColor: "#ffffff",
          image: (
            <Image
              style={styles.img}
              source={require("../../../assets/old_mascot/onboarding/onboarding_1.png")}
            />
          ),
          title: "Let's get started!",
          subtitle: (
            <Text style={styles.subtitleText}>
              Welcome to the alpha release of Within. This is heavily under
              development, so we'd greatly appreciate any feedback you have to
              offer!
            </Text>
          ),
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={styles.img}
              source={require("../../../assets/old_mascot/onboarding/onboarding_2.png")}
            />
          ),
          title: "What are we doing?",
          subtitle: (
            <Text style={styles.subtitleText}>
              Within is meant to help you work in a more productive,
              less-distracted manner by managing your planning and workflow,
              while teaching you how to keep yourself more focused!
            </Text>
          ),
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              style={styles.img}
              source={require("../../../assets/old_mascot/onboarding/onboarding_3.png")}
            />
          ),
          title: "Almost there!",
          subtitle: (
            <Text style={styles.subtitleText}>
              Finally, we'll need you to sign in for cloud data syncing, and
              also to give us some permissions to block distracting
              notifications while you're working.
            </Text>
          ),
        },
      ]}
    />
  );
};

export default OnboardingScreen;
