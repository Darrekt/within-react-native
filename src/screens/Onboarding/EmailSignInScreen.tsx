import React from "react";
import { StyleSheet, View, Button } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles";
import { StackNavigationProp } from "@react-navigation/stack";
import auth from "@react-native-firebase/auth";

const styles = StyleSheet.create({
  inputBox: {
    margin: 15,
    height: 40,
    width: "70%",
    borderColor: "#7a42f4",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: "white",
  },
});

type TodoScreenNavigationProp = StackNavigationProp<
  { EmailSignInScreen: undefined },
  "EmailSignInScreen"
>;

const AddTodoScreen = ({
  navigation,
}: {
  navigation: TodoScreenNavigationProp;
}) => {
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
              style={styles.inputBox}
              autoCapitalize="none"
              autoCompleteType="email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              placeholder="Email"
              value={values.email}
            />
            <TextInput
              style={styles.inputBox}
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
              color={styles.submitButton.backgroundColor}
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
