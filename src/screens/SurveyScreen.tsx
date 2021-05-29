import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/core";
import { Formik } from "formik";
import React from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Slider } from "react-native-elements/dist/slider/Slider";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { globalStyles, textStyles } from "../../styles";
import QuestionWithSlider from "../components/QuestionWithSlider";
import SubmitButton from "../components/util/SubmitButton";
import { useAppSelector } from "../redux/hooks";
import { getSettings } from "../redux/selectors";

export default function SurveyScreen() {
  const settings = useAppSelector(getSettings);
  const navigation = useNavigation();
  return (
    <Formik
      initialValues={{
        appReview: 3,
        productivityRating: 3,
        featureRequest: "",
        bugReport: "",
      }}
      validate={(values) => {
        const errors: {
          appReview?: string;
          productivityRating?: string;
          todoSatisfaction?: string;
          featureRequest?: string;
          bugReport?: string;
        } = {};
        return errors;
      }}
      onSubmit={async (values) => {
        if (settings.user)
          await firestore()
            .collection("Surveys")
            .doc(settings.user)
            .set(values);
        navigation.goBack();
        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Survey completed!",
          text2: "Thanks for helping us improve!",
        });
      }}
    >
      {(formik) => (
        <KeyboardAvoidingView
          style={globalStyles.form}
          behavior={Platform.OS === "ios" ? "position" : "height"}
        >
          <ScrollView keyboardShouldPersistTaps="handled">
            <QuestionWithSlider
              question={"How would you rate the app?"}
              rating={formik.values.appReview}
              setRating={formik.handleChange("appReview")}
            />
            <Text style={textStyles.surveyQuestion}>
              Did the app improve your focus and productivity?
            </Text>
            <View
              style={{
                marginHorizontal: 20,
                alignItems: "stretch",
                justifyContent: "center",
              }}
            >
              <Slider
                value={formik.values.productivityRating}
                onValueChange={(val) =>
                  formik.handleChange("productivityRating")(val.toString())
                }
                maximumValue={5}
                minimumValue={1}
                step={1}
                trackStyle={{
                  height: 10,
                }}
                thumbStyle={{
                  height: 20,
                  width: 20,
                  backgroundColor: "transparent",
                }}
                thumbProps={{
                  children: (
                    <Icon
                      name="heartbeat"
                      type="font-awesome"
                      size={15}
                      reverse
                      containerStyle={{ bottom: 15, right: 15 }}
                      color="#01D1EE"
                    />
                  ),
                }}
              />
            </View>
            <Text style={textStyles.surveyQuestion}>
              Tell us what you would like to see improved!
            </Text>
            <TextInput
              style={globalStyles.largeInputBox}
              multiline
              autoCapitalize="sentences"
              onChangeText={formik.handleChange("featureRequest")}
              shouldCancelWhenOutside
              onBlur={() => Keyboard.dismiss()}
              placeholder="Request features here! Feel free to reference other apps."
              value={formik.values.featureRequest}
            />
            <Text style={textStyles.surveyQuestion}>
              Please let us know of any bugs!
            </Text>
            <TextInput
              style={globalStyles.largeInputBox}
              multiline
              autoCapitalize="sentences"
              onChangeText={formik.handleChange("bugReport")}
              onBlur={formik.handleBlur("bugReport")}
              placeholder="Report bugs, or just tell us if something feels wrong to you! We'll do our best to fix it."
              value={formik.values.bugReport}
            />
            {formik.touched.bugReport && formik.errors.bugReport && (
              <Text style={textStyles.validationMessage}>
                {formik.errors.bugReport}
              </Text>
            )}
          </ScrollView>
          <View style={globalStyles.bottomButtons}>
            <SubmitButton
              onPress={() => formik.handleSubmit()}
              text="Submit survey"
            />
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}
