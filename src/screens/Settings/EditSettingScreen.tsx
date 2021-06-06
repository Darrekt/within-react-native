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
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getSettings } from "../../redux/selectors";
import { changeWorkParams } from "../../redux/actions/settings/thunks";
import OneButtonForm from "../../components/layout/OneButtonForm";

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
          <OneButtonForm
            centerFields={false}
            button={
              <SubmitButton
                text="Save Settings"
                onPress={formik.handleSubmit}
              />
            }
          >
            <Card elevation={2}>
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
            <Card elevation={2}>
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
          </OneButtonForm>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};
export default EditProductivitySettingScreen;
