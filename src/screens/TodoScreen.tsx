import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const TodoScreen = () =>
    <View style={styles.container}>
        <Image source={require('../../assets/old_mascot/logo.png')} />
        <Text>
            Task List
        </Text>
        <TextInput
            style={{ height: 40, width:200, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => {}}
            placeholder="Create a task"
            clearTextOnFocus
            // onSubmitEditing
            // onFocus
        />
        <Text>Create your first task here!</Text>
        <Image source={require('../../assets/old_mascot/attention.png')} />
    </View>

export default TodoScreen;