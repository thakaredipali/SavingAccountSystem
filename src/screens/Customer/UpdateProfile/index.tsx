import React from 'react';
import { View, Text, TextInput,TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { putApi } from '../../../axiosconfig/apihelper';
import { getData } from '../../../utils/storage';
import { UserListData } from '../../Admin/Home/type';
import { UserData } from '../../Admin/CreateUser/type';
import { RouteProp, useRoute } from '@react-navigation/native';
import { updateProfileStyles } from './style';

type RootStackParamList = {
  UpdateProfile: { userData: UserData };
};

type UpdateProfileScreenRouteProp = RouteProp<RootStackParamList, 'UpdateProfile'>;

const UpdateProfile = () => {

  const route = useRoute<UpdateProfileScreenRouteProp>();
  const { userData } = route.params;
  // Validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    mobile: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
  });

  // Handle form submission
  const handleSubmit = async (values: any) => {
    try {
      const password = await getData('loginData');
        const data = {
          ...values,
          password: password
        }
        const response = await putApi('/update_user', data);
        if (response.data) {
        Alert.alert('Profile Updated', 'Your profile has been updated successfully!');
        }
      } catch (error) {
        console.error('Error:', error);
      }
   
  };

  return (
    <View style={updateProfileStyles.container}>
      <View style={updateProfileStyles.card}>
        <Text style={updateProfileStyles.heading}>Update Profile</Text>
        <Formik
          initialValues={{
            name: userData.name,
            address: userData.address,
            mobile: userData.mobile,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Text style={updateProfileStyles.label}>Name</Text>
              <TextInput
                style={updateProfileStyles.input}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {touched.name && errors.name && <Text style={updateProfileStyles.errorText}>{errors.name}</Text>}

              <Text style={updateProfileStyles.label}>Address</Text>
              <TextInput
                style={updateProfileStyles.input}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                value={values.address}
              />
              {touched.address && errors.address && <Text style={updateProfileStyles.errorText}>{errors.address}</Text>}

              <Text style={updateProfileStyles.label}>Mobile</Text>
              <TextInput
                style={updateProfileStyles.input}
                onChangeText={handleChange('mobile')}
                onBlur={handleBlur('mobile')}
                value={values.mobile}
                keyboardType="numeric"
              />
              {touched.mobile && errors.mobile && <Text style={updateProfileStyles.errorText}>{errors.mobile}</Text>}

              <TouchableOpacity style={updateProfileStyles.button} onPress={handleSubmit as any}>
                <Text style={updateProfileStyles.buttonText}>Update Profile</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};



export default UpdateProfile;
