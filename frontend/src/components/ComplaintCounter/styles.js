import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '25%',
        height: '100%',
        marginLeft: "2.5%",
        marginRight: "2.5%",
    },
    coloredContainer: {
        padding: "5%",
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "85%",
        borderRadius: 10
    },
    image: {
        marginTop: "10%",
        width: 45,
        height: 45,
    },
    complaintCountContainer: {
        marginTop: "5%",
        color: "white",
        fontSize: 20
    },
    titleContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        marginTop: "5%",
        color: "#D67300",
        fontSize: 12
    }
});

export { styles };
