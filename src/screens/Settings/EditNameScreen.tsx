import React from "react";
import { View, Button } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles";
import { StackNavigationProp } from "@react-navigation/stack";
import auth from "@react-native-firebase/auth";

type ChangePWNavigationProp = StackNavigationProp<
  { EditPasswordScreen: undefined },
  "EditPasswordScreen"
>;

const EditPasswordScreen = ({
  navigation,
}: {
  navigation: ChangePWNavigationProp;
}) => {
  return (
    <View>
      <Formik
        initialValues={{ password: "" }}
        validate={(values) => {
          let errors = {};
        }}
        onSubmit={async (values) => {}}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
        }) => (
          <View style={globalStyles.column}>
            <TextInput
              style={globalStyles.inputBox}
              autoCapitalize="none"
              autoCompleteType="password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              placeholder="Password"
              value={values.password}
              onSubmitEditing={() => handleSubmit()}
            />
            <TextInput
              style={globalStyles.inputBox}
              autoCapitalize="none"
              autoCompleteType="password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              placeholder="Password"
              value={values.password}
              onSubmitEditing={() => handleSubmit()}
            />
            <TextInput
              style={globalStyles.inputBox}
              autoCapitalize="none"
              autoCompleteType="password"
              secureTextEntry
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              placeholder="Password"
              value={values.password}
              onSubmitEditing={() => handleSubmit()}
            />
            <Button
              color={globalStyles.submitButton.backgroundColor}
              onPress={() => handleSubmit()}
              title="Sign In"
            />
          </View>
        )}
      </Formik>
    </View>
  );
};
export default EditPasswordScreen;
