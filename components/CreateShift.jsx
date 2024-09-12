import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { createShift } from '../api'; // Adjust the path

const CreateShift = () => {
  const [start_time, setStartTime] = useState('');
  const [end_time, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [foreman_name, setForemanName] = useState('');

  const handleSubmit = async () => {
    try {
      await createShift({ start_time, end_time, location, foreman_name });
      Alert.alert('Success', 'Shift created successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to create shift');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Start Time"
        value={start_time}
        onChangeText={setStartTime}
      />
      <TextInput
        placeholder="End Time"
        value={end_time}
        onChangeText={setEndTime}
      />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        placeholder="Foreman Name"
        value={foreman_name}
        onChangeText={setForemanName}
      />
      <Button title="Create Shift" onPress={handleSubmit} />
    </View>
  );
};

export default CreateShift;
