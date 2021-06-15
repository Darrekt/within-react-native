import auth, { firebase } from "@react-native-firebase/auth";
import React from "react";
import { Text } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import { useNavigation } from "@react-navigation/native";
import SubmitButton from "../../components/util/SubmitButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { authStateChanged } from "../../redux/actions/settings/actions";
import OneButtonForm from "../../components/layout/OneButtonForm";
import { getTheme } from "../../redux/selectors";

const EditNameScreen = () => {
  const user = auth().currentUser;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const theme = useAppSelector(getTheme);
  return (
    <Formik
      initialValues={{ newName: user?.displayName ?? "" }}
      validate={(values) => {
        const errors: { newName?: string } = {};

        if (!values.newName) {
          errors.newName = "Your name can't be empty!";
        }
        return errors;
      }}
      onSubmit={async (values) => {
        user
          ?.updateProfile({ displayName: values.newName })
          .then(() => {
            dispatch(authStateChanged(firebase.auth().currentUser));
            navigation.goBack();
          })
          .catch((error) => console.log(error));
      }}
    >
      {(formik) => (
        <OneButtonForm
          nakedPage
          button={
            <SubmitButton
              text="Change name"
              onPress={() => formik.handleSubmit()}
            />
          }
        >
          <Text style={textStyles.questionText}>Choose a new name:</Text>
          <TextInput
            style={{ ...globalStyles.inputBox, borderColor: theme.dark }}
            autoCompleteType="name"
            onChangeText={formik.handleChange("newName")}
            onBlur={formik.handleBlur("newName")}
            placeholder="Your snazzy new name here!"
            value={formik.values.newName}
            onSubmitEditing={() => formik.handleSubmit()}
          />
          {formik.touched.newName && formik.errors.newName && (
            <Text style={textStyles.validationMessage}>
              {formik.errors.newName}
            </Text>
          )}
        </OneButtonForm>
      )}
    </Formik>
  );
};
export default EditNameScreen;
