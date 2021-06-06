import React from "react";
import { View, Text, Alert } from "react-native";
import { SocialIcon } from "react-native-elements";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import auth from "@react-native-firebase/auth";
import SubmitButton from "../../components/util/SubmitButton";
import { useNavigation } from "@react-navigation/core";
import { Screens } from "../navConstants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { sanitiseFirebaseProjects } from "../../redux/actions/projects/thunks";
import { getTheme } from "../../redux/selectors";

export const SignInScreen = () => {
  const navigation = useNavigation();
  const theme = useAppSelector(getTheme);
  const dispatch = useAppDispatch();
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
            .then((credential) =>
              dispatch(sanitiseFirebaseProjects(credential.user.uid))
            )
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
              style={{ ...globalStyles.inputBox, borderColor: theme.dark }}
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
        onPress={() => navigation.navigate(Screens.SignUp)}
      >
        No account? Sign up here!
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
        <SocialIcon type="google" />
        <SocialIcon type="facebook" />
        <SocialIcon type="twitter" />
      </View>
    </View>
  );
};

export default SignInScreen;
