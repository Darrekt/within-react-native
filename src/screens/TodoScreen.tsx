import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import TodoListHeader from '../components/todo/TodoListHeader'
import { globalStyles } from '../../styles';

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    height: 30,
  },
  modalHeaderText: {
    fontSize: 24,
  }
});

const listEmptyDisplay = <View style={globalStyles.centered}>
  <Text>You have no todos!</Text>
</View>

const TodoScreen = () => {
  //TODO: Implement taskIsRunning
  const [taskIsRunning, setTaskIsRunning] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const modalizeRef = React.useRef<Modalize>(null);
  const openModal = () => modalizeRef.current?.open("top");
  const closeModal = () => modalizeRef.current?.close("alwaysOpen");

  return <View style={globalStyles.container}>
    <Image source={require('../../assets/old_mascot/logo.png')} />
    <View>
      <Text>Task List</Text>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => { }}
        placeholder="Create a task"
        clearTextOnFocus
        // onSubmitEditing
        onFocus={openModal}
        onBlur={closeModal}
      />
    </View>
    <View>
      <Image source={require('../../assets/old_mascot/attention.png')} />
    </View>
    <Modalize
      ref={modalizeRef}
      modalHeight={400}
      alwaysOpen={100}
      handlePosition={'inside'}
      withOverlay={false}
      onPositionChange={(position) => { position == 'top' ? setIsOpen(true) : setIsOpen(false) }}
      panGestureEnabled={!taskIsRunning}
      HeaderComponent={<View style={styles.spacer}></View>}
      sectionListProps={{
        ListHeaderComponent: <TodoListHeader isOpen={isOpen} />,
        sections: [],
        ListEmptyComponent: isOpen ? listEmptyDisplay : undefined
      }}
    />
  </View>
}

export default TodoScreen;