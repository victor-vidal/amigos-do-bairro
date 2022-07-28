import { StyleSheet, Ima} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerLogo: {
        flex: 2,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    image: {
        flex: 2,
        justifyContent: "center",
        alignItems: 'center'
      },
    title: {
        color: '#D67300',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
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
        backgroundColor: '#D67300',
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