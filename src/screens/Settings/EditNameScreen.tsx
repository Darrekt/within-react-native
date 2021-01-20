import React, { useContext } from "react";
import { View, Button } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles";
import { useNavigation } from "@react-navigation/native";
import { SettingsContext } from "../../state/context";

const EditNameScreen = () => {
  const { settings } = useContext(SettingsContext);
  const navigation = useNavigation();
  return (
    <View>
      <Formik
        initialValues={{ newName: "" }}
        validate={(values) => {
          let errors = {};
        }}
        onSubmit={async (values) => {
          settings.user
            ?.updateProfile({ displayName: values.newName })
            .then(navigation.goBack)
            .catch((error) => console.log(error));
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
        }) => (
          <View style={globalStyles.column}>
            <TextInput
              style={globalStyles.inputBox}
              autoCompleteType="name"
              onChangeText={handleChange("newName")}
              onBlur={handleBlur("newName")}
              placeholder="Your snazzy new name here!"
              value={values.newName}
              onSubmitEditing={() => handleSubmit()}
            />
            <Button
              color={globalStyles.submitButton.backgroundColor}
              onPress={() => handleSubmit()}
              title="Change my name!"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
export default EditNameScreen;
