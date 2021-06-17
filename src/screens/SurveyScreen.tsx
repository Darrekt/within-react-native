import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/core";
import { Formik } from "formik";
import React from "react";
import { Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { globalStyles, textStyles } from "../../styles";
import OneButtonForm from "../components/layout/OneButtonForm";
import QuestionWithSlider from "../components/QuestionWithSlider";
import SubmitButton from "../components/util/SubmitButton";
import { useAppSelector } from "../redux/hooks";
import { getSettings, getTheme } from "../redux/selectors";

export default function SurveyScreen() {
  const settings = useAppSelector(getSettings);
  const theme = useAppSelector(getTheme);
  const navigation = useNavigation();
  return (
    <Formik
      initialValues={{
        appReview: 3,
        productivityRating: 3,
        featureRequest: "",
        bugReport: "",
      }}
      validate={(values) => ({})}
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
        <OneButtonForm
          behaviour="padding"
          centerFields={false}
          button={
            <SubmitButton
              onPress={() => formik.handleSubmit()}
              text="Submit survey"
            />
          }
        >
          <QuestionWithSlider
            question={"How would you rate the app?"}
            rating={formik.values.appReview}
            setRating={(val) => formik.setFieldValue("appReview", val)}
          />
          <QuestionWithSlider
            question={"Did the app improve your focus and productivity?"}
            rating={formik.values.productivityRating}
            setRating={(val) => formik.setFieldValue("productivityRating", val)}
          />
          <Text style={textStyles.questionText}>
            Tell us what you would like to see improved:
          </Text>
          <TextInput
            style={{
              ...globalStyles.largeInputBox,
              borderColor: theme.dark,
            }}
            multiline
            autoCapitalize="sentences"
            onChangeText={formik.handleChange("featureRequest")}
            shouldCancelWhenOutside
            placeholder="Request features here! Feel free to reference other apps."
            value={formik.values.featureRequest}
          />
          <Text style={textStyles.questionText}>
            Please let us know of any bugs!
          </Text>
          <TextInput
            style={{
              ...globalStyles.largeInputBox,
              borderColor: theme.dark,
            }}
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
        </OneButtonForm>
      )}
    </Formik>
  );
}
