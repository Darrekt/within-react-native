import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { ProjContext } from "../../state/context";
import { globalStyles, textStyles } from "../../../styles";
import Project from "../../models/Project";
import { useNavigation } from "@react-navigation/native";
import EmojiRegex from "emoji-regex";
import SubmitButton from "../../components/util/SubmitButton";

const styles = StyleSheet.create({
  emojiInput: { ...globalStyles.inputBox, width: "20%" },
  nameInput: { ...globalStyles.inputBox, width: "50%" },
  boolEntry: {
    ...globalStyles.row,
    padding: 10,
  },
});

// TODO: Add a due date selector

const AddProjectScreen = () => {
  const { dispatch } = React.useContext(ProjContext);
  const navigation = useNavigation();
  return (
    <View style={globalStyles.centered}>
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
            payload: new Project({
              emoji: values.emoji,
              name: values.name,
              notes: values.notes,
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
                placeholder="Project name"
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
            <SubmitButton
              onPress={() => formik.handleSubmit()}
              text="Add Project"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
export default AddProjectScreen;
