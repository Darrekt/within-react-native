import React from "react";
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import auth from "@react-native-firebase/auth";
import SubmitButton from "../../components/util/SubmitButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { sanitiseFirebaseProjects } from "../../redux/actions/projects/thunks";
import { resetSettings } from "../../redux/actions/settings/thunks";
import { getTheme } from "../../redux/selectors";

export const SignUpScreen = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(getTheme);
  return (
    <KeyboardAvoidingView
      style={globalStyles.centered}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((credential) => {
              dispatch(sanitiseFirebaseProjects(credential.user.uid));
              dispatch(resetSettings());
            })
            .catch((error: any) => {
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
            <Text
              style={{
                marginTop: 20,
                marginBottom: 10,
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              Sign up with email credentials:
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
            <TextInput
              style={{ ...globalStyles.inputBox, borderColor: theme.dark }}
              autoCapitalize="none"
              autoCompleteType="password"
              secureTextEntry
              onChangeText={formik.handleChange("password")}
              onBlur={formik.handleBlur("password")}
              placeholder="Password"
              value={formik.values.password}
              onSubmitEditing={() => formik.handleSubmit()}
            />
            <Text style={textStyles.validationMessage}>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </Text>
            <SubmitButton
              text="Sign up!"
              onPress={() => formik.handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
