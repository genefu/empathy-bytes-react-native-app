import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from "react-native";
import { COLORS } from './theme';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { fb_app, fb_storage } from '../firebaseConfig';

export default function ListButton({name, dir, type, onPress, image}) {
    //const imgsrc = (image == '' || typeof image == 'undefined') ? '../assets/teampic.jpeg' : image;

    return (
        // console.log("hi"),
        console.log(name),
        // console.log(image),
        console.log(image),
        <View style = {dir ? styles.left : styles.right}> 
            <TouchableOpacity 
                style = {dir ? styles.leftButton : styles.rightButton}
                onPress = {onPress}>
                <View style={dir ? styles.leftBlue : styles.rightBlue}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={image ? {uri: image} : null}
                            // source={image}
                            // source={require('../assets/teampic.jpeg')} //unable to use imgsrc variable here, dunno why D:
                        />
                    </View>
                    <View style={styles.textcontainer}>
                        <Text numberOfLines={4} style={styles.text}> { name } </Text>
                        {typeof type !== 'undefined' &&
                        <View style={styles.typecontainer}>
                            <Text style={styles.type}> { type } </Text>
                        </View>}
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    left: {
        flexDirection: 'row',
        width: '100%',
        height: 130,
        justifyContent: 'flex-start',
        marginBottom: 8,
    },
    right: {
        flexDirection: 'row',
        width: '100%',
        height: 130,
        justifyContent: 'flex-end',
        marginBottom: 8,
    },
    leftButton: {
        width: 270,
        height: '100%',
        backgroundColor: COLORS.tertiary,
        borderColor: COLORS.secondary,
        borderWidth: 1.25,
        marginLeft: -1.25,
        flexDirection: 'row',
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        alignItems: 'center',
    },
    rightButton: {
        width: 270,
        height: '100%',
        backgroundColor: COLORS.tertiary,
        borderColor: COLORS.secondary,
        borderWidth: 1.25,
        marginLeft: -1.25,
        flexDirection: 'row-reverse',
        borderTopLeftRadius: 24,
        borderBottomLeftRadius: 24,
        alignItems: 'center',
    },
    leftBlue: {
        backgroundColor: COLORS.primary,
        width: '97%',
        height: '88%',
        marginLeft: -1,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,

        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightBlue: {
        backgroundColor: COLORS.primary,
        width: '97%',
        height: '88%',
        marginRight: -1,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,

        display: 'flex',
        flexDirection: 'row-reverse',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },
    textcontainer: {
        width: 90,
        height: '100%',
        flexDirection: 'column',
        gap: 11,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    text: {
        color: COLORS.white,
        fontFamily: 'Lexend_700Bold',
        //fontWeight: 900,
        fontSize: 14,
        //fontWeight: "bold",
        textAlign: 'center',
    },
    typecontainer: {
        backgroundColor: COLORS.secondary,
        paddingVertical: 2,
        paddingHorizontal: 4,
        borderRadius: 10,
    },
    type: {
        fontSize: 10,
        color: 'white',
    },
    imageContainer: {
        // justifySelf: 'center',
        // alignSelf: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 100,
    },
})
