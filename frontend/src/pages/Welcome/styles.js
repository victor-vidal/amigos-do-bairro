import { StyleSheet, Ima} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo:{
        width: '45%',
        height:'40%',
        alignSelf: 'center',
        marginTop: '2%'
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: 430,
        paddingTop: '1%',
        paddingStart: '5%',
        paddingEnd: '5%'
    },
    image: {
        flex: 2,
        justifyContent: "center",
        alignItems: 'center'
        
      },
    title: {
        color: '#F47E51',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#1F1F3D',
        fontWeight: 'bold',
        alignSelf: 'center',
        alignItems: 'center'
    },
    button: {
        position: 'relative',
        backgroundColor: '#F47E51',
        borderRadius: 50,
        paddingVertical: 15,
        margin: 6,
        width: '60%',
        alignSelf: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    }
});

export { styles };