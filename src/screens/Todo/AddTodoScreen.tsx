import React from "react";
import { View, Text, Switch, Button } from "react-native";
import { Formik } from "formik";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../../../styles";

const AddTodoScreen = () => {
  return <View>
    <Formik
      initialValues={{ name: '', notes: '', disableNotifications: false, }}
      validate={(values) => { }}
      onSubmit={values => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={globalStyles.column}>
          <Text>Task name:</Text>
          <TextInput
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          <Text>Notes</Text>
          <View>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={values.disableNotifications ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => values.disableNotifications = !values.disableNotifications}
            />
          </View>
          <TextInput
            onChangeText={handleChange('notes')}
            onBlur={handleBlur('notes')}
            value={values.notes}
          />
          <Button onPress={() => handleSubmit()} title="Add Task" />
        </View>
      )}
    </Formik>
  </View>
}
export default AddTodoScreen;