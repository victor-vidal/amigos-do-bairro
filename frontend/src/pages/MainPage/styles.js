import { StyleSheet } from "react-native";
import { AuthContext } from "../../context/AuthContext";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f'
    },
    containerHeader: {
        width: '90%',
        marginTop: '40%',
        paddingEnd: '30%'
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF'
    },
    containerForm: {
        flex: 1,
        width: '90%',
        padding: 10,
        marginTop: '10%'
    },
    title: {
        color: '#F47E51',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12
    },
    titleWelcome:{
        color: '#F47E51',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingEnd: '30%'
    },
    text:{
        color: '#F47E51',
        fontSize: 18
    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
    button: {
        flex: 1,
        backgroundColor: '#38A69D',
        borderRadius: 4,
        paddingVertical: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14,
        marginHorizontal: 5
    },
    buttonMenu:{
        flex: 1,
        backgroundColor: '#38A69D',
        borderRadius: 4,
        paddingVertical: 8,
        width: '100%',
        height: '55%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 14,
        marginHorizontal: 5
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
        color: '#A1A1A1',
    },
    image:{
        width: '100%',
        height:'100%',
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center',
    }
});

export { styles };