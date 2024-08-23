import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootStackParamList } from '../../../../App';
import { postApi, putApi } from '../../../axiosconfig/apihelper';
import Toast from 'react-native-simple-toast';
import { AccountData } from '../Deposite/type';
import { TransactionHistory } from '../Transaction/type';
import { getTransactionHistory } from '../../../redux/action/transactionAction';

// Validation schema for Formik
const withdrawValidationSchema = Yup.object().shape({
  acc_no: Yup.number()
    .required('Account number is required')
    .positive('Account number must be positive')
    .integer('Account number must be an integer'),
  amount: Yup.number()
    .required('Amount is required')
    .positive('Amount must be positive')
    .max(20000, 'Maximum withdrawal limit is ₹20,000'), 
});

interface AcccountDetailsState {
  res: {
    acc_no: number;
    branch_id: number;
    acc_type: string;
    balance: number;
  }[];
}

interface RootState {
  AccountDetailsReducer: AcccountDetailsState;
}

const WithdrawForm = () => {
  const dispatch = useDispatch();
  const accountDetails = useSelector((state: RootState) => state.AccountDetailsReducer);
  const [balance, setBalance] = useState(0);


  useEffect(() => {
    if (accountDetails && accountDetails.res && accountDetails.res.length > 0) {
      setBalance(accountDetails.res[0].balance);
    }
  }, [accountDetails]);

  // Handle form submission
  const handleWithdraw = async (values: { acc_no: string; amount: string }) => {
    try {
      const data = {
        ...values,
        acc_no: Number(values.acc_no),
        amount: Number(values.amount)
      }
      const response = await putApi('account/withdrawal', data);
      const createTransaction = (): TransactionHistory => {
        return {
         id: generateTransactionId(),
         type: 'withdraw',
         amount: values.amount,
       };
     }

     const newTransaction = createTransaction();
     dispatch(getTransactionHistory([newTransaction]))
      
      if (response.data) {
        Alert.alert('Money withdraw successfully!');
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
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Withdraw Money</Text>

      {/* Form card */}
      <View style={styles.formCard}>
        {/* Display balance inside the card */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Balance:</Text>
          <Text style={styles.balanceAmount}>₹ {balance}</Text>
        </View>

        {/* Deposit form */}
        <Formik
          initialValues={{ acc_no: '', amount: '' }}
          validationSchema={withdrawValidationSchema}
          onSubmit={handleWithdraw}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.formContainer}>
             <Text style={styles.label}>Account Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Account Number"
                keyboardType="numeric"
                onChangeText={handleChange('acc_no')}
                onBlur={handleBlur('acc_no')}
                value={values.acc_no.toString()}
              />
              {touched.acc_no && errors.acc_no ? (
                <Text style={styles.errorText}>{errors.acc_no}</Text>
              ) : null}
               <Text style={styles.label}>Amount</Text>
              <TextInput
                style={styles.input}
                placeholder="Amount"
                keyboardType="numeric"
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                value={values.amount.toString()}
              />
              {touched.amount && errors.amount ? (
                <Text style={styles.errorText}>{errors.amount}</Text>
              ) : null}

              <TouchableOpacity style={styles.button} onPress={handleSubmit as any}>
                <Text style={styles.buttonText}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent:'flex-end',
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formContainer: {
    // No additional styling needed here
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#5800EB',
    padding: 15,
    borderRadius: 10,
    height: 50,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default WithdrawForm;
