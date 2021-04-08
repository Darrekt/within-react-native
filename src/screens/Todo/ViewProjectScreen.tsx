import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Formik, validateYupSchema } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { ProjContext } from "../../state/context";
import { globalStyles, textStyles } from "../../../styles";
import Project from "../../models/Project";
import EmojiRegex from "emoji-regex";
import SubmitButton from "../../components/util/SubmitButton";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  LineChart,
  BarChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

type RootStackParamList = {
  ViewProjScreen: { id: string };
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

// TODO: View a due date selector

const ViewProjectScreen = ({ route, navigation }: Props) => {
  const { projects, dispatch } = React.useContext(ProjContext);
  const project = projects.find((proj) => proj.id === route.params.id);

  return (
    <View style={globalStyles.column}>
      <Formik
        initialValues={{
          emoji: project?.emoji,
          name: project?.name,
          notes: project?.notes,
          due: project?.due ?? new Date(),
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
            type: "update",
            payload: new Project({
              id: project?.id,
              emoji: values.emoji,
              name: values.name,
              notes: values.notes,
              due: values.due,
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
            <LineChart
              data={{
                labels: [
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                ],
                datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                    ],
                  },
                ],
              }}
              width={0.85 * Dimensions.get("window").width} // from react-native
              height={0.2 * Dimensions.get("window").height}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 15,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            <SubmitButton
              onPress={() => formik.handleSubmit()}
              text="Save Changes"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
export default ViewProjectScreen;
