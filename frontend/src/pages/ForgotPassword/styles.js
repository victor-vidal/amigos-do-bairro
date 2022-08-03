import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#FFF'
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#FF4842',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingTop: '1%',
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    logo:{
        width: '16%',
        height:'14%',
        alignSelf: 'center',
        marginTop: '2%'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
        color: '#FFF'
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 50,
        paddingVertical: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14
    },
    buttonText: {
        fontSize: 18,
        color: '#F47E51',
        fontWeight: 'bold'
    },
    buttonRegister: {
        margin: 14,
        alignSelf: 'center'
    },
    buttonRegisterText: {
        color: '#fff',
        fontWeight: 'bold'
    }
});

export { styles };