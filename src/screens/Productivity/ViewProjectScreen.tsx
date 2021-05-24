import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import Project, { fromEntity } from "../../models/Project";
import EmojiRegex from "emoji-regex";
import SubmitButton from "../../components/util/SubmitButton";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import wrapAsync from "../../util/dispatchAsync";
import HeadingDropDown from "../../components/layout/HeadingDropDown";
import DeadlineDisplay from "../../components/todo/DeadlineDisplay";
import HeaderButton from "../../components/util/HeaderButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getProjects } from "../../redux/selectors";
import ProjectProgressGraph from "../../components/todo/ProjectProgressGraph";
import { deleteProject } from "../../redux/actions/projects/actions";
import {
  addFirebaseProject,
  completeFirebaseProject,
  updateFirebaseProject,
} from "../../redux/actions/projects/thunks";

type RootStackParamList = {
  ViewProjScreen: { id: string };
  EditTodoScreen: { id: string };
};

type ViewProjectScreenRouteProp = RouteProp<
  RootStackParamList,
  "ViewProjScreen"
>;

type ViewProjectScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ViewProjScreen"
>;

type Props = {
  route: ViewProjectScreenRouteProp;
  navigation: ViewProjectScreenNavigationProp;
};

const bottomButtonWidth = Dimensions.get("screen").width * 0.85;
const styles = StyleSheet.create({
  emojiInput: { ...globalStyles.inputBox, width: "20%" },
  nameInput: { ...globalStyles.inputBox, width: "50%" },
  boolEntry: {
    ...globalStyles.row,
    padding: 10,
  },
});

const ViewProjectScreen = ({ route, navigation }: Props) => {
  const projects = useAppSelector(getProjects);
  const dispatch = useAppDispatch();

  const project = route.params?.id
    ? projects.find((proj) => proj.id === route.params.id)
    : undefined;

  const addDeadlineBtn = (
    <HeaderButton route="AddDeadlinePage" iconName="plus" iconType="entypo" />
  );

  return (
    <Formik
      initialValues={{
        emoji: project?.emoji ?? "",
        name: project?.name ?? "",
        notes: project?.notes ?? "",
        deadlines: project?.deadlines ?? [],
      }}
      validate={(values) => {
        const errors: {
          emoji?: string;
          name?: string;
        } = {};

        if (values.emoji && !EmojiRegex().test(values.emoji))
          errors.emoji = "Invalid emoji";

        if (!values.name) errors.name = "Please enter a project name.";

        return errors;
      }}
      onSubmit={async (values) => {
        await wrapAsync(() => {
          const updatedProj = new Project({
            ...fromEntity(project),
            emoji: values.emoji,
            name: values.name,
            notes: values.notes,
          });
          dispatch(
            project
              ? updateFirebaseProject(updatedProj)
              : addFirebaseProject(updatedProj)
          );
        });
        navigation.goBack();
        Toast.show({
          type: "success",
          position: "bottom",
          text1: `${project ? "Updated" : "Added"} Project:`,
          text2: values.name,
        });
      }}
    >
      {(formik) => (
        <View style={globalStyles.form}>
          <View style={globalStyles.column}>
            <View style={globalStyles.spacer}></View>
            <HeadingDropDown header="Project Info">
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
              <TextInput
                style={globalStyles.inputBox}
                onChangeText={formik.handleChange("notes")}
                onBlur={formik.handleBlur("notes")}
                placeholder="Notes"
                value={formik.values.notes}
              />
            </HeadingDropDown>
            {project && <ProjectProgressGraph />}
          </View>
          {project && (
            <HeadingDropDown header="Deadlines" dropdown={addDeadlineBtn}>
              <DeadlineDisplay></DeadlineDisplay>
            </HeadingDropDown>
          )}
          <View style={globalStyles.bottomButtons}>
            {project && (
              <View
                style={{
                  ...globalStyles.row,
                  width: bottomButtonWidth,
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <SubmitButton
                  width={0.45 * bottomButtonWidth}
                  onPress={async () => {
                    await wrapAsync(() =>
                      dispatch(completeFirebaseProject(project.id))
                    );

                    navigation.goBack();
                    Toast.show({
                      type: "success",
                      position: "bottom",
                      text1: "Completed Project!",
                      text2: project.name,
                    });
                  }}
                  text="Complete"
                />
                <SubmitButton
                  width={0.45 * bottomButtonWidth}
                  onPress={async () => {
                    await wrapAsync(() => dispatch(deleteProject(project.id)));

                    navigation.goBack();
                    Toast.show({
                      type: "info",
                      position: "bottom",
                      text1: "Deleted Project!",
                      text2: project.name,
                    });
                  }}
                  text="Delete"
                />
              </View>
            )}
            <SubmitButton
              width={bottomButtonWidth}
              onPress={() => formik.handleSubmit()}
              text={project ? "Save Changes" : "Add Project"}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};
export default ViewProjectScreen;
