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
import { getAllTodos, getProjects, getTheme } from "../../redux/selectors";
import {
  addFirebaseTodo,
  updateFirebaseTodo,
} from "../../redux/actions/todos/thunks";
import { UNCATEGORISED_TODO_PROJID } from "../../util/constants";
import OneButtonForm from "../../components/layout/OneButtonForm";

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
  emojiInput: { ...globalStyles.inputBox, flex: 1 },
  nameInput: { ...globalStyles.inputBox, flex: 4 },
});

const ViewTodoScreen = ({ route, navigation }: Props) => {
  const projects = useAppSelector(getProjects);
  const todos = useAppSelector(getAllTodos);
  const theme = useAppSelector(getTheme);
  const dispatch = useAppDispatch();
  const todo = route.params?.id
    ? todos.find((item) => item.id === route.params.id)
    : undefined;

  return (
    <Formik
      initialValues={{
        emoji: todo?.emoji ?? "",
        name: todo?.name ?? "",
        project: todo?.project ?? UNCATEGORISED_TODO_PROJID,
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
                }).toEntity()
              )
            : addFirebaseTodo(
                new Todo({
                  emoji: values.emoji,
                  name: values.name,
                  project: values.project,
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
            data={projects.map((proj) => {
              return {
                key: proj.id,
                label: proj.name,
              };
            })}
            initValue={
              projects.find((proj) => proj.id === formik.values.project)
                ?.name ?? "No project!"
            }
            onChange={(option) => {
              formik.setFieldValue("project", option.key);
            }}
            cancelText="Cancel"
          />
        </OneButtonForm>
      )}
    </Formik>
  );
};
export default ViewTodoScreen;
