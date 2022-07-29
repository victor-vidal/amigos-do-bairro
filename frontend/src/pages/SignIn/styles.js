import { StyleSheet } from "react-native";
import { ImageBackground } from '../SignIn';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F47E51'
        
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '2%',
        paddingStart: '5%',
        alignItems: 'center'
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#F47E51'
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: '70%',
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    title: {
        color:'#F47E51',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
    image: {
        flex: 2,
        justifyContent: "center"
    },
    button: {
        backgroundColor: '#F47E51',
        borderRadius: 4,
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
        color: '#1F1F3D',
    }
});

export { styles };