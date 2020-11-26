import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';

const TodoScreen = () => {
    const modalizeRef = React.useRef<Modalize>(null);
    const onOpen = () => modalizeRef.current?.open();

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
            // onFocus
            />
        </View>
        <View>
            <Text>Create your first task here!</Text>
            <Image source={require('../../assets/old_mascot/attention.png')} />
        </View>
        <Modalize
            ref={modalizeRef}
            modalHeight={400}
            modalTopOffset={20}
            alwaysOpen={100}
            handlePosition={'inside'}
            withOverlay={false}
            sectionListProps={{
                ListHeaderComponent: <Text>Your Todos</Text>,
                sections: [],
                ListEmptyComponent: <Text>You have no todos!</Text>
            }}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    modalContainer: {
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TodoScreen;