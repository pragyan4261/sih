import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateShift from './components/CreateShift';
import ViewShifts from './components/ViewShifts';
import ShiftDetails from './components/ShiftDetails';
import Registration from './screens/Register'

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreateShift">
        <Stack.Screen name="CreateShift" component={CreateShift} />
        <Stack.Screen name="ViewShifts" component={ViewShifts} />
        <Stack.Screen name="ShiftDetails" component={ShiftDetails} />
        <Stack.Screen name="Register" component={Registration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
