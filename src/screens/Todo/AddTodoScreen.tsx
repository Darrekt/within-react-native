import React from "react";
import { StyleSheet, View, Text, Switch, Button } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { TodoContext } from "./../../state/context";
import { globalStyles, textStyles } from "../../../styles";
import Todo from "../../models/Todo";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  boolEntry: {
    ...globalStyles.row,
    padding: 10,
  },
});

const AddTodoScreen = () => {
  const { dispatch } = React.useContext(TodoContext);
  const navigation = useNavigation();
  return (
    <Formik
      initialValues={{ name: "", notes: "", disableNotifications: false }}
      validate={(values) => {
        let errors = {};
      }}
      onSubmit={(values) => {
        dispatch({
          type: "add",
          payload: new Todo({
            name: values.name,
            notes: values.notes,
            disableNotifications: values.disableNotifications,
          }),
        });
        navigation.goBack();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => (
        <View style={globalStyles.column}>
          <View style={globalStyles.spacer}></View>
          <Text style={textStyles.header}>What are you doing?</Text>
          <TextInput
            style={globalStyles.inputBox}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            placeholder="Task name"
            value={values.name}
          />
          <Text style={textStyles.header}>Additional details</Text>
          <TextInput
            style={globalStyles.inputBox}
            onChangeText={handleChange("notes")}
            onBlur={handleBlur("notes")}
            placeholder="Notes"
            value={values.notes}
          />
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
            color={globalStyles.submitButton.backgroundColor}
            onPress={() => handleSubmit()}
            title="Add Task"
          />
        </View>
      )}
    </Formik>
  );
};
export default AddTodoScreen;
