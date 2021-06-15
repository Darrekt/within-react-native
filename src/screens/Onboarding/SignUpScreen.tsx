import React from "react";
import { Text, Alert } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import SubmitButton from "../../components/util/SubmitButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { initUserData } from "../../redux/actions/settings/thunks";
import { getTheme } from "../../redux/selectors";
import OneButtonForm from "../../components/layout/OneButtonForm";

export const SignUpScreen = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(getTheme);
  return (
    <Formik
      initialValues={{ email: "", password: "", confirmpw: "" }}
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

        if (!values.password) errors.password = "Required";
        if (values.password.length < 6)
          errors.password = "Password is too short!";
        if (!values.confirmpw) errors.confirmpw = "Required";
        if (values.confirmpw !== values.password)
          errors.confirmpw = "Non-matching passwords";

        return errors;
      }}
      onSubmit={(values) => {
        auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then((credential) => dispatch(initUserData(credential.user.uid)))
          .catch((error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
            let title: string = "";
            let message: string = "";
            switch (error.code) {
              case "auth/email-already-in-use":
                title = "Email in use!";
                message = "Please sign in on the main page.";
                break;
              case "auth/invalid-email":
                title = "Invalid email";
                message = "Please enter a valid email.";
                break;
              case "auth/weak-password":
                title = "Weak password";
                message = "Please use a stronger password.";
                break;
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
            Sign up with email:
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
            placeholder="Choose a password"
            value={formik.values.password}
            onSubmitEditing={() => formik.handleSubmit()}
          />
          <Text style={textStyles.validationMessage}>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""}
          </Text>
          <TextInput
            style={{ ...globalStyles.inputBox, borderColor: theme.dark }}
            autoCapitalize="none"
            autoCompleteType="password"
            secureTextEntry
            onChangeText={formik.handleChange("confirmpw")}
            placeholder="Confirm your password"
            value={formik.values.confirmpw}
            onSubmitEditing={() => formik.handleSubmit()}
          />
          <Text style={textStyles.validationMessage}>
            {formik.touched.confirmpw && formik.errors.confirmpw
              ? formik.errors.confirmpw
              : ""}
          </Text>
          <SubmitButton
            alwaysShow
            text="Sign up"
            onPress={() => formik.handleSubmit()}
          />
        </OneButtonForm>
      )}
    </Formik>
  );
};

export default SignUpScreen;
