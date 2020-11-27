import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type IProps = {
    isOpen: boolean,
    taskIsRunning?: boolean,
}

const TodoListHeader = ({ isOpen, taskIsRunning }: IProps) => {
return <Text style={styles.modalHeaderText}>{isOpen ? 'Your Todos' : '0 tasks remaining'}</Text> 
}

const styles = StyleSheet.create({
    modalHeaderText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '500',
    }
});

export default TodoListHeader;