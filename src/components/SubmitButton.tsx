import React from 'react'
import { globalStyles, textStyles } from "../../styles";
import { Text, TouchableOpacity } from 'react-native'

function SubmitButton({ text, onPress, width }: { text: string, onPress: () => void, width?: number | string, }) {
    return (
        <TouchableOpacity
            style={{ ...globalStyles.submitButton, width: width ?? globalStyles.submitButton.width }}
            activeOpacity={.5}
            onPress={onPress}
        >

            <Text style={textStyles.buttonText}>{text}</Text>
        </TouchableOpacity >
    )
}

export default SubmitButton;
