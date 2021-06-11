import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles, textStyles } from "../../../styles";
import SubmitButton from "../../components/util/SubmitButton";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
import wrapAsync from "../../util/dispatchAsync";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { findDeadline, getTheme } from "../../redux/selectors";
import {
  addFirebaseDeadline,
  completeFirebaseDeadline,
  deleteFirebaseDeadline,
  updateFirebaseDeadline,
} from "../../redux/actions/deadlines/thunks";
import Deadline, { DeadlineFromEntity } from "../../models/Deadline";
import { RootStackParamList, Screens } from "../navConstants";
import OneButtonForm from "../../components/layout/OneButtonForm";

type ViewProjectScreenRouteProp = RouteProp<
  RootStackParamList,
  Screens.ViewDeadline | Screens.AddDeadline
>;

type ViewProjectScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  Screens.ViewDeadline | Screens.AddDeadline
>;

type Props = {
  route: ViewProjectScreenRouteProp;
  navigation: ViewProjectScreenNavigationProp;
};

const styles = StyleSheet.create({
  nameCol: {
    ...globalStyles.column,
    width: Dimensions.get("screen").width * 0.55,
  },
  dateCol: {
    width: 0.3 * Dimensions.get("screen").width,
    justifyContent: "center",
  },
  nameInput: { ...globalStyles.inputBox, width: "100%" },
});

const ViewDeadlineScreen = ({ route, navigation }: Props) => {
  const deadline = useAppSelector(findDeadline(route.params.deadlineID));
  const theme = useAppSelector(getTheme);
  const windowDimensions = useWindowDimensions();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dispatch = useAppDispatch();

  const initialValues = {
    name: deadline?.name ?? "",
    due: deadline?.due ? new Date(deadline.due) : new Date(),
    todos: deadline?.todos ?? [],
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors: {
          emoji?: string;
          name?: string;
        } = {};

        if (!values.name) errors.name = "Please enter a name.";

        return errors;
      }}
      onSubmit={async (values) => {
        dispatch(
          deadline
            ? updateFirebaseDeadline(
                new Deadline({
                  ...DeadlineFromEntity(deadline),
                  name: values.name,
                  due: values.due,
                }).toEntity()
              )
            : addFirebaseDeadline(
                new Deadline({
                  project: route.params.projID ?? "",
                  name: values.name,
                  due: values.due,
                }).toEntity()
              )
        );
        navigation.goBack();
      }}
    >
      {(formik) => (
        <OneButtonForm
          button={
            <>
              {deadline && (
                <View
                  style={{
                    ...globalStyles.row,
                    paddingHorizontal: windowDimensions.width * 0.1,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <SubmitButton
                    style={{ width: "45%" }}
                    onPress={async () => {
                      await wrapAsync(() =>
                        dispatch(completeFirebaseDeadline(deadline))
                      );

                      navigation.goBack();
                      Toast.show({
                        type: "success",
                        position: "bottom",
                        text1: "Completed deadline!",
                        text2: deadline.name,
                      });
                    }}
                    text="Complete"
                  />
                  <SubmitButton
                    style={{ width: "45%" }}
                    onPress={async () => {
                      await wrapAsync(() =>
                        dispatch(deleteFirebaseDeadline(deadline))
                      );

                      navigation.goBack();
                      Toast.show({
                        type: "info",
                        position: "bottom",
                        text1: "Deleted deadline!",
                        text2: deadline.name,
                      });
                    }}
                    text="Delete"
                  />
                </View>
              )}
              <SubmitButton
                onPress={() => formik.handleSubmit()}
                text={deadline ? "Save Changes" : "Add Deadline"}
              />
            </>
          }
        >
          <Text style={textStyles.questionText}>Deadline description:</Text>
          <TextInput
            style={{ ...styles.nameInput, borderColor: theme.dark }}
            onChangeText={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            placeholder="Name"
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <Text style={textStyles.validationMessage}>
              {formik.errors.name}
            </Text>
          )}
          <Text style={textStyles.questionText}>Select a due date:</Text>
          <TextInput
            style={{ ...styles.nameInput, borderColor: theme.dark }}
            placeholder="Date"
            value={formik.values.due.toDateString()}
            onFocus={() => setShowDatePicker(true)}
            enabled={false}
          />
          {showDatePicker && (
            <DateTimePicker
              style={styles.dateCol}
              value={formik.values.due}
              mode="date"
              is24Hour={true}
              display="default"
              minimumDate={new Date()}
              onChange={(event, date) => {
                setShowDatePicker(Platform.OS === "ios");
                formik.setFieldValue("due", date ?? formik.values.due);
              }}
            />
          )}
        </OneButtonForm>
      )}
    </Formik>
  );
};
export default ViewDeadlineScreen;
