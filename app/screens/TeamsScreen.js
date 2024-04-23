import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { teamData } from "../../constants/teamsData";
import ListButton from '../../constants/ListButton';
import BackArrow from '../../constants/BackArrow';
import { COLORS } from '../../constants/theme';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { fb_app, fb_storage } from '../../firebaseConfig';

//appearance of each button + trying to push the new screen onto nav stack
const TeamItem = (props) => {
    const navigation = useNavigation();
    [picURL, setPicTeam] = useState("");
    
    useEffect(() => {
        getDownloadURL(ref(fb_storage, props.teamPic))
        .then((url) => {
            setPicTeam(url);
            // Or inserted into an <img> element
        })
        .catch((error) => {
            // Handle any errors
        });
    },[]);

    return (
        // <Text style={styles.title}> {picURL} </Text>,
        //console.log("hi"),
        //console.log(props.team),
        //console.log({picURL}),
        <ListButton
            onPress={() => {
                navigation.navigate("Individual Team", {name: props.name, id: props.id, teamPic: props.teamPic})
            }}
            name = {props.name}
            type = {props.type}
            dir = {props.id % 2 == 1 ? true : false}
            image = {props.picURL}
        >
        </ListButton>
    );
};

//render the button idrk actually
const renderItem = ({ item }) => {
    console.log("hi")
    console.log(item.team)
    console.log(item.teamPic)
    return (
        <TeamItem name={item.team} id={item.id} teamPic={item.teamPic} picURL={item.picURL}/>
    )
};

//flatlist is like scrollview but better apparently
function Teams({navigation}) {
    return (
        <View style={styles.container}>
            <BackArrow navigation={navigation} page='Home' color='black'/>
            <Text style={styles.title}> Teams </Text>
            <FlatList
                data={teamData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={
                    <View style={styles.separator}/>
                }>
            </FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 50,
        backgroundColor: '#FFFBE7',
    },
    title: {
        fontSize: 30,
        //fontWeight:"bold",
        color: COLORS.secondary,
        marginTop: -30,
        paddingBottom: 20,
        fontFamily: "Lexend_700Bold",
    },
    separator: {
        height: 10
    }
})

export default Teams;