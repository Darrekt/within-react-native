import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import { useNavigation } from "@react-navigation/native";
import SubmitButton from "../../components/util/SubmitButton";
import Card from "../../components/layout/Card";
import { printTimeLeft } from "../../util/timer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSettings } from "../../redux/selectors";
import { changeWorkParams } from "../../redux/actions/settings/thunks";

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
  const settings = useAppSelector(getSettings);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50}
      style={{ flex: 1, justifyContent: "flex-start" }}
    >
      <Formik
        initialValues={{
          maxProjects: settings.maxProjects,
          maxTasks: settings.maxTasks,
          defaultInterval: settings.defaultInterval / 60,
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
          // if (!values.defaultInterval)
          //   errors.defaultInterval = "Invalid duration!";
          // if (values.defaultInterval < 20)
          //   errors.defaultInterval = "Too short!";
          // if (values.defaultInterval > 45)
          //   errors.defaultInterval = "Too long!";

          return errors;
        }}
        onSubmit={(values) => {
          dispatch(
            changeWorkParams(
              values.maxProjects,
              values.maxTasks,
              values.defaultInterval * 60
            )
          );
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
            {/* <Card elevation={0.5}>
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
                  maxLength={2}
                  value={formik.values.defaultInterval.toString()}
                  onSubmitEditing={() => formik.handleSubmit()}
                />
                {formik.touched.defaultInterval &&
                  formik.errors.defaultInterval && (
                    <Text style={textStyles.validationMessage}>
                      {formik.errors.defaultInterval}
                    </Text>
                  )}
              </View>
            </Card> */}
            <SubmitButton text="Save Settings" onPress={formik.handleSubmit} />
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};
export default EditProductivitySettingScreen;
