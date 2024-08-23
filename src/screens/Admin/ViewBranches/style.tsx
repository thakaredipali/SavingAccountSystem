import { StyleSheet } from "react-native";

export const viewBranchstyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    listContainer: {
        paddingBottom: 16,
    },
    branchItem: {
        backgroundColor: '#ffffff',
        padding: 16,
        marginVertical: 8,
        marginHorizontal:8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        width: 100, // Fixed width for alignment
    },
    value: {
        fontSize: 16,
        color: '#555',
        flexShrink: 1, // Ensures text wraps if it’s too long
    },
});
