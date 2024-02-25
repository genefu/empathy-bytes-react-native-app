import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from "react-native"
import { COLORS, FONT } from '../../constants/theme';
import FadeInView from '../../constants/FadeInView';
import { useFonts } from 'expo-font';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { fb_app, fb_storage } from '../../firebaseConfig';
import { Colors } from 'react-native/Libraries/NewAppScreen';

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
    

    //font :(
    const [fontsLoaded] = useFonts({
        "DM-Sans": require('../../assets/fonts/DMSans-Regular.ttf'),
        "DM-Sans-I": require('../../assets/fonts/DMSans-Italic.ttf'),
        "DM-Sans-B": require('../../assets/fonts/DMSans-Bold.ttf'),
        "DM-Sans-BI": require('../../assets/fonts/DMSans-BoldItalic.ttf'),
        "DM-Sans-L": require('../../assets/fonts/DMSans-Light.ttf'),
        "DM-Sans-LI": require('../../assets/fonts/DMSans-LightItalic.ttf'),
        "DM-Sans-EL": require('../../assets/fonts/DMSans-ExtraLight.ttf'),
        "DM-Sans-ELI": require('../../assets/fonts/DMSans-ExtraLightItalic.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}> 
            <FadeInView>
                <Text style={[styles.title, {fontFamily: "DM-Sans-B"}]}>
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
                <Text style={[styles.text, {fontFamily: "DM-Sans-B"}]}>
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
        fontWeight: "bold",
        // position: "absolute",
        textAlign: "center",
        paddingBottom: 30,
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
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 15,
    },
    title: {
        fontSize: 60,
        //fontWeight: "bold",
        color: COLORS.primary,
        textAlign: "center",
        //textShadowColor: "rgba(0, 0, 0, 1)",
        //textShadowOffset: {width: -1, height: 10},
        //textShadowRadius: 10,
    },
    
})

export default WelcomeScreen;