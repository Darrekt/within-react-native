import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../../../styles";

export default function AddTodoScreen() {
    return <View style={globalStyles.centered}>
        <Text>You have no todos!</Text>
    </View>
}

