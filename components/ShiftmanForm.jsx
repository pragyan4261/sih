import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const schema = yup.object().shape({
  mine_name: yup.string().required('Mine name is required'),
  location: yup.string().required('Location is required'),
  start_time: yup.string().required('Start time is required'),
  end_time: yup.string().required('End time is required'),
  employee_name: yup.string().required('Employee name is required'),
  log_type: yup.string().required('Log type is required'),
  description: yup.string().required('Description is required'),
  daily_tonnage: yup.number().when('log_type', {
    is: 'ProductionLogEntry',
    then: yup.number().required('Daily tonnage is required'),
  }),
  shift_wise_production: yup.string().when('log_type', {
    is: 'ProductionLogEntry',
    then: yup.string().required('Shift-wise production is required'),
  }),
  incident_type: yup.string().when('log_type', {
    is: 'SafetyLogEntry',
    then: yup.string().required('Incident type is required'),
  }),
  corrective_actions: yup.string().when('log_type', {
    is: 'SafetyLogEntry',
    then: yup.string().required('Corrective actions are required'),
  }),
  operation_type: yup.string().when('log_type', {
    is: 'OperationsLogEntry',
    then: yup.string().required('Operation type is required'),
  }),
  personnel_action: yup.string().when('log_type', {
    is: 'PersonnelLogEntry',
    then: yup.string().required('Personnel action is required'),
  }),
  inspection_type: yup.string().when('log_type', {
    is: 'RegulatoryLogEntry',
    then: yup.string().required('Inspection type is required'),
  }),
  findings: yup.string().when('log_type', {
    is: 'RegulatoryLogEntry',
    then: yup.string().required('Findings are required'),
  }),
});

const LogEntryForm = () => {
  const { control, handleSubmit, watch, setValue, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      mine_name: '',
      location: '',
      start_time: '',
      end_time: '',
      employee_name: '',
      log_type: '',
      description: '',
      daily_tonnage: '',
      shift_wise_production: '',
      incident_type: '',
      corrective_actions: '',
      operation_type: '',
      personnel_action: '',
      inspection_type: '',
      findings: '',
    },
  });

  const [logType, setLogType] = useState('');
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const showStartTimePicker = () => setStartTimePickerVisibility(true);
  const hideStartTimePicker = () => setStartTimePickerVisibility(false);
  const handleStartTimeConfirm = (date) => {
    setStartTime(moment(date).format('HH:mm'));
    setStartTimePickerVisibility(false);
    setValue('start_time', moment(date).format('HH:mm')); // Update form state
  };

  const showEndTimePicker = () => setEndTimePickerVisibility(true);
  const hideEndTimePicker = () => setEndTimePickerVisibility(false);
  const handleEndTimeConfirm = (date) => {
    setEndTime(moment(date).format('HH:mm'));
    setEndTimePickerVisibility(false);
    setValue('end_time', moment(date).format('HH:mm')); // Update form state
  };

  const onSubmit = async (data) => {
    try {
      console.log('Form Data:', data);

      // Example API call (uncomment and configure as needed)
      // const response = await fetch('https://api.example.com/submit', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });
      // const result = await response.json();
      // console.log('API Response:', result);

      Alert.alert('Success', 'Form submitted successfully!');
      reset(); // Reset the form
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'There was a problem submitting the form.');
    }
  };

  return (
    <View style={styles.container}>
      {/* General Log Entry Fields */}
      <Text style={styles.heading}>Mine Name</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Mine Name"
            style={styles.forminput}
          />
        )}
        name="mine_name"
      />

      <Text>Location</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Location"
            style={styles.forminput}
          />
        )}
        name="location"
      />

      <Text>Shift Start Time</Text>
      <Controller
        control={control}
        name="start_time"
        render={({ field: { value } }) => (
          <View>
            <Button title="Select Start Time" onPress={showStartTimePicker} />
            <Text>Start Time: {startTime}</Text>
            <DateTimePickerModal
              isVisible={isStartTimePickerVisible}
              mode="time"
              onConfirm={handleStartTimeConfirm}
              onCancel={hideStartTimePicker}
            />
          </View>
        )}
      />

      <Text>Shift End Time</Text>
      <Controller
        control={control}
        name="end_time"
        render={({ field: { value } }) => (
          <View>
            <Button title="Select End Time" onPress={showEndTimePicker} />
            <Text>End Time: {endTime}</Text>
            <DateTimePickerModal
              isVisible={isEndTimePickerVisible}
              mode="time"
              onConfirm={handleEndTimeConfirm}
              onCancel={hideEndTimePicker}
            />
          </View>
        )}
      />

      <Text>Employee Name</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Employee Name"
            style={styles.forminput}
          />
        )}
        name="employee_name"
      />

      <Text>Log Type</Text>
      <Picker
        selectedValue={logType}
        onValueChange={(itemValue) => {
          setLogType(itemValue);
          setValue('log_type', itemValue); // Update form state
        }}
      >
        <Picker.Item label="Production" value="ProductionLogEntry" />
        <Picker.Item label="Safety" value="SafetyLogEntry" />
        <Picker.Item label="Operations" value="OperationsLogEntry" />
        <Picker.Item label="Personnel" value="PersonnelLogEntry" />
        <Picker.Item label="Regulatory" value="RegulatoryLogEntry" />
      </Picker>

      <Text>Description</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Description"
            style={styles.forminput}
          />
        )}
        name="description"
      />

      {/* Conditional Fields Based on Log Type */}
      {logType === 'ProductionLogEntry' && (
        <>
          <Text>Daily Tonnage</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Daily Tonnage"
                style={styles.forminput}
              />
            )}
            name="daily_tonnage"
          />

          <Text>Shift Wise Production</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Shift Wise Production"
                style={styles.forminput}
              />
            )}
            name="shift_wise_production"
          />
        </>
      )}

      {logType === 'SafetyLogEntry' && (
        <>
          <Text>Incident Type</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Incident Type"
                style={styles.forminput}
              />
            )}
            name="incident_type"
          />

          <Text>Corrective Actions</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Corrective Actions"
                style={styles.forminput}
              />
            )}
            name="corrective_actions"
          />
        </>
      )}

      {logType === 'OperationsLogEntry' && (
        <>
          <Text>Operation Type</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Operation Type"
                style={styles.forminput}
              />
            )}
            name="operation_type"
          />
        </>
      )}

      {logType === 'PersonnelLogEntry' && (
        <>
          <Text>Personnel Action</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Personnel Action"
                style={styles.forminput}
              />
            )}
            name="personnel_action"
          />
        </>
      )}

      {logType === 'RegulatoryLogEntry' && (
        <>
          <Text>Inspection Type</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Inspection Type"
                style={styles.forminput}
              />
            )}
            name="inspection_type"
          />

          <Text>Findings</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Findings"
                style={styles.forminput}
              />
            )}
            name="findings"
          />
        </>
      )}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  forminput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LogEntryForm;
