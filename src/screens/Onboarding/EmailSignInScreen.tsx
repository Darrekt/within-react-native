import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

const AddTodoScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          let errors = {};
        }}
        onSubmit={async (values) => {
          auth()
            .signInWithEmailAndPassword(values.email, values.password)
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
              autoCompleteType="email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              placeholder="Email"
              value={values.email}
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
export default AddTodoScreen;
