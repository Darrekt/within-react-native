import React from "react";
import { View, Text } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import { useNavigation } from "@react-navigation/native";
import SubmitButton from "../../components/util/SubmitButton";
import OneButtonForm from "../../components/layout/OneButtonForm";
import { useAppSelector } from "../../redux/hooks";
import { getTheme } from "../../redux/selectors";

const EditPasswordScreen = () => {
  const navigation = useNavigation();
  const theme = useAppSelector(getTheme);
  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }}
      validate={(values) => {
        const errors: {
          oldPassword?: string;
          newPassword?: string;
          confirmNewPassword?: string;
        } = {};

        if (!values.oldPassword) {
          errors.oldPassword = "Please enter a password.";
        }

        if (!values.newPassword) {
          errors.oldPassword = "Please enter a new password.";
        }

        errors.confirmNewPassword =
          values.newPassword !== values.confirmNewPassword
            ? "Passwords do not match"
            : undefined;

        return errors;
      }}
      onSubmit={(values) => {
        navigation.goBack();
      }}
    >
      {(formik) => (
        <OneButtonForm
          nakedPage
          button={
            <SubmitButton
              onPress={() => formik.handleSubmit()}
              text="Change password"
            />
          }
        >
          <TextInput
            style={{ ...globalStyles.inputBox, borderColor: theme.dark }}
            autoCapitalize="none"
            autoCompleteType="password"
            secureTextEntry
            onChangeText={formik.handleChange("oldPassword")}
            onBlur={formik.handleBlur("oldPassword")}
            placeholder="Old Password"
            value={formik.values.oldPassword}
            onSubmitEditing={() => formik.handleSubmit()}
          />
          {formik.touched.oldPassword && formik.errors.oldPassword && (
            <Text style={textStyles.validationMessage}>
              {formik.errors.oldPassword}
            </Text>
          )}
          <TextInput
            style={{ ...globalStyles.inputBox, borderColor: theme.dark }}
            autoCapitalize="none"
            autoCompleteType="password"
            secureTextEntry
            onChangeText={formik.handleChange("newPassword")}
            onBlur={formik.handleBlur("newPassword")}
            placeholder="New password"
            value={formik.values.newPassword}
            onSubmitEditing={() => formik.handleSubmit()}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <Text style={textStyles.validationMessage}>
              {formik.errors.newPassword}
            </Text>
          )}
          <TextInput
            style={{ ...globalStyles.inputBox, borderColor: theme.dark }}
            autoCapitalize="none"
            autoCompleteType="password"
            secureTextEntry
            onChangeText={formik.handleChange("confirmNewPassword")}
            onBlur={formik.handleBlur("confirmNewPassword")}
            placeholder="Confirm new password"
            value={formik.values.confirmNewPassword}
            onSubmitEditing={() => formik.handleSubmit()}
          />
          {formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword && (
              <Text style={textStyles.validationMessage}>
                {formik.errors.confirmNewPassword}
              </Text>
            )}
        </OneButtonForm>
      )}
    </Formik>
  );
};
export default EditPasswordScreen;
