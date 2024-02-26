import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from "react-native";
import { COLORS, FONT, SIZES } from './theme';
const BigButton = (props) => {
    return (
        <View style = {props.dir ? styles.container : styles.container2}> 
            <TouchableOpacity 
                style = {props.dir ? styles.button : styles.button2}
                onPress = {props.onPress}
            >
                <View style={styles.iconContainer}>
                    <Image
                        style={styles.logo}
                        source={{
                        uri: 'https://educast.library.gatech.edu/wp-content/uploads/2020/10/cropped-logoGearsOnlyRound-1-2.png'}}
                        resizeMode='stretch'
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}> { props.name } </Text>
                    <Image
                        style={styles.arrow}
                        source={require('../assets/arrow.png')}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default BigButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        height: 140,
        justifyContent: 'flex-start',
    },
    container2: {
        flexDirection: 'row',
        width: '100%',
        height: 140,
        justifyContent: 'flex-end',
    },
    button: {
        width: 350,
        height: '100%',
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        borderTopRightRadius: 23,
        borderBottomRightRadius: 23,
    },
    button2: {
        width: 350,
        height: '100%',
        backgroundColor: COLORS.primary,
        flexDirection: 'row-reverse',
        borderTopLeftRadius: 23,
        borderBottomLeftRadius: 23,
    },
    iconContainer: {
        width: 175,
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        width: 70,
        height: 20,
    },
    textContainer: {
        width: 175,
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    text: {
        color: COLORS.white,
        fontSize: SIZES.large,
        fontWeight: "bold",
        margin: 15,
        fontFamily: "Lexend_400Regular"
    },
    logo: {
        width: 130,
        height: 130,
    },
})
