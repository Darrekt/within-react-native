import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import Todo, { TodoFromEntity } from "../../models/Todo";
import EmojiRegex from "emoji-regex";
import SubmitButton from "../../components/util/SubmitButton";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import ModalSelector from "react-native-modal-selector";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  getAllTodos,
  getIncompleteProjects,
  getTheme,
} from "../../redux/selectors";
import {
  addFirebaseTodo,
  updateFirebaseTodo,
} from "../../redux/actions/todos/thunks";
import { UNCATEGORISED_TODO_PROJID } from "../../util/constants";
import OneButtonForm from "../../components/layout/OneButtonForm";
import { RootStackParamList, Screens } from "../navConstants";

type ViewProjectScreenRouteProp = RouteProp<
  RootStackParamList,
  Screens.ViewTodo
>;

type ViewProjectScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  Screens.ViewTodo
>;

type Props = {
  route: ViewProjectScreenRouteProp;
  navigation: ViewProjectScreenNavigationProp;
};

const styles = StyleSheet.create({
  emojiInput: { ...globalStyles.inputBox, flex: 1 },
  nameInput: { ...globalStyles.inputBox, flex: 4 },
});

const ViewTodoScreen = ({ route, navigation }: Props) => {
  const projects = useAppSelector(getIncompleteProjects);
  const todos = useAppSelector(getAllTodos);
  const theme = useAppSelector(getTheme);
  const dispatch = useAppDispatch();
  const todo = route.params?.todoID
    ? todos.find((item) => item.id === route.params.todoID)
    : undefined;

  return (
    <Formik
      initialValues={{
        emoji: todo?.emoji ?? "",
        name: todo?.name ?? "",
        project: todo?.project ?? UNCATEGORISED_TODO_PROJID,
        deadline: todo?.deadline ?? null,
      }}
      validate={(values) => {
        const errors: {
          emoji?: string;
          name?: string;
          project?: string;
        } = {};

        if (values.emoji && !EmojiRegex().test(values.emoji))
          errors.emoji = "Invalid emoji";
        if (!values.name) errors.name = "Please enter a task name.";

        return errors;
      }}
      onSubmit={async (values) => {
        dispatch(
          todo
            ? updateFirebaseTodo(
                new Todo({
                  ...TodoFromEntity(todo),
                  emoji: values.emoji,
                  name: values.name,
                  project: values.project,
                  deadline: values.deadline,
                }).toEntity()
              )
            : addFirebaseTodo(
                new Todo({
                  emoji: values.emoji,
                  name: values.name,
                  project: values.project,
                  deadline: values.deadline,
                }).toEntity()
              )
        );
        navigation.goBack();
      }}
    >
      {(formik) => (
        <OneButtonForm
          button={
            <SubmitButton
              onPress={() => formik.handleSubmit()}
              text={`${todo ? "Edit" : "Create"} Task`}
            />
          }
        >
          <Text style={textStyles.questionText}>Name your task:</Text>
          <View
            style={{ ...globalStyles.row, justifyContent: "space-between" }}
          >
            <TextInput
              style={{ ...styles.emojiInput, borderColor: theme.dark }}
              onChangeText={formik.handleChange("emoji")}
              onBlur={formik.handleBlur("emoji")}
              placeholder="Emoji"
              value={formik.values.emoji}
            />
            <View style={{ width: "10%" }} />
            <TextInput
              style={{ ...styles.nameInput, borderColor: theme.dark }}
              onChangeText={formik.handleChange("name")}
              onBlur={formik.handleBlur("name")}
              placeholder="Task name"
              value={formik.values.name}
            />
          </View>
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

          <Text style={textStyles.questionText}>Assign it to a project:</Text>
          <ModalSelector
            initValueTextStyle={{
              color: "black",
            }}
            style={{
              alignSelf: "stretch",
              backgroundColor: "white",
              borderColor: theme.dark,
            }}
            data={projects.map((proj) => ({
              key: proj.id,
              label: proj.name,
            }))}
            initValue={
              projects.find((proj) => proj.id === formik.values.project)
                ?.name ?? "No project!"
            }
            onChange={(option) => {
              formik.setFieldValue("project", option.key);
            }}
            cancelText="Cancel"
          />
          <Text style={textStyles.questionText}>
            (Optionally) Assign it to a deadline:
          </Text>
          <ModalSelector
            initValueTextStyle={{
              color: "black",
            }}
            style={{
              alignSelf: "stretch",
              backgroundColor: "white",
              borderColor: theme.dark,
            }}
            data={
              projects
                .find(
                  (proj) =>
                    (formik.values.project ?? UNCATEGORISED_TODO_PROJID) ===
                    proj.id
                )
                ?.deadlines.map((deadline) => ({
                  key: deadline.id,
                  label: deadline.name,
                })) ?? []
            }
            initValue={
              projects
                .find(
                  (proj) =>
                    (formik.values.project ?? UNCATEGORISED_TODO_PROJID) ===
                    proj.id
                )
                ?.deadlines.find(
                  (deadline) => formik.values.deadline === deadline.id
                )?.name ?? "No deadline"
            }
            onChange={(option) => {
              formik.setFieldValue("deadline", option.key);
            }}
            cancelText="Cancel"
          />
        </OneButtonForm>
      )}
    </Formik>
  );
};
export default ViewTodoScreen;
