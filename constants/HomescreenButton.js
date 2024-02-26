//this is only the button for the home screen
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function HomescreenButton(props) {
    return (
        <View style={props.style}>
            <TouchableOpacity style={styles.button} onPress={props.onPress}>
                <Text style={styles.text}>
                    {props.text}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
        backgroundColor: "#004B87",
        height: 50,
        width: 100,
    },
    text: {
        textAlign: "center",
        color: "#FFFFFF",
        fontFamily: "Lexend_400Regular"
    }
})
export default HomescreenButton;