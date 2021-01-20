import React from "react";
import { View, Button } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles";
import { useNavigation } from "@react-navigation/native";

const EditPasswordScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Formik
        initialValues={{ password: "" }}
        validate={(values) => {
          let errors = {};
        }}
        onSubmit={async (values) => {
          navigation.goBack()
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
              autoCapitalize="none"
              autoCompleteType="password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              placeholder="Password"
              value={values.password}
              onSubmitEditing={() => handleSubmit()}
            />
            <TextInput
              style={globalStyles.inputBox}
              autoCapitalize="none"
              autoCompleteType="password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              placeholder="Password"
              value={values.password}
              onSubmitEditing={() => handleSubmit()}
            />
            <TextInput
              style={globalStyles.inputBox}
              autoCapitalize="none"
              autoCompleteType="password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              placeholder="Password"
              value={values.password}
              onSubmitEditing={() => handleSubmit()}
            />
            <Button
              color={globalStyles.submitButton.backgroundColor}
              onPress={() => handleSubmit()}
              title="Sign In"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
export default EditPasswordScreen;
