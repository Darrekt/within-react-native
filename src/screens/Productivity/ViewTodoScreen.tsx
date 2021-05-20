import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import Todo from "../../models/Todo";
import EmojiRegex from "emoji-regex";
import SubmitButton from "../../components/util/SubmitButton";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import ModalSelector from "react-native-modal-selector";
import Toast from "react-native-toast-message";
import wrapAsync from "../../util/dispatchAsync";
import { Actions } from "../../redux/actionTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getProjects, getTodos } from "../../redux/selectors";

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
  const todos = useAppSelector(getTodos);
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
          project: todo?.project ?? "",
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
        onSubmit={async (values) => {
          await wrapAsync(() =>
            dispatch({
              type: todo ? Actions.TodoUpdate : Actions.TodoAdd,
              payload: new Todo({
                ...todo,
                emoji: values.emoji,
                name: values.name,
                project: values.project,
              }),
            })
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
                width="85%"
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
