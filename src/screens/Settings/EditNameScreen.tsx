import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import { useNavigation } from "@react-navigation/native";
import { SettingsContext } from "../../state/context";

const EditNameScreen = () => {
  const { settings } = useContext(SettingsContext);
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
            .then(navigation.goBack)
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
            <Button
              color={globalStyles.submitButton.backgroundColor}
              onPress={() => formik.handleSubmit()}
              title="Change my name!"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
export default EditNameScreen;
