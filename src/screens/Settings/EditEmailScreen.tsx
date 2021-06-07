import auth from "@react-native-firebase/auth";
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

const EditEmailScreen = () => {
  const theme = useAppSelector(getTheme);
  const user = auth().currentUser;
  const navigation = useNavigation();
  return (
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
        user
          ?.updateEmail(values.newEmail)
          .then(() => {
            navigation.goBack();
          })
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
        <OneButtonForm
          nakedPage
          button={
            <SubmitButton
              onPress={() => formik.handleSubmit()}
              text="Change email"
            />
          }
        >
          <View style={{ ...globalStyles.column, marginVertical: 20 }}>
            <Text style={textStyles.avatarName}>Current Email:</Text>
            <Text style={{
              alignSelf: "center",
              color: "black",
            }}>{user?.email}</Text>
          </View>
          <Text style={textStyles.questionText}>New email:</Text>
          <TextInput
            style={{ ...globalStyles.inputBox, borderColor: theme.dark }}
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
          <Text style={textStyles.questionText}>Confirm new email:</Text>
          <TextInput
            style={{ ...globalStyles.inputBox, borderColor: theme.dark }}
            autoCapitalize="none"
            autoCompleteType="email"
            onChangeText={formik.handleChange("confirmNewEmail")}
            onBlur={formik.handleBlur("confirmNewEmail")}
            placeholder="Confirm new email"
            value={formik.values.confirmNewEmail}
          />
          {formik.touched.confirmNewEmail && formik.errors.confirmNewEmail && (
            <Text style={textStyles.validationMessage}>
              {formik.errors.confirmNewEmail}
            </Text>
          )}
          {!user?.emailVerified && (
            <SubmitButton
              onPress={() => user?.sendEmailVerification()}
              text="Send verification email"
            />
          )}
        </OneButtonForm>
      )}
    </Formik>
  );
};
export default EditEmailScreen;
