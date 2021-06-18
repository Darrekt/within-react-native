import React from "react";
import { Text, Alert } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import SubmitButton from "../../components/util/SubmitButton";
import { useAppSelector } from "../../redux/hooks";
import { getTheme } from "../../redux/selectors";
import OneButtonForm from "../../components/layout/OneButtonForm";

export const ResetPasswordScreen = () => {
  const theme = useAppSelector(getTheme);
  return (
    <Formik
      initialValues={{ email: "" }}
      validate={(values) => {
        const errors: {
          email?: string;
          password?: string;
          confirmpw?: string;
        } = {};
        if (!values.email) errors.email = "Required";
        else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        )
          errors.email = "Invalid email address";
        return errors;
      }}
      onSubmit={(values) => {
        auth()
          .sendPasswordResetEmail(values.email)
          .then(() =>
            Alert.alert("Email Sent", "Please check the junk folder as well!", [
              { text: "OK" },
            ])
          )
          .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
            let title: string = "";
            let message: string = "";
            switch (error.code) {
              case "auth/invalid-email":
                title = "Invalid email";
                message = "Please enter a valid email.";
                break;
              default:
                title = "Error";
                message = "Please contact support.";
            }
            Alert.alert(title, message, [{ text: "OK" }]);
          });
      }}
    >
      {(formik) => (
        <OneButtonForm behaviour="height" nakedPage>
          <Text
            style={{
              width: "100%",
              marginTop: 20,
              marginBottom: 10,
              fontSize: 16,
            }}
          >
            Enter the email that you used to sign up:
          </Text>
          <TextInput
            style={{ ...globalStyles.inputBox, borderColor: theme.dark }}
            autoCapitalize="none"
            autoCompleteType="email"
            onChangeText={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            placeholder="Email"
            value={formik.values.email}
          />
          <Text style={textStyles.validationMessage}>
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : ""}
          </Text>
          <SubmitButton
            alwaysShow
            text="Reset Password"
            onPress={() => formik.handleSubmit()}
          />
        </OneButtonForm>
      )}
    </Formik>
  );
};

export default ResetPasswordScreen;
