import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import { useNavigation } from "@react-navigation/native";
import { SettingsContext } from "../../state/context";
import { firebase } from "@react-native-firebase/auth";
import Toast from "react-native-simple-toast";
import SubmitButton from "../../components/SubmitButton";

const EditNameScreen = () => {
  const { settings, dispatch } = useContext(SettingsContext);
  const navigation = useNavigation();
  return (
    <View>
      <Formik
        initialValues={{ newName: settings.user?.displayName ?? "" }}
        validate={(values) => {
          const errors: { newName?: string } = {};

          if (!values.newName) {
            errors.newName = "Your name can't be empty!";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          settings.user
            ?.updateProfile({ displayName: values.newName })
            .then(() => {
              dispatch({ type: "auth", user: firebase.auth().currentUser });
              navigation.goBack();
              Toast.show("Name changed!");
            })
            .catch((error) => console.log(error));
        }}
      >
        {(formik) => (
          <View style={globalStyles.column}>
            <TextInput
              style={globalStyles.inputBox}
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
            <SubmitButton
              text="Change my name!"
              onPress={() => formik.handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
export default EditNameScreen;
