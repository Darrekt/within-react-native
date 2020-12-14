import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import TodoScreen from './TodoScreen'

test('Renders TodoScreen', () => {
    render(<TodoScreen/>);
})