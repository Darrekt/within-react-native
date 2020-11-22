import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/HomeScreen';
import StatScreen from './src/StatScreen';
import OnboardingScreen from './src/OnboardingScreen';
// import GroupScreen from './src/GroupScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
        <Tab.Screen name="Stats" component={StatScreen}/>
        <Tab.Screen name="Groups" component={OnboardingScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}