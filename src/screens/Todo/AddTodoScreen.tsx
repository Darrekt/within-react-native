import React from "react";
import { StyleSheet, View, Text, Switch, Button } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { TodoContext } from "./../../state/context";
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
  { AddTodoScreen: undefined },
  "AddTodoScreen"
>;

const AddTodoScreen = ({
  navigation,
}: {
  navigation: TodoScreenNavigationProp;
}) => {
  const { dispatch } = React.useContext(TodoContext);
  return (
    <View>
      <Formik
        initialValues={{ name: "", notes: "", disableNotifications: false }}
        validate={(values) => {
          let errors = {};
        }}
        onSubmit={(values) => {
          dispatch({
            name: "add",
            payload: new Todo({
              name: values.name,
              notes: values.notes,
              disableNotifications: values.disableNotifications,
            }),
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
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                placeholder="Task name"
                value={values.name}
              />
            </View>
            <View style={styles.stringEntry}>
              <Text style={textStyles.header}>Additional details</Text>
              <TextInput
                style={styles.inputBox}
                onChangeText={handleChange("notes")}
                onBlur={handleBlur("notes")}
                placeholder="Notes"
                value={values.notes}
              />
            </View>
            <View style={styles.boolEntry}>
              <Text style={textStyles.header}>
                Silence incoming notifications
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={values.disableNotifications ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                value={values.disableNotifications}
                onValueChange={() =>
                  setFieldValue(
                    "disableNotifications",
                    !values.disableNotifications
                  )
                }
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
