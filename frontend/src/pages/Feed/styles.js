import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    menu:{
        marginBottom:5,
    },
    containerHeader: {
        width: '90%',
        marginTop: '90%',
    },
    image:{
        width: '100%',
        height:'100%',
        justifyContent: "center",
        alignItems: 'center',
        alignSelf: 'center',
    },
    flatList: {
        width:'90%',
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
        alignItems:'center',
        marginTop:40,
        borderWidth: 1,
        borderColor: 'red'
    },
    coverPhoto: {
        width: '90%',
        height: 200,
        backgroundColor:'rgba(0,0,0,0.06)',
        marginTop:20,
        borderRadius:10,
        resizeMode: 'cover',
        borderWidth: 1,
        borderColor: 'red'
    },
    twoButton: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    resolvido: {
        fontSize: 18,
        color: '#2CDA00',
        fontWeight: 'bold'
    },
    nResolvido: {
        fontSize: 18,
        color: '#FF0000',
        fontWeight: 'bold'
    },
    
});


export { styles };