import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { viewBranchstyles } from './style';
import { getApi } from '../../../axiosconfig/apihelper';
import { Branch } from './type';




const ViewBranches = () => {
    const [branches, setBranches] = useState<Branch[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getApi('admin/branch_list', {});
                const branchesData: Branch[] = response.data.map((item: any) => ({
                    branchId: item.branch_id,
                    name: item.name,
                    location: item.location,
                }));
                setBranches(branchesData);
            } catch (err) {
                console.log('Error fetching data:', err);
            }
        };
        fetchData();
       
    }, []);

    const renderBranchItem = ({ item }: { item: Branch }) => (
        <View style={viewBranchstyles.branchItem}>
            <View style={viewBranchstyles.row}>
                <Text style={viewBranchstyles.label}>Branch ID:</Text>
                <Text style={viewBranchstyles.value}>{item.branchId}</Text>
            </View>
            <View style={viewBranchstyles.row}>
                <Text style={viewBranchstyles.label}>Name:</Text>
                <Text style={viewBranchstyles.value}>{item.name}</Text>
            </View>
            <View style={viewBranchstyles.row}>
                <Text style={viewBranchstyles.label}>Location:</Text>
                <Text style={viewBranchstyles.value}>{item.location}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={viewBranchstyles.container}>
            <Text style={viewBranchstyles.heading}>Branches List</Text>
            <FlatList
                data={branches}
                renderItem={renderBranchItem}
                keyExtractor={(item) => item.branchId.toString()}
                contentContainerStyle={viewBranchstyles.listContainer}
            />
        </SafeAreaView>
    );
};



export default ViewBranches;
