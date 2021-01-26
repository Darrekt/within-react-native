import React from "react";
import { StyleSheet, View, Text, Switch, Button } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { TodoContext } from "./../../state/context";
import { globalStyles, textStyles } from "../../../styles";
import Todo from "../../models/Todo";
import { useNavigation } from "@react-navigation/native";
import EmojiRegex from "emoji-regex";

const styles = StyleSheet.create({
  emojiInput: { ...globalStyles.inputBox, width: "20%" },
  nameInput: { ...globalStyles.inputBox, width: "50%" },
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
      initialValues={{
        emoji: "",
        name: "",
        notes: "",
        disableNotifications: false,
      }}
      validate={(values) => {
        const errors: {
          emoji?: string;
          name?: string;
        } = {};

        if (values.emoji && !EmojiRegex().test(values.emoji))
          errors.emoji = "Invalid emoji";

        if (!values.name) errors.name = "Please enter a task name.";

        return errors;
      }}
      onSubmit={(values) => {
        dispatch({
          type: "add",
          payload: new Todo({
            emoji: values.emoji,
            name: values.name,
            notes: values.notes,
            disableNotifications: values.disableNotifications,
          }),
        });
        navigation.goBack();
      }}
    >
      {(formik) => (
        <View style={globalStyles.column}>
          <View style={globalStyles.spacer}></View>
          <Text style={textStyles.header}>What are you doing?</Text>
          <View style={globalStyles.row}>
            <TextInput
              style={styles.emojiInput}
              onChangeText={formik.handleChange("emoji")}
              onBlur={formik.handleBlur("emoji")}
              placeholder="Emoji"
              value={formik.values.emoji}
            />
            <TextInput
              style={styles.nameInput}
              onChangeText={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              placeholder="Task name"
              value={formik.values.name}
            />
          </View>
          <View style={globalStyles.row}>
            {formik.touched.emoji && formik.errors.emoji && (
              <Text style={textStyles.validationMessage}>
                {formik.errors.emoji}
              </Text>
            )}
            {formik.touched.name && formik.errors.name && (
              <Text style={textStyles.validationMessage}>
                {formik.errors.name}
              </Text>
            )}
          </View>
          <Text style={textStyles.header}>Additional details</Text>
          <TextInput
            style={globalStyles.inputBox}
            onChangeText={formik.handleChange("notes")}
            onBlur={formik.handleBlur("notes")}
            placeholder="Notes"
            value={formik.values.notes}
          />
          <View style={styles.boolEntry}>
            <Text style={textStyles.header}>
              Silence incoming notifications
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={
                formik.values.disableNotifications ? "#f5dd4b" : "#f4f3f4"
              }
              ios_backgroundColor="#3e3e3e"
              value={formik.values.disableNotifications}
              onValueChange={() =>
                formik.setFieldValue(
                  "disableNotifications",
                  !formik.values.disableNotifications
                )
              }
            />
          </View>
          <Button
            color={globalStyles.submitButton.backgroundColor}
            onPress={() => formik.handleSubmit()}
            title="Add Task"
          />
        </View>
      )}
    </Formik>
  );
};
export default AddTodoScreen;
