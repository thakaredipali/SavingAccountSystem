import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {  TransactionHistory, TransactionRootState } from './type';
import { transactionHistoryStyles } from './style';



const TransactionHistoryScreen = () => {

    const transactionDetails = useSelector(
        (state: TransactionRootState) => state.TransactionReducer.transactions
      );
      

 
    const renderTransaction = ({ item }: any) => (
      <View style={transactionHistoryStyles.card}>
        <View style={transactionHistoryStyles.row}>
          <Text style={transactionHistoryStyles.label}>Transaction ID:</Text>
          <Text style={transactionHistoryStyles.value}>{item.id}</Text>
        </View>
        <View style={transactionHistoryStyles.row}>
          <Text style={transactionHistoryStyles.label}>Amount:</Text>
          <Text
            style={[
                transactionHistoryStyles.value,
              item.type === 'depo' ? transactionHistoryStyles.deposit : transactionHistoryStyles.withdraw,
            ]}
          >
            {item.type === 'depo' ? `${item.amount} +` : `${item.amount} -`}
          </Text>
        </View>
      </View>
    );
  
    return (
      <FlatList
        data={transactionDetails}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };
  

export default TransactionHistoryScreen;
