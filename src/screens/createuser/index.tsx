import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { postApi } from '../../axiosconfig/apihelper';


// Validation schema for Create Customer form
const customerValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  mobile: Yup.string().required('Mobile is required').matches(/^[0-9]+$/, 'Mobile number must be digits only'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  address: Yup.string().required('Address is required'),
});

// Validation schema for Create Account form
const accountValidationSchema = Yup.object().shape({
  user_id: Yup.number().required('User ID is required'),
  branch_id: Yup.number().required('Branch ID is required'),
  acc_type: Yup.string().required('Account type is required'),
  balance: Yup.number().required('Balance is required').min(0, 'Balance must be at least 0'),
});

const CreateCustomer = ({ onNext, savedValues }: { onNext: (values: any) => void; savedValues: any }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <Formik
      initialValues={{
        name: savedValues?.name || '',
        mobile: savedValues?.mobile || '',
        email: savedValues?.email || '',
        address: savedValues?.address || '',
      }}
      validationSchema={customerValidationSchema}
      onSubmit={(values) => {
        const valuesWithHiddenFields = {
          ...values,
          role: 'Customer',
          password: 'Josh@123',
        };
        onNext(valuesWithHiddenFields);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder="Name"
          />
          {touched.name && errors.name && <Text style={styles.errorText}>{typeof errors.name}</Text>}

          <TextInput
            style={styles.input}
            onChangeText={handleChange('mobile')}
            onBlur={handleBlur('mobile')}
            value={values.mobile}
            placeholder="Mobile"
            keyboardType="phone-pad"
          />
          {touched.mobile && errors.mobile && <Text style={styles.errorText}>{typeof errors.mobile}</Text>}

          <TextInput
            style={styles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="Email"
            keyboardType="email-address"
          />
          {touched.email && errors.email && <Text style={styles.errorText}>{typeof errors.email}</Text>}

          <TextInput
            style={styles.input}
            onChangeText={handleChange('address')}
            onBlur={handleBlur('address')}
            value={values.address}
            placeholder="Address"
          />
          {touched.address && errors.address && <Text style={styles.errorText}>{typeof errors.address}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSubmit as any}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  </ScrollView>
);

const CreateAccount = ({ onBack, savedValues }: { onBack: () => void; savedValues: any }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <Formik
      initialValues={{
        user_id: savedValues?.user_id || '',
        branch_id: savedValues?.branch_id || '',
        acc_type: savedValues?.acc_type || '',
        balance: savedValues?.balance || '',
      }}
      validationSchema={accountValidationSchema}
      onSubmit={(values) => {
        console.log('Account Created:', values);
        // Handle account creation logic here
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('user_id')}
            onBlur={handleBlur('user_id')}
            value={values.user_id}
            placeholder="User ID"
            keyboardType="numeric"
          />
          {touched.user_id && errors.user_id && <Text style={styles.errorText}>{typeof errors.user_id}</Text>}

          <TextInput
            style={styles.input}
            onChangeText={handleChange('branch_id')}
            onBlur={handleBlur('branch_id')}
            value={values.branch_id}
            placeholder="Branch ID"
            keyboardType="numeric"
          />
          {touched.branch_id && errors.branch_id && <Text style={styles.errorText}>{typeof errors.branch_id === 'string'? errors.branch_id:''}</Text>}

          <TextInput
            style={styles.input}
            onChangeText={handleChange('acc_type')}
            onBlur={handleBlur('acc_type')}
            value={values.acc_type}
            placeholder="Account Type"
          />
          {touched.acc_type && errors.acc_type && <Text style={styles.errorText}>{typeof errors.acc_type === 'string'? errors.acc_type:''}</Text>}

          <TextInput
            style={styles.input}
            onChangeText={handleChange('balance')}
            onBlur={handleBlur('balance')}
            value={values.balance}
            placeholder="Balance"
            keyboardType="numeric"
          />
          {touched.balance && errors.balance && <Text style={styles.errorText}>{typeof errors.balance === 'string' ? errors.balance : ''}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleSubmit as any}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={onBack}>
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  </ScrollView>
);

const MainForm = () => {
  const [showCustomerForm, setShowCustomerForm] = useState(true);
  const [savedValues, setSavedValues] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isNext, setIsNext] = useState(false);

  const handleNext = async (values: any) => {
    try {
      // Post data to API
      const data = {
        ...values,
        role: 'Customer',
        password: 'Josh@123',
      };
      if(!isNext){
      const response = await postApi('signup', data);
      console.warn('Signup successful:', response.data);
      setIsNext(true)
      
      // Save form values and switch to CreateAccount form
      setSavedValues(values);
      }
      setShowCustomerForm(false);
      setSubmitted(true);
      
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const handleBack = () => {
    setShowCustomerForm(true);
    if (submitted) {
      setSavedValues((prev: any) => ({ ...prev, password: '' }));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {showCustomerForm ? (
        <CreateCustomer onNext={handleNext} savedValues={savedValues} />
      ) : (
        <CreateAccount onBack={handleBack} savedValues={savedValues} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    marginTop: 30,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    height: 50,
    padding: 12,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#5800EB',
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  backButton: {
    backgroundColor: '#ccc',
    marginTop: 10,
  },
});

export default MainForm;
