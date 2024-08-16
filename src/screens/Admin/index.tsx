import React, { useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView, ListRenderItem, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerList } from '../../redux/action/action';
import { getApi } from '../../axiosconfig/apihelper';
import { RootStackParamList } from '../../../App';
import { UserListData } from './type';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

interface CustomerState {
    res: {
        address: string;
        email: string;
        mobile: string;
        name: string;
        role: string;
        user_id: number;
    }
}

interface RootState {
    CustomerReducer: CustomerState;
    // Add other reducers as needed
}

const HomeScreen = ({ navigation }: HomeProps) => {
    const dispatch = useDispatch();
    const userdata = useSelector((state: RootState) => state.CustomerReducer );


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getApi('admin/user_list', {});
                console.log("API Response:", response.data);
                dispatch(getCustomerList(response.data));
            } catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        fetchData();

        
    }, [dispatch]);
    
   
    const userListData: UserListData[] = Array.isArray(userdata.res)
    ? userdata.res.map(item => ({
        res: {
            address: item.address,
            email: item.email,
            mobile: item.mobile,
            name: item.name,
            role: item.role,
            user_id: item.user_id.toString(),
        }
    }))
    : [];
    const renderItem: ListRenderItem<UserListData> = ({ item }) => (
        <View style={styles.userItem}>
         <Image
            source={require('../../../src/assets/icon/person_icon.jpeg')} 
            style={styles.profileImage}
        />
            <Text style={styles.userName}>{item.res.name}</Text>
            <TouchableOpacity  onPress={() => navigation.navigate('UserInfo', { userData: item })}>
            <Image
            source={require('../../../src/assets/icon/right_arrow.png')} 
            style={styles.arrowIcon}
        />
            </TouchableOpacity>

        
        </View>
    );
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('MainForm')}
                >
                    <Text style={styles.buttonText}>Create Customer</Text>
                </TouchableOpacity>
            </View>
           
            {userListData.length > 0 ? (
                <FlatList
                    data={userListData}
                    keyExtractor={(item) => item.res.user_id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    style={styles.listContainer}
                />
            ) : (
                <ActivityIndicator size="large" color="#5800EB" />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    buttonContainer: {
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    listContainer: {
        flex: 1,
    },
    list: {
        paddingTop: 16,
    },
    userItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom:10,
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    userName: {
        flex: 1,
        fontSize: 18,
        paddingLeft: 20
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    arrowIcon: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginRight: 20,

    },
    button: {
        width: '90%',
        height: 50,
        alignItems: 'center',
        backgroundColor: '#5800EB',
        borderRadius: 10,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default HomeScreen;
