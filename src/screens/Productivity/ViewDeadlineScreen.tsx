import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
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
import { findDeadline } from "../../redux/selectors";
import {
  addFirebaseDeadline,
  updateFirebaseDeadline,
} from "../../redux/actions/deadlines/thunks";
import Deadline, { DeadlineFromEntity } from "../../models/Deadline";
import { RootStackParamList, Screens } from "../navConstants";

type ViewProjectScreenRouteProp = RouteProp<
  RootStackParamList,
  Screens.ViewDeadline
>;

type ViewProjectScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  Screens.ViewDeadline
>;

type Props = {
  route: ViewProjectScreenRouteProp;
  navigation: ViewProjectScreenNavigationProp;
};

const bottomButtonWidth = "85%";
const styles = StyleSheet.create({
  nameCol: {
    ...globalStyles.column,
    width: Dimensions.get("screen").width * 0.55,
  },
  dateCol: {
    width: 0.3 * Dimensions.get("window").width,
    justifyContent: "center",
  },
  nameInput: { ...globalStyles.inputBox, width: "100%" },
});

const ViewDeadlineScreen = ({ route, navigation }: Props) => {
  const deadline = useAppSelector(findDeadline(route.params.deadlineID));
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
        await wrapAsync(() =>
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
                    project: route.params.projID,
                    name: values.name,
                    due: values.due,
                  }).toEntity()
                )
          )
        );
        navigation.goBack();
        Toast.show({
          type: "success",
          position: "bottom",
          text1: `${deadline ? "Updated" : "Added"} Deadline:`,
          text2: values.name,
        });
      }}
    >
      {(formik) => (
        <View style={globalStyles.form}>
          <View style={globalStyles.row}>
            <View style={styles.nameCol}>
              <TextInput
                style={styles.nameInput}
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
            </View>
            <View style={globalStyles.column}>
              <DateTimePicker
                style={styles.dateCol}
                value={formik.values.due}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(event, date) => formik.setFieldValue("due", date)}
              />
            </View>
          </View>
          <View style={globalStyles.bottomButtons}>
            <SubmitButton
              width={bottomButtonWidth}
              onPress={() => formik.handleSubmit()}
              text={deadline ? "Save Changes" : "Add Deadline"}
            />
          </View>
        </View>
      )}
    </Formik>
  );
};
export default ViewDeadlineScreen;
