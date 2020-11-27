import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import TodoListHeader from '../components/todo/TodoListHeader'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  centered: {
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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

const listEmptyDisplay = <View style={styles.centered}>
  <Text>You have no todos!</Text>
</View>

const TodoScreen = () => {
  //TODO: Implement taskIsRunning
  const [taskIsRunning, setTaskIsRunning] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const modalizeRef = React.useRef<Modalize>(null);
  const openModal = () => modalizeRef.current?.open();

  return <View style={styles.container}>
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
      />
    </View>
    <View>
      <Text>Create your first task here!</Text>
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
        ListEmptyComponent: listEmptyDisplay
      }}
    />
  </View>
}

export default TodoScreen;