import React from "react";
import { StyleSheet, View, Text, Switch, Button } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { TodoContext } from "./../../state/context";
import { globalStyles, textStyles } from "../../../styles";
import Todo from "../../models/Todo";

const styles = StyleSheet.create({
  stringEntry: {
    ...globalStyles.column,
    padding: 10,
  },
  boolEntry: {
    ...globalStyles.row,
    padding: 10,
  },
  inputBox: {},
});

const AddTodoScreen = () => {
  const { dispatch } = React.useContext(TodoContext);
  return (
    <View>
      <Formik
        initialValues={{ name: "", notes: "", disableNotifications: false }}
        validate={(values) => {}}
        onSubmit={(values) =>
          dispatch({
            name: "add",
            payload: new Todo({
              name: values.name,
              notes: values.notes,
              disableNotifications: values.disableNotifications,
            }),
          })
        }
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
              <Text style={textStyles.header}>Task name</Text>
              <TextInput
                style={styles.inputBox}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
            </View>
            <View style={styles.stringEntry}>
              <Text style={textStyles.header}>Notes</Text>
              <TextInput
                style={styles.inputBox}
                onChangeText={handleChange("notes")}
                onBlur={handleBlur("notes")}
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
            <Button onPress={() => handleSubmit()} title="Add Task" />
          </View>
        )}
      </Formik>
    </View>
  );
};
export default AddTodoScreen;
