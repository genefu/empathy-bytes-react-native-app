import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { COLORS, FONT } from '../../constants/theme';

function AboutUs() {
    return (
        <View style={styles.container}> 
            <Text style={styles.title}>
                About Us
            </Text>
            <Image
                    style={styles.image}
                    source={require('../../assets/teampic.jpeg')}
            />
            <Text style={styles.text}>
            Empathy Bytes VIP explores how multimedia and emerging technologies can enhance empathy and understanding as we create digital scholarship and improve access to resources. 
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary
    },
    imagecontainer: {
        alignItems: "center",
        justifyContent: "center",
        //padding: 50,
    },
    text: {
        color: "white",
        // position: "absolute",
        textAlign: "center",
        margin: 20,
        fontFamily: "Lexend_400Regular"
    },
    image: {
        width: 410,
        height: 200,
        marginBottom: 10,
        borderRadius: 50,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "white",
        margin: 20,
        fontFamily: "Lexend_400Regular"
    },

})

export default AboutUs;