import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from "react-native"
import { COLORS } from '../../constants/theme';
import FadeInView from '../../constants/FadeInView';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { fb_app, fb_storage } from '../../firebaseConfig';

function WelcomeScreen({navigation}) {
    //fetch from database
    [logo, setLogo] = useState("");
    useEffect(() => {
        getDownloadURL(ref(fb_storage, 'eb-logo.png'))
        .then((url) => {
            setLogo(url);
            // Or inserted into an <img> element
        })
        .catch((error) => {
            // Handle any errors
        });
    },[]);

    return (
        <View style={styles.container}> 
            <FadeInView>
                <Text style={styles.title}>
                    Empathy Bytes
                </Text>
            </FadeInView>
            <FadeInView delay={250} >
                <View style={styles.imageContainer}>
                    {/*adding image from storage*/}
                    {logo.length == 0 ? <></> : <Image style={styles.logo} source={{uri: `${logo}` }}/>}
                </View>
            </FadeInView>
            <FadeInView delay={500}>
                <Text style={styles.text}>
                    creating tech centered around empathy
                </Text>
            </FadeInView>
            <FadeInView delay={750}>
                <TouchableOpacity style={styles.goButton} onPress={() => navigation.navigate('Home')} >
                    <Text style={styles.goButtonText}>
                        explore
                    </Text>
                </TouchableOpacity>
            </FadeInView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.tertiary,
        // borderColor: "red",
        // borderWidth: 2,
    },
    imageContainer: {
        //alignItems: "center",
        //justifyContent: "center",
        padding: 30,
    },
    text: {
        color: COLORS.primary,
        fontSize: 20,
        //fontWeight: "bold",
        fontFamily: "Lexend_400Regular",
        // position: "absolute",
        textAlign: "center",
        padding: 30,
    },
    logo: {
        width: 200,
        height: 200,
        //padding: 80,
        //borderColor: COLORS.primary,
        //borderWidth: 3,
        borderRadius: 100
    },
    goButton: {
        borderRadius: 40,
        height: 50,
        width: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.secondary,
    },
    goButtonText: {
        color: "black",
        //fontWeight: "bold",
        textAlign: "center",
        fontSize: 15,
        fontFamily: "Lexend_700Bold"
    },
    title: {
        fontSize: 60,
        fontFamily: "Lexend_700Bold",
        //fontWeight: "bold",
        color: COLORS.primary,
        textAlign: "center",
        //textShadowColor: "rgba(0, 0, 0, 1)",
        //textShadowOffset: {width: -1, height: 10},
        //textShadowRadius: 10,
    },
    
})

export default WelcomeScreen;