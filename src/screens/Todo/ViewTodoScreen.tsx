import React from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { ProjContext, TodoContext } from "../../state/context";
import { globalStyles, textStyles } from "../../../styles";
import Todo from "../../models/Todo";
import EmojiRegex from "emoji-regex";
import SubmitButton from "../../components/util/SubmitButton";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import ModalSelector from "react-native-modal-selector";

type RootStackParamList = {
  ViewProjScreen: { id: string };
  EditTodoScreen: { id: string };
};

type ViewProjectScreenRouteProp = RouteProp<
  RootStackParamList,
  "EditTodoScreen"
>;

type ViewProjectScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EditTodoScreen"
>;

type Props = {
  route: ViewProjectScreenRouteProp;
  navigation: ViewProjectScreenNavigationProp;
};

const styles = StyleSheet.create({
  emojiInput: { ...globalStyles.inputBox, width: "20%" },
  nameInput: { ...globalStyles.inputBox, width: "50%" },
  boolEntry: {
    ...globalStyles.row,
    padding: 10,
  },
});

const ViewTodoScreen = ({ route, navigation }: Props) => {
  const { projects } = React.useContext(ProjContext);
  const { todos, dispatch } = React.useContext(TodoContext);
  const todo = route.params?.id
    ? todos.find((item) => item.id === route.params.id)
    : undefined;

  return (
    <View style={globalStyles.centered}>
      <Formik
        initialValues={{
          emoji: todo?.emoji ?? "",
          name: todo?.name ?? "",
          notes: todo?.notes ?? "",
          project: todo?.project ?? "",
          disableNotifications: todo?.disableNotifications ?? false,
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
            type: todo ? "update" : "add",
            payload: new Todo({
              emoji: values.emoji,
              name: values.name,
              notes: values.notes,
              project: values.project,
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
            <ModalSelector
              data={projects
                .map((proj) => {
                  return {
                    key: proj.id,
                    label: proj.name,
                  };
                })
                .toArray()}
              initValue={
                projects.find((proj) => proj.id === formik.values.project)
                  ?.name ?? "No project!"
              }
              onChange={(option) => {
                formik.setFieldValue("project", option.key);
              }}
            />
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
            <SubmitButton
              onPress={() => formik.handleSubmit()}
              text={`${todo ? "Edit" : "Create"} Task`}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
export default ViewTodoScreen;
