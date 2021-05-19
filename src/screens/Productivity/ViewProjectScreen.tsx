import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import Project from "../../models/Project";
import EmojiRegex from "emoji-regex";
import SubmitButton from "../../components/util/SubmitButton";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import wrapAsync from "../../util/dispatchAsync";
import { LineChart } from "react-native-chart-kit";
import HeadingDropDown from "../../components/layout/HeadingDropDown";
import DeadlineDisplay from "../../components/todo/DeadlineDisplay";
import { GlobalStateContext } from "../../redux/context";
import { Actions } from "../../redux/actionTypes";
import HeaderButton from "../../components/util/HeaderButton";

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

const bottomButtonWidth = "85%";
const styles = StyleSheet.create({
  emojiInput: { ...globalStyles.inputBox, width: "20%" },
  nameInput: { ...globalStyles.inputBox, width: "50%" },
  boolEntry: {
    ...globalStyles.row,
    padding: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

const ViewProjectScreen = ({ route, navigation }: Props) => {
  const { state, dispatch } = React.useContext(GlobalStateContext);

  const project = route.params?.id
    ? state.projects.find((proj) => proj.id === route.params.id)
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
        await wrapAsync(() =>
          dispatch({
            type: project ? Actions.ProjectUpdate : Actions.ProjectAdd,
            payload: new Project({
              ...project,
              emoji: values.emoji,
              name: values.name,
              notes: values.notes,
              // TODO
              // deadlines: List(values.deadlines),
            }),
          })
        );
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
            {/* DATE DISPLAY */}
            {project && (
              <HeadingDropDown header="Progress">
                <LineChart
                  data={{
                    labels: [
                      "Sun",
                      "Mon",
                      "Tues",
                      "Wed",
                      "Thurs",
                      "Fri",
                      "Sat",
                    ],
                    datasets: [
                      {
                        data: [
                          Math.random() * 10,
                          Math.random() * 10,
                          Math.random() * 10,
                          Math.random() * 10,
                          Math.random() * 10,
                          Math.random() * 10,
                        ],
                      },
                    ],
                  }}
                  width={0.85 * Dimensions.get("window").width} // from react-native
                  height={0.2 * Dimensions.get("window").height}
                  chartConfig={{
                    backgroundGradientFrom: "#01C2EF",
                    backgroundGradientTo: "#56DEF1",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 15,
                    },
                    propsForDots: {
                      r: "5",
                      strokeWidth: "1",
                      stroke: "#FFAE5E",
                    },
                  }}
                  bezier
                  style={styles.chart}
                />
              </HeadingDropDown>
            )}
          </View>
          {project && (
            <HeadingDropDown header="Deadlines" dropdown={addDeadlineBtn}>
              <DeadlineDisplay></DeadlineDisplay>
              {/* <DateTimePicker
                  style={{ minWidth: 0.3 * Dimensions.get("window").width }}
                  value={formik.values.due}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={(event, date) => formik.setFieldValue("due", date)}
                /> */}
            </HeadingDropDown>
          )}
          <View style={globalStyles.bottomButtons}>
            {project && (
              <SubmitButton
                width={bottomButtonWidth}
                onPress={async () => {
                  await wrapAsync(() =>
                    dispatch({
                      type: Actions.ProjectUpdate,
                      payload: new Project({ ...project, completed: true }),
                    })
                  );

                  navigation.goBack();
                  Toast.show({
                    type: "success",
                    position: "bottom",
                    text1: "Completed Project!",
                    text2: project.name,
                  });
                }}
                text="Complete Project"
              />
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
