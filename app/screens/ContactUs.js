import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { COLORS, FONT } from '../../constants/theme';

function ContactUs({ navigation, route }) {
    return (
        <View style={styles.container}> 
            <Text style={styles.title}>
                Contact Us
            </Text>
            <Image
                    style={styles.logo}
                    source={{
                    uri: 'https://educast.library.gatech.edu/wp-content/uploads/2020/10/cropped-logoGearsOnlyRound-1-2.png'}}
            />
            <Text style={styles.text}>
            Contact our VIP Coordinator at alison.valk@library.gatech.edu for more information and additional team leader contacts.
            </Text>
            <TouchableOpacity style={styles.goButton} onPress={() => navigation.navigate('Home')} >
                    <Text style={styles.goButtonText}>
                        Go Back
                    </Text>
            </TouchableOpacity>
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
    logo: {
        width: 80,
        height: 80,
        padding: 80,
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 100
    },
    text: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        margin: 20,
        fontWeight: "bold",
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
    goButton: {
        borderRadius: 40,
        height: 50,
        width: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#B3A369",
        fontFamily: "Lexend_400Regular"
    },
    goButtonText: {
        color: COLORS.secondary,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15,
    },
})

export default ContactUs;