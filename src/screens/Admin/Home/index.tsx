import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, Image, TextInput, ListRenderItem } from 'react-native';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerList } from '../../../redux/action/action';
import LogoutModal from '../../../components/logOutModel';
import { getApi } from '../../../axiosconfig/apihelper';
import { RootStackParamList } from '../../../../App';
import { RootState, UserListData } from './type';
import { CommonActions } from '@react-navigation/native';
import { clearAllData } from '../../../utils/storage';
import { homeScreenstyles } from './style';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;


const HomeScreen = ({ navigation }: HomeProps) => {

    const dispatch = useDispatch();
    const userdata = useSelector((state: RootState) => state.CustomerReducer);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [filteredData, setFilteredData] = useState<UserListData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getApi('admin/user_list', {});
                dispatch(getCustomerList(response.data));
            } catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        fetchData();
    }, []);



    useEffect(() => {
        if (userdata && userdata.res) {
            // Filter the data based on the search query
            const filtered = userdata.res
                .filter(item =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(item => ({
                    res: {
                        address: item.address,
                        email: item.email,
                        mobile: item.mobile,
                        name: item.name,
                        role: item.role,
                        user_id: item.user_id,
                        accounts: item.accounts
                    },
                }));
            setFilteredData(filtered);
        }
    }, [searchQuery, userdata]);

    const renderItem: ListRenderItem<UserListData> = ({ item }) => (
        <View style={homeScreenstyles.userItem}>
            <Image
                source={require('../../../../src/assets/icon/person_icon.jpeg')}
                style={homeScreenstyles.profileImage}
            />
            <Text style={homeScreenstyles.userName}>{item.res.name}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('UserInfo', { userData: item })}>
                <Image
                    source={require('../../../../src/assets/icon/right_arrow.png')}
                    style={homeScreenstyles.arrowIcon}
                />
            </TouchableOpacity>
        </View>
    );

    const handleLogout = () => {
          setModalVisible(false);
          setTimeout(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
              })
            );
          }, 500); 
          clearAllData()

      };
    const handleLogoutPress = () => {
       
        setModalVisible(true);
    
      };
    
      const handleCloseModal = () => {
        setModalVisible(false);
      };
    return (
        <SafeAreaView style={homeScreenstyles.container}>
             <TouchableOpacity style={homeScreenstyles.logoutButton} onPress={handleLogoutPress}>
        <Text style={homeScreenstyles.logoutText}>Logout</Text>
        <LogoutModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onConfirm={handleLogout}
      />
      </TouchableOpacity>
            <View style={homeScreenstyles.buttonContainer}>

                <TouchableOpacity
                    style={homeScreenstyles.button}
                    onPress={() => navigation.navigate('AccountForm')}
                >
                    <Text style={homeScreenstyles.buttonText}>Create Customer</Text>
                </TouchableOpacity>
                <TouchableOpacity
        style={homeScreenstyles.button}  
        onPress={() => navigation.navigate('ViewBranches')}
        >
        <Text style={homeScreenstyles.buttonText}>View Branches</Text>
      </TouchableOpacity>
            </View>
            <View style={homeScreenstyles.searchContainer}>
                <TextInput
                    style={homeScreenstyles.searchInput}
                    placeholder="Search by name"
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                />
            </View>

            {filteredData.length > 0 ? (
                <FlatList
                    data={filteredData}
                    keyExtractor={(item) => item.res.user_id.toString()} // Convert to string here for the key
                    renderItem={renderItem}
                    contentContainerStyle={homeScreenstyles.list}
                    style={homeScreenstyles.listContainer}
                />
            ) : (
                <View>
                    <Text style={homeScreenstyles.noDataText}>No data found</Text>
                </View>
            )}
        </SafeAreaView>
    );
};



export default HomeScreen;
