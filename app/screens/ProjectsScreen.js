import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { projectData } from "../../constants/projectsData";
import BigButton from '../../constants/BigButton';

//appearance of each button + trying to push the new screen onto nav stack
const ProjectItem = (props) => {
    const navigation = useNavigation();

    return (
        /*
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                navigation.navigate("Individual Project", {name: props.name, description: props.description})
            }}>
            <Text style={[styles.text, {fontFamily: "DM-Sans-B"}]}> { props.name } </Text>
        </TouchableOpacity>
        */
        <BigButton
            onPress={() => {
                navigation.navigate("Individual Team", {name: props.name, description: props.description})
            }}
            name = {props.name}
            dir = {props.id % 2 == 1 ? true : false}
        >
        </BigButton>
    );
};

//render the button idrk actually
const renderItem = ({ item }) => {
    return (
        <ProjectItem name={item.name} description={item.description} id={item.id} />
    )
};

//flatlist is like scrollview but better apparently
function Projects() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Projects </Text>
            <FlatList
                data={projectData}
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
        paddingTop: 50
    },
    button: {
        backgroundColor: "#004B87",
        width: 150,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 23
    },
    title: {
        fontSize: 20,
        paddingBottom: 20,
        paddingTop: 10,
        fontFamily: "Lexend_400Regular"
    },
    separator: {
        height: 10
    }
})

export default Projects;