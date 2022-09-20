import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#38A69D'
    },
    containerHeader: {
        marginTop: '24%',
        marginBottom: '8%',
        paddingStart: '5%'
    },
    containerForm: {
        flex: 1,
        width: '100%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
        color:'#54528E',

    },
    input: {
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16
    },
    button: {
        backgroundColor: '#F47E51',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal:8,
        marginHorizontal:'5%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    },
    flatlist: {

    },
    image: {
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: 'flex-start',
        alignSelf: 'center',
    },
    buttonImage: {
        width: '2%',
        height: '8%',
        resizeMode: 'stretch',
    },
    text:{
        color: '#F47E51',
        fontSize: 18,
        marginBottom: '5%',
    },
    titleWelcome:{
        color: '#F47E51',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        paddingEnd: '30%',
        
    },
    stretch: {
        width: '100%',
        height: '50%',
        resizeMode: 'stretch',
      },
      buttonLast: {
        backgroundColor: '#F47E51',
        borderRadius: 4,
        paddingVertical: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:'5%',
    },
});

export { styles };