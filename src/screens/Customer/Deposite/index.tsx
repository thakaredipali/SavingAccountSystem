import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { putApi } from '../../../axiosconfig/apihelper';
import { AccountData, RootState } from '../Deposite/type';
import { depositeFormstyles } from './style';
import { getTransactionHistory } from '../../../redux/action/transactionAction';
import { getAccountDetails } from '../../../redux/action/action';
import { TransactionHistory, TransactionRootState } from '../Transaction/type';



// Validation schema for Formik
const depositValidationSchema = Yup.object().shape({
  acc_no: Yup.number()
    .required('Account number is required')
    .positive('Account number must be positive')
    .integer('Account number must be an integer'),
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be positive')
    
});



const DepositForm = () => {
  // Selector to get account details from Redux state
  const accountDetails = useSelector((state: RootState) => state.AccountDetailsReducer);
  const transactionDetails = useSelector((state: TransactionRootState) => state.TransactionReducer);
  const [balance, setBalance] = useState(0);
  const dispatch = useDispatch();

  // Assuming you want to get the balance of the first account
  useEffect(() => {
    if (accountDetails && accountDetails.res && accountDetails.res.length > 0) {
      setBalance(accountDetails.res[0].balance);
    }
  }, [accountDetails]);

  // Handle form submission
  const handleDeposit = async (values: { acc_no: string; amount: string }) => {
    try {
      const data = {
        ...values,
        acc_no: Number(values.acc_no),
        amount: Number(values.amount)
      }
      const response = await putApi('account/deposit', data);    
      const createTransaction = (): TransactionHistory => {
         return {
          id: generateTransactionId(),
          type: 'depo',
          amount: values.amount,
        };
      }

      const newTransaction = createTransaction();


 
  dispatch(getTransactionHistory([newTransaction]))



    
      if (response.data) {
        Alert.alert('Money deposited successfully!');
        const accountData: AccountData = response.data;
        setBalance(accountData.balance);
        values.acc_no = '';
        values.amount = '';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const generateTransactionId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let transactionId = '';
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      transactionId += characters[randomIndex];
    }
    return transactionId;
  };
  

  return (
    <View style={depositeFormstyles.container}>
      {/* Heading */}
      <Text style={depositeFormstyles.heading}>Deposit Money</Text>

      {/* Form card */}
      <View style={depositeFormstyles.formCard}>
        {/* Display balance inside the card */}
        <View style={depositeFormstyles.balanceContainer}>
          <Text style={depositeFormstyles.balanceLabel}>Balance:</Text>
          <Text style={depositeFormstyles.balanceAmount}>₹ {balance}</Text>
        </View>

        {/* Deposit form */}
        <Formik
          initialValues={{ acc_no: '', amount: '' }}
          validationSchema={depositValidationSchema}
          onSubmit={handleDeposit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={depositeFormstyles.formContainer}>
              <Text style={depositeFormstyles.label}>Account Number</Text>
              <TextInput
                style={depositeFormstyles.input}
                placeholder="Account Number"
                keyboardType="numeric"
                onChangeText={handleChange('acc_no')}
                onBlur={handleBlur('acc_no')}
                value={values.acc_no.toString()}
              />
              {touched.acc_no && errors.acc_no ? (
                <Text style={depositeFormstyles.errorText}>{errors.acc_no}</Text>
              ) : null}
              <Text style={depositeFormstyles.label}>Amount</Text>
              <TextInput
                style={depositeFormstyles.input}
                placeholder="Amount"
                keyboardType="numeric"
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                value={values.amount.toString()}
              />
              {touched.amount && errors.amount ? (
                <Text style={depositeFormstyles.errorText}>{errors.amount}</Text>
              ) : null}

              <TouchableOpacity style={depositeFormstyles.button} onPress={handleSubmit as any}>
                <Text style={depositeFormstyles.buttonText}>Deposit</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};


export default DepositForm;
