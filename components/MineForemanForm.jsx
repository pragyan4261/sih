import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker'
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
  const { control, handleSubmit, watch, errors, setValue } = useForm({
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
  const [text, setText] = useState('');
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const showStartTimePicker = () => setStartTimePickerVisibility(true);
  const hideStartTimePicker = () => setStartTimePickerVisibility(false);
  const handleStartTimeConfirm = (date) => {
    setStartTime(moment(date).format('HH:mm'));
    setStartTimePickerVisibility(false);
  };

  const showEndTimePicker = () => setEndTimePickerVisibility(true);
  const hideEndTimePicker = () => setEndTimePickerVisibility(false);
  const handleEndTimeConfirm = (date) => {
    setEndTime(moment(date).format('HH:mm'));
    setEndTimePickerVisibility(false);
  };
// Function to handle form submission
const onSubmit = async (data) => {
    try {
        
      // Log the form data or perform API call
      console.log('Form Data:', data);
      console.log("Hello");

      // Example API call
      // const response = await fetch('https://api.example.com/submit', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });
      // const result = await response.json();
      // console.log('API Response:', result);

      // Show success alert
      Alert.alert('Success', 'Form submitted successfully!');
      
      // Reset the form if needed
      reset(); 

    } catch (error) {
      // Handle any errors
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'There was a problem submitting the form.');
    }
  };
  const handleChange = (text) => {
    console.log('Text changed:', text);
    setText(text);
  };

  return (
    <View>
      {/* General Log Entry Fields */}
      <Text style={styles.heading}>Mine Name</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => handleChange(value)}
            value={value}
            placeholder="Mine Name"
            style={styles.forminput}
          />
        )}
        name="mine_name"
      />
      {/* {errors.mine_name && <Text>{errors.mine_name.message}</Text>} */}

      <Text>Location</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => handleChange(value)}
            value={value}
            placeholder="Location"
          />
        )}
        name="location"
      />
      {/* {errors.location && <Text>{errors.location.message}</Text>} */}

      <Text>Shift Start Time</Text>
      <Controller
        control={control}
        name="start_time"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Button title="Select Start Time" onPress={showStartTimePicker} />
            <Text>Start Time: {startTime}</Text>
            <DateTimePickerModal
              isVisible={isStartTimePickerVisible}
              mode="time"
              onConfirm={(date) => {
                handleStartTimeConfirm(date);
                onChange(moment(date).format('HH:mm')); // Update form state
              }}
              onCancel={hideStartTimePicker}
            />
          </View>
        )}
      />
      {/* {errors.start_time && <Text>{errors.start_time.message}</Text>} */}

      <Text>Shift End Time</Text>
      <Controller
        control={control}
        name="end_time"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Button title="Select End Time" onPress={showEndTimePicker} />
            <Text>End Time: {endTime}</Text>
            <DateTimePickerModal
              isVisible={isEndTimePickerVisible}
              mode="time"
              onConfirm={(date) => {
                handleEndTimeConfirm(date);
                onChange(moment(date).format('HH:mm')); // Update form state
              }}
              onCancel={hideEndTimePicker}
            />
          </View>
        )}
      />
      {/* {errors.end_time && <Text>{errors.end_time.message}</Text>} */}

      <Text>Employee Name</Text>
      <Controller
        control={control}
        render={({onBlur, value }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => handleChange(value)}
            value={value}
            placeholder="Employee Name"
          />
        )}
        name="employee_name"
      />
      {/* {errors.employee_name && <Text>{errors.employee_name.message}</Text>} */}

      <Text>Log Type</Text>
      <Picker
        selectedValue={logType}
        onValueChange={(itemValue) => {
            handleChange(itemValue);  // Update react-hook-form state
            setLogType(itemValue);  // Update local state if needed
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
            onChangeText={(value) => handleChange(value)}
            value={value}
            placeholder="Description"
          />
        )}
        name="description"
      />
      {/* {errors.description && <Text>{errors.description.message}</Text>} */}

      {/* Conditional Fields Based on Log Type */}
      {logType === 'ProductionLogEntry' && (
        <>
          <Text>Daily Tonnage</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(value) => handleChange(value)}
                value={value}
                placeholder="Daily Tonnage"
              />
            )}
            name="daily_tonnage"
          />
          {/* {errors.daily_tonnage && <Text>{errors.daily_tonnage.message}</Text>} */}

          <Text>Shift Wise Production</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(value) => handleChange(value)}
                value={value}
                placeholder="Shift Wise Production"
              />
            )}
            name="shift_wise_production"
          />
          {/* {errors.shift_wise_production && (
            <Text>{errors.shift_wise_production.message}</Text>
          )} */}
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
                onChangeText={(value) => handleChange(value)}
                value={value}
                placeholder="Incident Type"
              />
            )}
            name="incident_type"
          />
          {/* {errors.incident_type && <Text>{errors.incident_type.message}</Text>} */}

          <Text>Corrective Actions</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(value) => handleChange(value)}
                value={value}
                placeholder="Corrective Actions"
              />
            )}
            name="corrective_actions"
          />
          {/* {errors.corrective_actions && (
            <Text>{errors.corrective_actions.message}</Text>
          )} */}
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
                onChangeText={(value) => handleChange(value)}
                value={value}
                placeholder="Operation Type"
              />
            )}
            name="operation_type"
          />
          {/* {errors.operation_type && (
            <Text>{errors.operation_type.message}</Text>
          )} */}
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
                onChangeText={(value) => handleChange(value)}
                value={value}
                placeholder="Personnel Action"
              />
            )}
            name="personnel_action"
          />
          {/* {errors.personnel_action && (
            <Text>{errors.personnel_action.message}</Text>
          )} */}
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
                onChangeText={(value) => handleChange(value)}
                value={value}
                placeholder="Inspection Type"
              />
            )}
            name="inspection_type"
          />
          {/* {errors.inspection_type && (
            <Text>{errors.inspection_type.message}</Text>
          )} */}

          <Text>Findings</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(value) => handleChange(value)}
                value={value}
                placeholder="Findings"
              />
            )}
            name="findings"
          />
          {/* {errors.findings && <Text>{errors.findings.message}</Text>} */}
        </>
      )}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
    },
    forminput: {
        borderWidth: 2,
        width: 300,
        marginBottom: 10
    },
    
})

export default LogEntryForm;
