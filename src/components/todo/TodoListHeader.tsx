import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { globalStyles } from '../../../styles';

type IProps = {
  isOpen: boolean,
  taskIsRunning?: boolean,
}

const TodoListHeader = ({ isOpen, taskIsRunning }: IProps) => {
  return <View style={isOpen ? styles.headerRow : globalStyles.centered}>
    <Text style={ styles.modalHeaderText }>
      {isOpen ? 'Your Todos' : '0 tasks remaining'}
    </Text>
    {
      isOpen && <Pressable onPress={() => { console.log("pressed add item") }}>
        <Entypo name="add-to-list" size={20} color="black" />
      </Pressable>
    }
  </View>

}

const styles = StyleSheet.create({
  headerRow: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalHeaderText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500',
  }
});

export default TodoListHeader;