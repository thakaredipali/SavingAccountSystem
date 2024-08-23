import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';

import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-simple-toast';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { BranchOption, CreateAccountValues, CreateUserValues, UserData } from './type';
import { getApi, postApi, putApi } from '../../../axiosconfig/apihelper';
import { Branch } from '../ViewBranches/type';
import { createUserStyles } from './styles';

// Validation schema for Create Customer form
const customerValidationSchema = Yup.object().shape({
  name: Yup.string() .required('Name is required')
  .matches(/^[A-Za-z ]+$/, 'Only letters are allowed, without numbers or special characters'),
  mobile: Yup.string().required('Mobile is required').matches(/^[0-9]+$/, 'Mobile number must be digits only'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  address: Yup.string().required('Address is required'),
});

// Validation schema for Create Account form
const accountValidationSchema = Yup.object().shape({
  branch_id: Yup.number().required('Branch ID is required'),
  acc_type: Yup.string().required('Account type is required'),
  balance: Yup.number().required('Balance is required').min(0, 'Balance must be at least 0'),
});

const CreateCustomer = ({ onNext, savedValues }: { onNext: (values: CreateUserValues) => void; savedValues: CreateUserValues }) => (
  <ScrollView contentContainerStyle={createUserStyles.container}>
    <Text style={createUserStyles.heading}>Create Customer</Text>
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
          <Text style={createUserStyles.label}>Name</Text>
          <TextInput
            style={createUserStyles.input}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            placeholder="Name"
          />
          {touched.name && errors.name && <Text style={createUserStyles.errorText}>{String( errors.name)}</Text>}
          
          <Text style={createUserStyles.label}>Mobile</Text>
          <TextInput
            style={createUserStyles.input}
            onChangeText={handleChange('mobile')}
            onBlur={handleBlur('mobile')}
            value={values.mobile}
            placeholder="Mobile"
            keyboardType="phone-pad"
          />
          {touched.mobile && errors.mobile && <Text style={createUserStyles.errorText}>{String (errors.mobile)}</Text>}
          
          <Text style={createUserStyles.label}>Email</Text>
          <TextInput
            style={createUserStyles.input}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder="Email"
            keyboardType="email-address"
          />
          {touched.email && errors.email && <Text style={createUserStyles.errorText}>{String(errors.email)}</Text>}
          
          <Text style={createUserStyles.label}>Address</Text>
          <TextInput
            style={createUserStyles.input}
            onChangeText={handleChange('address')}
            onBlur={handleBlur('address')}
            value={values.address}
            placeholder="Address"
          />
          {touched.address && errors.address && <Text style={createUserStyles.errorText}>{String(errors.address)}</Text>}

          <TouchableOpacity style={createUserStyles.button} onPress={handleSubmit as any}>
            <Text style={createUserStyles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  </ScrollView>
);






export const CreateAccount = ({ onBack, onSubmit }: { onBack: () => void; onSubmit: (values: CreateAccountValues) => void; savedValues?: CreateAccountValues }) => {
  



  const [branches, setBranches] = useState<BranchOption[]>([]);

  const accountTypes = [
    { label: 'Savings', value: 'Savings' },
    { label: 'Current', value: 'Current' },
  ];

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await getApi('admin/branch_list', {});
            const branchesData: BranchOption[] = response.data.map((item: any) => ({
            label: item.branch_id, 
            value: item.branch_id, 
          }));
          setBranches(branchesData)
        } catch (err) {
            console.log('Error fetching data:', err);
        }
    };
    fetchData();
}, []);


  
  return (
  <ScrollView contentContainerStyle={createUserStyles.container}>
        <Text style={createUserStyles.heading}>Create Account</Text>
    <Formik
         initialValues={{
          branch_id: '',
          acc_type: '',
          balance: '',
        }}
        validationSchema={accountValidationSchema}
        onSubmit={(values) => {
          onSubmit({
            ...values,
            branch_id: Number(values.branch_id),
            balance: Number(values.balance),
          });
        }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched , setFieldValue}) => (
        <View>
         <Text style={createUserStyles.label}>Branch ID</Text>
          <Dropdown
              style={createUserStyles.input}
              data={branches}
              labelField="label"
              valueField="value"
              placeholder="Select Branch ID"
              value={values.acc_type}
              onChange={(item) => {
                setFieldValue('branch_id', item.value);
              }}
            />
          {touched.branch_id && errors.branch_id && <Text style={createUserStyles.errorText}>{String(errors.branch_id)}</Text>}
           
          <Text style={createUserStyles.label}>Select Account Type</Text>
          <Dropdown
              style={createUserStyles.input}
              data={accountTypes}
              labelField="label"
              valueField="value"
              placeholder="Select Account Type"
              value={values.acc_type}
              onChange={(item) => {
                setFieldValue('acc_type', item.value);
              }}
            />
            {touched.acc_type && errors.acc_type && <Text style={createUserStyles.errorText}>{String(errors.acc_type)}</Text>}
           
          <Text style={createUserStyles.label}>Add Balance</Text>
          <TextInput
            style={createUserStyles.input}
            onChangeText={handleChange('balance')}
            onBlur={handleBlur('balance')}
            value={values.balance}
            placeholder="Balance"
            keyboardType="numeric"
          />
          {touched.balance && errors.balance && <Text style={createUserStyles.errorText}>{String (errors.balance)}</Text>}

          <TouchableOpacity style={createUserStyles.button} onPress={handleSubmit as any}>
            <Text style={createUserStyles.buttonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[createUserStyles.button, createUserStyles.backButton]} onPress={onBack}>
            <Text style={createUserStyles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  </ScrollView>
);
}


const AccountForm = () => {
  const navigation = useNavigation();
  const [showCustomerForm, setShowCustomerForm] = useState(true);
  const [savedValues, setSavedValues] = useState<CreateUserValues | CreateAccountValues>();
  const [submitted, setSubmitted] = useState(false);
  const [userId, setUserId] = useState<number>();
  const [isNext, setIsNext] = useState(false);


  const handleNext = async (values: CreateUserValues) => {
    try {
      // Post data to API
      const data = {
        ...values,
        role: 'Customer',
        password: 'Josh@123',
      };
      if(!isNext){
      const response = await postApi('signup', data);
      Toast.show('Customer created successfully', Toast.SHORT);
      setIsNext(true)
      const user: UserData = response.data
      setUserId(user.user_id)
      // Save form values and switch to CreateAccount form
      setSavedValues(values);
      }else{
        const updateData = {
          ...values,
          user_id: userId,
          role: 'Customer',
          password: 'Josh@123',
        };
        setSavedValues(values);
        const response = await putApi('admin/update_user', updateData);


      }
      setShowCustomerForm(false);
      setSubmitted(true);
      
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };


  const handleSubmitButton = async (values: CreateAccountValues) => {
    try {
      // Post data to API
      const data = {
        ...values,
        user_id: userId,
        branch_id: Number(values.branch_id),
        balance: Number(values.balance),
      };
      const response = await postApi('account/create', data);
      Toast.show('Acccount created successfully', Toast.SHORT);
      setIsNext(true)
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }], 
        })
      );
      
      // Save form values and switch to CreateAccount form
      setSavedValues(values);
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
        <CreateCustomer onNext={handleNext} savedValues={savedValues as CreateUserValues} />
      ) : (
        <CreateAccount onBack={handleBack} onSubmit={handleSubmitButton} savedValues={savedValues as CreateAccountValues} />
      )}
    </View>
  );
};



export default AccountForm;
