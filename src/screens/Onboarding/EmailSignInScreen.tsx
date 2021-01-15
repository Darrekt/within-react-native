import React from "react";
import { StyleSheet, View, Text, Switch, Button } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { SettingsContext } from "./../../state/context";
import { globalStyles, textStyles } from "../../../styles";
import Todo from "../../models/Todo";
import { StackNavigationProp } from "@react-navigation/stack";

const styles = StyleSheet.create({
  stringEntry: {
    ...globalStyles.column,
    padding: 10,
  },
  boolEntry: {
    ...globalStyles.row,
    padding: 10,
  },
  inputBox: {
    margin: 15,
    height: 40,
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
  const { dispatch } = React.useContext(SettingsContext);
  return (
    <View>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          let errors = {};
        }}
        onSubmit={(values) => {
          dispatch({
            // type: "signin",
            // userID: "",
            key: "onboarding"
          });
          navigation.goBack();
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
            <View style={styles.stringEntry}>
              <Text style={textStyles.header}>What are you doing?</Text>
              <TextInput
                style={styles.inputBox}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                placeholder="Task email"
                value={values.email}
              />
            </View>
            <View style={styles.stringEntry}>
              <Text style={textStyles.header}>Additional details</Text>
              <TextInput
                style={styles.inputBox}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                placeholder="Notes"
                value={values.password}
              />
            </View>
            <Button
              color={styles.submitButton.backgroundColor}
              onPress={() => handleSubmit()}
              title="Add Task"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
export default AddTodoScreen;
