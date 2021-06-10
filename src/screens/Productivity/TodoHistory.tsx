import React, { useState } from 'react'
import { Tab } from 'react-native-elements/dist/tab/tab'
import OneButtonForm from '../../components/layout/OneButtonForm'

export default function TodoHistory() {
    const [tab, setTab] = useState(0)
    return (
        <>
            <Tab value={tab}>
                <Tab.Item title="Projects" onPress={() => setTab(0)} />
                <Tab.Item title="Todos" onPress={() => setTab(1)} />
            </Tab>
            
            <OneButtonForm nakedPage>

            </OneButtonForm>
        </>
    )
}
