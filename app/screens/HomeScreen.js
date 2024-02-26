import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import HomescreenButton from '../../constants/HomescreenButton';

function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <HomescreenButton text="About Us" style={styles.button} onPress={() => navigation.navigate('About Us')}/>
            <HomescreenButton text="Projects" style={styles.button} onPress={() => navigation.navigate('Projects')}/>
            <HomescreenButton text="Teams" style={styles.button} onPress={() => navigation.navigate('Teams')}/>
            <HomescreenButton text="Contact Us" style={styles.button} onPress={() => navigation.navigate('Contact Us')}/>
            {/*<Text style={[styles.text, {fontFamily: "DM-Sans-BI"}]}>
                Welcome to the home screen!!
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Projects')} >
                <Image
                    style={styles.button}
                    source={{
                    uri: 'https://i.stack.imgur.com/4G1qY.png'}}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Teams')} >
              <Image
                    style={styles.button}
                    source={{
                    uri: 'https://i.stack.imgur.com/4G1qY.png'}}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('About Us')} >
              <Image
                    style={styles.button}
                    source={{
                    uri: 'https://i.stack.imgur.com/4G1qY.png'}}
                />
            </TouchableOpacity>
            {/*<TouchableOpacity onPress={() => navigation.navigate('IndividualTeam')} >
                <Image
                    style={styles.button}
                    source={{
                    uri: 'https://i.stack.imgur.com/4G1qY.png'}}
                />
                </TouchableOpacity>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#000000",
        textAlign: "center"
    },
    button: {
        width: 100,
        height: 80,
    },
})

export default HomeScreen;