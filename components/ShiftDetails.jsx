import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { getShiftById } from '../api'; // Adjust the path

const ShiftDetails = ({ route }) => {
  const { id } = route.params;
  const [shift, setShift] = useState(null);

  useEffect(() => {
    const fetchShift = async () => {
      try {
        const data = await getShiftById(id);
        setShift(data);
      } catch (error) {
        console.error('Error fetching shift details:', error);
      }
    };

    fetchShift();
  }, [id]);

  if (!shift) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <Text>Start Time: {shift.start_time}</Text>
      <Text>End Time: {shift.end_time}</Text>
      <Text>Location: {shift.location}</Text>
      <Text>Foreman Name: {shift.foreman_name}</Text>
    </View>
  );
};

export default ShiftDetails;
