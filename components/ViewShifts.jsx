import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { getShifts } from '../api'; // Adjust the path

const ViewShifts = ({ navigation }) => {
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const data = await getShifts();
        setShifts(data);
      } catch (error) {
        console.error('Error fetching shifts:', error);
      }
    };

    fetchShifts();
  }, []);

  return (
    <FlatList
      data={shifts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ShiftDetails', { id: item._id })}>
          <Text>{item.foreman_name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

export default ViewShifts;
