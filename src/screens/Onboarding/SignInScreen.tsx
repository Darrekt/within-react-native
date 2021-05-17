import React from "react";
import { View, Dimensions, Text, Alert } from "react-native";
import { SocialIcon } from "react-native-elements";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import auth from "@react-native-firebase/auth";
import SubmitButton from "../../components/util/SubmitButton";

export const SignInScreen = () => {
  const width = Dimensions.get("screen").width * 0.7;
  return (
    <View style={globalStyles.centered}>
      <Text
        style={{
          marginTop: 20,
          marginBottom: 10,
          fontSize: 20,
          fontWeight: "400",
        }}
      >
        Sign in with email credentials:
      </Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors: { email?: string; password?: string } = {};
          if (!values.email) errors.email = "Required";
          else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          )
            errors.email = "Invalid email address";

          if (!values.password) errors.password = "Required";

          return errors;
        }}
        onSubmit={(values) => {
          auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(() => console.log("Signed in!"))
            .catch((error) => {
              if (error.code === "auth/user-disabled") {
                Alert.alert(
                  "User disabled!",
                  "This user has been disabled. Please contact us for help!",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "OK",
                    },
                  ]
                );
              } else {
                Alert.alert(
                  "Sign-in error",
                  "The user either does not exist, or you have entered an invalid sign-in.",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "OK",
                    },
                  ]
                );
              }
            });
        }}
      >
        {(formik) => (
          <View style={globalStyles.column}>
            <TextInput
              style={globalStyles.inputBox}
              autoCapitalize="none"
              autoCompleteType="email"
              onChangeText={formik.handleChange("email")}
              onBlur={formik.handleBlur("email")}
              placeholder="Email"
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <Text style={textStyles.validationMessage}>
                {formik.errors.email}
              </Text>
            )}
            <TextInput
              style={globalStyles.inputBox}
              autoCapitalize="none"
              autoCompleteType="password"
              secureTextEntry
              onChangeText={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              placeholder="Password"
              value={formik.values.password}
              onSubmitEditing={() => formik.handleSubmit()}
            />
            {formik.touched.password && formik.errors.password && (
              <Text style={textStyles.validationMessage}>
                {formik.errors.password}
              </Text>
            )}
            <SubmitButton
              text="Sign In"
              onPress={() => formik.handleSubmit()}
              width="70%"
            />
          </View>
        )}
      </Formik>
      <Text
        style={{
          marginVertical: 20,
          fontSize: 16,
          fontWeight: "400",
          color: "teal",
          textDecorationLine: "underline",
        }}
        onPress={() => undefined}
      >
        Sign up here
      </Text>
      <Text
        style={{
          marginTop: 30,
          marginBottom: 10,
          fontSize: 20,
          fontWeight: "400",
        }}
      >
        Or sign in with a provider:
      </Text>
      <View style={{ ...globalStyles.row, justifyContent: "center" }}>
        <SocialIcon title="Sign In With Google" type="google" />
        <SocialIcon title="Sign In With Facebook" type="facebook" />
        <SocialIcon title="Sign In With Twitter" type="twitter" />
      </View>
    </View>
  );
};

export default SignInScreen;
