import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    flatList: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    postView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#A3A3A3',
        borderRadius: 10,
        marginTop: 20,
    },
    coverPhoto: {
        width: '100%',
        height: 200,
        backgroundColor: 'rgba(0,0,0,0.06)',
        marginTop: 20,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginLeft:  5,
        marginRight:  5,
        resizeMode:'stretch',
    },
    twoButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});


export { styles };