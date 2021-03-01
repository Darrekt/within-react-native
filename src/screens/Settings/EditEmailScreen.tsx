import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import { SettingsContext } from "../../state/context";
import { useNavigation } from "@react-navigation/native";

const EditEmailScreen = () => {
  const { settings } = useContext(SettingsContext);
  const navigation = useNavigation();
  return (
    <View>
      <Formik
        initialValues={{
          newEmail: "",
          confirmNewEmail: "",
        }}
        validate={(values) => {
          const errors: { newEmail?: string; confirmNewEmail?: string } = {};

          if (!values.newEmail) {
            errors.newEmail = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.newEmail)
          ) {
            errors.newEmail = "Invalid email address";
          }

          if (values.newEmail !== values.confirmNewEmail) {
            errors.confirmNewEmail = "E-mails do not match";
          }
          return errors;
        }}
        onSubmit={(values) => {
          settings.user
            ?.updateEmail(values.newEmail)
            .then(navigation.goBack)
            .catch((error) => {
              if (error.code === "auth/email-already-in-use") {
                console.log("That email address is already in use!");
              }

              if (error.code === "auth/invalid-email") {
                console.log("That email address is invalid!");
              }
              console.error(error);
            });
        }}
      >
        {(formik) => (
          <View style={globalStyles.column}>
            <TextInput
              style={globalStyles.inputBox}
              autoCapitalize="none"
              autoCompleteType="email"
              onChangeText={formik.handleChange("newEmail")}
              onBlur={formik.handleBlur("newEmail")}
              placeholder="New email"
              value={formik.values.newEmail}
            />
            {formik.touched.newEmail && formik.errors.newEmail && (
              <Text style={textStyles.validationMessage}>
                {formik.errors.newEmail}
              </Text>
            )}
            <TextInput
              style={globalStyles.inputBox}
              autoCapitalize="none"
              autoCompleteType="email"
              onChangeText={formik.handleChange("confirmNewEmail")}
              onBlur={formik.handleBlur("confirmNewEmail")}
              placeholder="Confirm new email"
              value={formik.values.confirmNewEmail}
            />
            {formik.touched.confirmNewEmail &&
              formik.errors.confirmNewEmail && (
                <Text style={textStyles.validationMessage}>
                  {formik.errors.confirmNewEmail}
                </Text>
              )}
            {!settings.user?.emailVerified && (
              <Button
                color={globalStyles.submitButton.backgroundColor}
                onPress={() => settings.user?.sendEmailVerification()}
                title="Send verification email"
              />
            )}
            <Button
              color={globalStyles.submitButton.backgroundColor}
              onPress={() => formik.handleSubmit()}
              title="Change email"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
export default EditEmailScreen;
