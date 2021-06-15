import React from "react";
import { View, Text, Alert } from "react-native";
import { SocialIcon } from "react-native-elements";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import SubmitButton from "../../components/util/SubmitButton";
import { useNavigation } from "@react-navigation/core";
import { Screens } from "../navConstants";
import { useAppSelector } from "../../redux/hooks";
import { getTheme } from "../../redux/selectors";
import OneButtonForm from "../../components/layout/OneButtonForm";

export const SignInScreen = () => {
  const navigation = useNavigation();
  const theme = useAppSelector(getTheme);
  return (
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
          .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
            let title: string = "";
            let message: string = "";
            switch (error.code) {
              case "auth/invalid-email":
                title = "Invalid email";
                message = "Please enter a valid email.";
                break;
              case "auth/user-disabled":
                title = "User disabled!";
                message =
                  "This user has been disabled. Please contact us for help!";
                break;
              case "auth/user-not-found":
              case "auth/wrong-password":
                title = "Sign-in error";
                message =
                  "The user either does not exist, or you have entered an invalid password.";
                break;
            }
            Alert.alert(title, message, [{ text: "OK" }]);
          });
      }}
    >
      {(formik) => (
        <OneButtonForm behaviour="height">
          <Text
            style={{
              width: "100%",
              marginTop: 20,
              marginBottom: 10,
              fontSize: 16,
              color: "black",
            }}
          >
            Sign in with email credentials:
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
            alwaysShow
            text="Sign In"
            onPress={() => formik.handleSubmit()}
          />
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
              fontSize: 16,
            }}
          >
            Or sign in with a provider:
          </Text>
          <View style={{ ...globalStyles.row, justifyContent: "center" }}>
            <SocialIcon type="google" />
            <SocialIcon type="facebook" />
            <SocialIcon type="twitter" />
          </View>
        </OneButtonForm>
      )}
    </Formik>
  );
};

export default SignInScreen;
