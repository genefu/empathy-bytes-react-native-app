import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native"
import { COLORS } from "../../constants/theme"
import { teamData } from '../../constants/teamsData';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { fb_app, fb_storage } from '../../firebaseConfig';

function IndividualTeam({ navigation, route }) {
    const { name, id, teamPic } = route.params;
    [picURL, setPicTeam] = useState("");
    
    useEffect(() => {
        getDownloadURL(ref(fb_storage, teamPic))
        .then((url) => {
            setPicTeam(url);
            // Or inserted into an <img> element
        })
        .catch((error) => {
            // Handle any errors
        });
    },[]);
    //if screen is app or web team page: render FlatList of description section, tech stack section, and dev section
    if (id == 1 || id === 2) {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}> {name} </Text>
                <Image style={styles.teamImage} source={picURL ? {uri: picURL} : null} />
                <FlatList style={styles.flatList}
                    data={teamData[id - 1].description}
                    renderItem={({item}) => <Section id={item.id} text={item.text}/>}
                    keyExtractor={item => item.id}
                    >
                </FlatList>
            </View>
        )
    //Section will have to be different
    //if screen is vr/ar screen
    //TODO add way to integrate the 3d objects
    } else if (id == 3) {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}> {name} </Text>
                <Image style={styles.teamImage} source={picURL ? {uri: picURL} : null} />
                <FlatList style={styles.flatList}
                    data={teamData[id - 1].description}
                    renderItem={({item}) => <Section id={item.id} text={item.text}/>}
                    keyExtractor={item => item.id}
                    >
                </FlatList>
            </View>
        )
    //Section will have to be different
    //if screen is media screen
    //TODO add way to embed youtube video
    } else if (id == 4) {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}> {name} </Text>
                <Image style={styles.teamImage} source={picURL ? {uri: picURL} : null} />
                <FlatList style={styles.flatList}
                    data={teamData[id - 1].description}
                    renderItem={({item}) => <Section id={item.id} text={item.text}/>}
                    keyExtractor={item => item.id}
                    >
                </FlatList>
            </View>
        )
    }
    
    //if screen is media or VR page// TODO change to FlatList
    /*return (
        <View style={styles.container}> 
            <View style={styles.imageContainer}>
                <Image
                    style={styles.teamImage}
                    source={{
                    uri: 'https://educast.library.gatech.edu/wp-content/uploads/2020/10/cropped-logoGearsOnlyRound-1-2.png'}}
                />
            </View>
            <Text style={styles.titleText}>
                { name }
            </Text>
            <Text style={styles.text}>
                { description }
            </Text>
            <Text style={styles.text}>
                Press this button to return back to Welcome Screen.
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Welcome')} >
                <Image
                    style={styles.button}
                    source={{
                    uri: 'https://i.stack.imgur.com/4G1qY.png'}}
                />
            </TouchableOpacity>
        </View>
    );*/
}

//TODO styling + changing it depending on the screen
const Section = (props) => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.text}>
                {props.text}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 50,
        backgroundColor: COLORS.primary,
    },
    sectionContainer: {
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 80,
        paddingVertical: 15,
        marginTop: 30,
        borderColor: COLORS.tertiary,
        backgroundColor: "COLORS.primary",
    },
    imageContainer: {
        // alignItems: "center",
        // justifyContent: "center",
        padding: 20,
    },
    flatList: {
        backgroundColor: COLORS.primary,
    },
    text: {
        color: COLORS.tertiary,
        fontFamily: "Lexend_400Regular"
    },
    button: {
        width: 100,
        height: 80,
    },
    titleText: {
        fontSize: 30,
        //fontWeight: "bold",
        color: COLORS.tertiary,
        fontFamily: "Lexend_700Bold"
    },
    teamImage: {
        // width: 130,
        // height: 80,
        padding: 80,
        aspectRatio: 1.5, // Maintain aspect ratio
        resizeMode: 'contain',
        // borderWidth: 2, // Border width
        // borderColor: COLORS.secondary, // Border color
        // borderRadius: 10, // Border radius for rounded corners
    },
})

export default IndividualTeam;