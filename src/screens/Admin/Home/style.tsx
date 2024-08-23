import { StyleSheet } from "react-native";

export const homeScreenstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    logoutButton: {
        position: 'absolute',
        top:10,
        right: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
      },
      logoutText: {
        color: '#0080ff',
        fontSize: 20,
        fontWeight: 'bold',
      },
    buttonContainer: {
        flexDirection: 'row', // Aligns items in a row
        paddingTop: 10,
        paddingHorizontal:20,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly', // Adjusts space between buttons
        alignItems: 'center',
        marginTop: 50,
      },
    searchContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
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
        paddingBottom: 10,
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    userName: {
        flex: 1,
        fontSize: 18,
        paddingLeft: 20,
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
        width: '48%',
        height: 50,
        alignItems: 'center',
        backgroundColor: '#5800EB',
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom:10,   
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    noDataText:{
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }  
});