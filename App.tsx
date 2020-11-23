import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { OnboardContext } from "./src/state/context";

import HomeScreen from './src/screens/HomeScreen';
import StatScreen from './src/screens/StatScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import GroupScreen from './src/screens/GroupScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [onboardStatus, setOnboardStatus] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  // TODO: show splash screen until onboarding is resolved.
  // TODO: Add jest testing for onboarding flow
  const getAsyncStorageOnboardStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('onboardStatus');
      setOnboardStatus(value == null ? false : JSON.parse(value));
    } catch (e) {
      console.log(e);
    }
  }

  const setAsyncStorageOnboardStatus = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('onboardStatus', JSON.stringify(value));
      setOnboardStatus(value);
    } catch (e) {
      console.log(e);
    }
  }

  getAsyncStorageOnboardStatus();
  return (
    <OnboardContext.Provider value={{
      finishOnboarding: () => setAsyncStorageOnboardStatus(true),
    }}>

      <NavigationContainer>
        {!onboardStatus ?
          <>
            <Stack.Navigator>
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            </Stack.Navigator>
          </>
          :
          <>
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  switch (route.name) {
                    case 'Stats':
                      iconName = 'md-stats';
                      break;
                    case 'Groups':
                      iconName = 'ios-chatboxes';
                      break;
                    default:
                      iconName = 'ios-home';
                      break;
                  }
                  return <Ionicons name={iconName} size={size} color={color} />
                }
              })}
              tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
              }}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Stats" component={StatScreen} />
              <Tab.Screen name="Groups" component={GroupScreen} />
            </Tab.Navigator>
          </>
        }
      </NavigationContainer>
    </OnboardContext.Provider>
  );
}