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
import Toast from "react-native-toast-message";
import wrapAsync from "../../util/dispatchAsync";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllTodos, getProjects } from "../../redux/selectors";
import {
  addFirebaseTodo,
  updateFirebaseTodo,
} from "../../redux/actions/todos/thunks";
import { UNCATEGORISED_TODO_PROJID } from "../../models/Project";

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
  const projects = useAppSelector(getProjects);
  const todos = useAppSelector(getAllTodos);
  const dispatch = useAppDispatch();
  const todo = route.params?.id
    ? todos.find((item) => item.id === route.params.id)
    : undefined;

  return (
    <View style={globalStyles.centered}>
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
          if (!values.project) errors.project = "Invalid project ID";

          return errors;
        }}
        onSubmit={async (values) => {
          await wrapAsync(() =>
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
            )
          );
          Toast.show({
            type: "success",
            position: "bottom",
            text1: `${todo ? "Updated" : "Added"} todo!`,
            text2: values.name,
          });
          navigation.goBack();
        }}
      >
        {(formik) => (
          <View style={globalStyles.form}>
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
            </View>
            <View style={globalStyles.bottomButtons}>
              <SubmitButton
                onPress={() => formik.handleSubmit()}
                text={`${todo ? "Edit" : "Create"} Task`}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};
export default ViewTodoScreen;
