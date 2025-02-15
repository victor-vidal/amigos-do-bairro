import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F47E51'
    },
    message: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#F47E51',
        alignSelf: 'center'
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: '65%',
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        color:'#F47E51',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 1
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 15,
        fontSize: 16
    },
    image: {
        flex: 2,
        justifyContent: "center"
    },
    logo:{
        width: '16%',
        height:'14%',
        alignSelf: 'center',
        marginTop: '2%'
    },
    button: {
        backgroundColor: '#F47E51',
        borderRadius: 50,
        paddingVertical: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    },
    buttonRegister: {
        margin: 14,
        alignSelf: 'center'
    },
    buttonRegisterText: {
        color: '#1F1F3D'
    }
});

export { styles };