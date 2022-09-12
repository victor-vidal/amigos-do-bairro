import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    menuButton: {
        zIndex: 2
    },
    menuIcon: {
        position: "absolute",
        marginTop: "5%",
        marginLeft: "5%",
        width: 25,
        height: 25,
    },
    menuHeader: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "30%"
    },
    menuHeaderTextContainer: {
        marginTop: "2%",
    },
    menuHeaderText: {
        fontWeight: "900",
        color: "#D67300",
        fontSize: 19,
    },
    userAvatar: {
        marginTop: "10%",
        borderRadius: 50,
        width: 80,
        height: 80,
        borderWidth: 3,
        borderColor: "green"
    },
    menuHeaderLinksContainer: {
        marginTop: "5%",
        marginLeft: "5%",
    },
    menuHeaderLinkContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "5%",
    },
    menuHeaderLinkText: {
        fontWeight: "400",
        color: "#D67300",
        fontSize: 19,
    },
    menuHeaderLinkIcon: {
        marginRight: "5%",
        width: 19,
        height: 19,
    }
});

export { styles };
