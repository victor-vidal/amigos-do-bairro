import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    menu:{
        marginBottom:5,
    },
    containerHeader: {
        width: '90%',
        marginTop: '20%',
    },
    image:{
        width: '100%',
        height:'100%',
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center',
    },
    flatList: {
        flex: 1,
        width:'90%',
        marginBottom: '10%'
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
    postView:{
        width:'100%',
        alignItems:"flex-start",
        marginTop:40,
        borderWidth: 0,
        borderColor: 'grey',
        borderRadius:10,
        paddingStart: 20,
        backgroundColor: '#E6E6E6',
        shadowColor: 'red'
    },
    coverPhoto: {
        width: '90%',
        height: 200,
        backgroundColor:'rgba(0,0,0,0.06)',
        marginTop:20,
        borderRadius:10,
        resizeMode: 'cover',
        borderWidth: 2,
        borderColor: 'grey'
    },
    twoButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    resolvido: {
        paddingTop: 10,
        fontSize: 18,
        color: '#2CDA00',
        fontWeight: 'bold'
    },
    nResolvido: {
        fontSize: 18,
        color: '#FF0000',
        fontWeight: 'bold',
        paddingTop: 10
    }
    
});


export { styles };