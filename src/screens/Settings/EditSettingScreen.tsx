import React, { useContext } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import { useNavigation } from "@react-navigation/native";
import { GlobalStateContext } from "../../state/context";
import SubmitButton from "../../components/util/SubmitButton";
import Card from "../../components/layout/Card";
import { printTimeLeft } from "../../util/timer";
import { Actions } from "../../hooks/Actions";

const styles = StyleSheet.create({
  headerStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
    fontFamily: "Arial",
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "400",
  },
  bodyStyle: {
    flex: 5,
    marginHorizontal: 0.05 * Dimensions.get("window").width,
    textAlign: "justify",
  },
  inputStyle: {
    flex: 1,
    fontSize: 30,
    textAlign: "center",
    marginHorizontal: 0.05 * Dimensions.get("window").width,
  },
});

const validateProjects = (setVal?: number) => {
  if (!setVal) return "Please input a value";
  if (setVal < 1) return "Must be positive!";
  if (setVal > 5) return "Too many!";
};

const EditProductivitySettingScreen = () => {
  const { state, dispatch } = useContext(GlobalStateContext);
  const settings = state.settings;
  const navigation = useNavigation();

  return (
    <View style={globalStyles.column}>
      <Formik
        initialValues={{
          maxProjects: settings.maxProjects,
          maxTasks: settings.maxTasks,
          defaultInterval: settings.defaultInterval,
        }}
        validate={(values) => {
          const errors: {
            maxProjects?: string;
            maxTasks?: string;
            defaultInterval?: string;
          } = {};

          //   TODO: Ugly code, maybe change to using Yup?
          if (validateProjects(values.maxProjects))
            errors.maxProjects = validateProjects(values.maxProjects);
          if (validateProjects(values.maxTasks))
            errors.maxTasks = validateProjects(values.maxTasks);
          return errors;
        }}
        onSubmit={(values) => {
          dispatch({
            type: Actions.SettingsChangeMaxProjects,
            value: values.maxProjects,
          });
          dispatch({
            type: Actions.SettingsChangeMaxTasks,
            value: values.maxTasks,
          });
          dispatch({
            type: Actions.SettingsChangeDefaultInterval,
            value: values.defaultInterval,
          });
          navigation.goBack();
        }}
      >
        {(formik) => (
          <View style={globalStyles.column}>
            <Card elevation={0.5}>
              <Text style={styles.headerStyle}>Maximum Projects</Text>
              <View style={globalStyles.row}>
                <Text style={styles.bodyStyle}>
                  While we encourage keeping busy, there really shouldn't be too
                  many of these at once. Focus is the key!
                </Text>
                <TextInput
                  style={{ ...globalStyles.lightInput, ...styles.inputStyle }}
                  autoCompleteType="off"
                  onChangeText={formik.handleChange("maxProjects")}
                  onBlur={formik.handleBlur("maxProjects")}
                  keyboardType="number-pad"
                  value={`${formik.values.maxProjects}`}
                  onSubmitEditing={() => formik.handleSubmit()}
                />
                {formik.touched.maxProjects && formik.errors.maxProjects && (
                  <Text style={textStyles.validationMessage}>
                    {formik.errors.maxProjects}
                  </Text>
                )}
              </View>
            </Card>
            <Card elevation={0.5}>
              <Text style={styles.headerStyle}>Maximum Tasks</Text>
              <View style={globalStyles.row}>
                <Text style={styles.bodyStyle}>
                  Too many tasks leads to decision paralysis! Each task should
                  be a small and finishable in one or two intervals at most.
                </Text>
                <TextInput
                  style={{ ...globalStyles.lightInput, ...styles.inputStyle }}
                  autoCompleteType="off"
                  onChangeText={formik.handleChange("maxTasks")}
                  onBlur={formik.handleBlur("maxTasks")}
                  keyboardType="number-pad"
                  value={`${formik.values.maxTasks}`}
                  onSubmitEditing={() => formik.handleSubmit()}
                />
                {formik.touched.maxTasks && formik.errors.maxTasks && (
                  <Text style={textStyles.validationMessage}>
                    {formik.errors.maxTasks}
                  </Text>
                )}
              </View>
            </Card>
            {/* TODO: Avoid keyboard and enter in minutes */}
            <Card elevation={0.5}>
              <Text style={styles.headerStyle}>Default interval duration</Text>
              <View style={globalStyles.row}>
                <Text style={styles.bodyStyle}>
                  Keep your focus for at least 20 minutes, but don't get too
                  tired, either! We'll allow a maximum of 45 minutes without
                  rest.
                </Text>
                <TextInput
                  style={{
                    ...globalStyles.lightInput,
                    ...styles.inputStyle,
                    flex: 2,
                    fontSize: 20,
                  }}
                  autoCompleteType="off"
                  onChangeText={formik.handleChange("defaultInterval")}
                  onBlur={formik.handleBlur("defaultInterval")}
                  keyboardType="number-pad"
                  value={printTimeLeft(formik.values.defaultInterval)}
                  onSubmitEditing={() => formik.handleSubmit()}
                />
                {formik.touched.defaultInterval &&
                  formik.errors.defaultInterval && (
                    <Text style={textStyles.validationMessage}>
                      {formik.errors.defaultInterval}
                    </Text>
                  )}
              </View>
            </Card>
            <SubmitButton text="Save Settings" onPress={formik.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};
export default EditProductivitySettingScreen;
