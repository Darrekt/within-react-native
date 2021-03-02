import React from "react";
import { View, Text, Button, Alert } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

const EmailSignInScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
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
        onSubmit={async (values) => {
          auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then(() => {
              navigation.goBack();
            })
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
            <Button
              color={globalStyles.submitButton.backgroundColor}
              onPress={() => formik.handleSubmit()}
              title="Sign In"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
export default EmailSignInScreen;
