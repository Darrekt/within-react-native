import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { ProjContext } from "../../state/context";
import { globalStyles, textStyles } from "../../../styles";
import Project from "../../models/Project";
import EmojiRegex from "emoji-regex";
import SubmitButton from "../../components/util/SubmitButton";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import wrapAsync from "../../util/dispatchAsync";

import { LineChart } from "react-native-chart-kit";

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

const styles = StyleSheet.create({
  emojiInput: { ...globalStyles.inputBox, width: "20%" },
  nameInput: { ...globalStyles.inputBox, width: "50%" },
  boolEntry: {
    ...globalStyles.row,
    padding: 10,
  },
});

const ViewProjectScreen = ({ route, navigation }: Props) => {
  const { projects, dispatch } = React.useContext(ProjContext);
  const project = route.params?.id
    ? projects.find((proj) => proj.id === route.params.id)
    : undefined;

  return (
    <View style={globalStyles.column}>
      <Formik
        initialValues={{
          emoji: project?.emoji ?? "",
          name: project?.name ?? "",
          notes: project?.notes ?? "",
          due: project?.due ?? new Date(),
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
        onSubmit={(values) => {
          dispatch({
            type: project ? "update" : "add",
            payload: new Project({
              id: project?.id,
              emoji: values.emoji,
              name: values.name,
              notes: values.notes,
              due: values.due,
            }),
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
            <View style={globalStyles.row}>
              <Text
                style={{
                  textAlign: "right",
                }}
              >
                Due date:
              </Text>
              <DateTimePicker
                style={{ minWidth: 0.3 * Dimensions.get("window").width }}
                value={formik.values.due}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, date) => formik.setFieldValue("due", date)}
              />
            </View>
            {project && (
              <LineChart
                data={{
                  labels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
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
                style={{
                  marginVertical: 8,
                  borderRadius: 16,
                }}
              />
            )}
            {project && (
              <SubmitButton
                onPress={async () => {
                  await wrapAsync(() =>
                    dispatch({
                      type: "update",
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
              onPress={() => formik.handleSubmit()}
              text={project ? "Save Changes" : "Add Project"}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
export default ViewProjectScreen;
