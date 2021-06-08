import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Formik } from "formik";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import Project, { ProjectFromEntity } from "../../models/Project";
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
import { getProjects, getTheme } from "../../redux/selectors";
import {
  addFirebaseProject,
  completeFirebaseProject,
  deleteFirebaseProject,
  updateFirebaseProject,
} from "../../redux/actions/projects/thunks";
import { RootStackParamList, Screens } from "../navConstants";
import { compareDeadlines } from "../../models/Deadline";
import OneButtonForm from "../../components/layout/OneButtonForm";

type ViewProjectScreenRouteProp = RouteProp<
  RootStackParamList,
  Screens.ViewProject
>;

type ViewProjectScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  Screens.ViewProject
>;

type Props = {
  route: ViewProjectScreenRouteProp;
  navigation: ViewProjectScreenNavigationProp;
};

const bottomButtonWidth = Dimensions.get("screen").width * 0.85;
const styles = StyleSheet.create({
  emojiInput: { ...globalStyles.inputBox, flex: 1 },
  nameInput: { ...globalStyles.inputBox, flex: 4 },
  boolEntry: {
    ...globalStyles.row,
    padding: 10,
  },
});

const ViewProjectScreen = ({ route, navigation }: Props) => {
  const projects = useAppSelector(getProjects);
  const theme = useAppSelector(getTheme);
  const dispatch = useAppDispatch();

  const project = route.params?.projID
    ? projects.find((proj) => proj.id === route.params.projID)
    : undefined;

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
          dispatch(
            project
              ? updateFirebaseProject(
                  new Project({
                    ...ProjectFromEntity(project),
                    emoji: values.emoji,
                    name: values.name,
                    notes: values.notes,
                  })
                )
              : addFirebaseProject(
                  new Project({
                    emoji: values.emoji,
                    name: values.name,
                    notes: values.notes,
                  })
                )
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
        <OneButtonForm
          centerFields={false}
          nakedPage={false}
          button={
            <>
              {project && (
                <View
                  style={{
                    ...globalStyles.row,
                    paddingHorizontal: Dimensions.get("screen").width * 0.1,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <SubmitButton
                    style={{ width: "45%" }}
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
                    style={{ width: "45%" }}
                    onPress={async () => {
                      await wrapAsync(() =>
                        dispatch(deleteFirebaseProject(project.id))
                      );

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
                onPress={() => formik.handleSubmit()}
                text={project ? "Save Changes" : "Add Project"}
              />
            </>
          }
        >
          <HeadingDropDown header="Project Info">
            <View style={{ ...globalStyles.row, marginBottom: 15 }}>
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
              style={{ ...globalStyles.inputBox, borderColor: theme.dark }}
              onChangeText={formik.handleChange("notes")}
              onBlur={formik.handleBlur("notes")}
              placeholder="Notes"
              value={formik.values.notes}
            />
          </HeadingDropDown>
          {project && (
            <HeadingDropDown
              header="Deadlines"
              topMargin={"5%"}
              dropdown={
                <HeaderButton
                  onPress={() =>
                    navigation.navigate(Screens.AddDeadline, {
                      deadlineID: undefined,
                      projID: project.id,
                    })
                  }
                  iconName="plus"
                  iconType="entypo"
                />
              }
            >
              <ScrollView style={{ width: "100%" }}>
                {project.deadlines.sort(compareDeadlines).map((ddl) => (
                  <DeadlineDisplay key={ddl.id} deadline={ddl} />
                ))}
              </ScrollView>
            </HeadingDropDown>
          )}
        </OneButtonForm>
      )}
    </Formik>
  );
};
export default ViewProjectScreen;
