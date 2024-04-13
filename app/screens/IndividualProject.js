import React , {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native"
import { COLORS } from "../../constants/theme"
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { fb_app, fb_storage } from '../../firebaseConfig';
import BackArrow from '../../constants/BackArrow';
import BorderBox from '../../constants/BorderBox';
import { FlatList } from 'react-native-gesture-handler';
import { projectData } from '../../constants/projectsData';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function IndividualProject({ navigation, route }) {
    const { name, description, id } = route.params;
    // [picURL, setPicProj] = useState("");
    
    // useEffect(() => {
    //     getDownloadURL(ref(fb_storage, projectPic))
    //     .then((url) => {
    //         setPicTeam(url);
    //         // Or inserted into an <img> element
    //     })
    //     .catch((error) => {
    //         // Handle any errors
    //     });
    // },[]);

    if (id) {
        return (
            <GestureHandlerRootView style={styles.container}>
                <BackArrow navigation={navigation} page='Home' color="#ABA174"/>
                <TouchableOpacity onPress={() => navigation.navigate('Projects')} >
                        
                </TouchableOpacity>
                <FlatList style={styles.flatList}
                        data={projectData[id - 1].description}
                        renderItem={({item}) => <Section id={item.id} text = {item.text} />}
                        keyExtractor={item => item.id}
                        >        
                </FlatList>
               
            </GestureHandlerRootView>
        )
    }
    else {
    return (
        <View style={styles.container}> 
        <BackArrow navigation={navigation} page='Home' color="#ABA174"/>
         {/* <TouchableOpacity onPress={() => navigation.navigate('Projects')} >
                
            </TouchableOpacity> */}
        <ScrollView>
            <View style={styles.titleContainer}>
            <BorderBox title={name} 
                        borderColor={COLORS.tertiary} 
                        titleColor={COLORS.tertiary} 
                        backroundColor={COLORS.primary} 
                        isCentered={false}> 
                        <Image 
                            style={styles.image}
                            source={require('../../assets/teampic.jpeg')}/>
                        
                        
            </BorderBox>
            </View>

            <View style={styles.titleContainer}>
            <BorderBox title={"Description"} 
                        borderColor={COLORS.tertiary} 
                        titleColor={COLORS.secondary}
                        backroundColor={COLORS.primary} 
                        isCentered={false}>
                        <Text style={styles.text}>
                            {description}
                        </Text> 
                    </BorderBox>
                    </View>
            
            </ScrollView>
        </View>
    );
    }
}


const Section = (props) => {
    // console.log(props.text);
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
        backgroundColor: COLORS.primary,
    },
    flatList: {
        backgroundColor: COLORS.primary,
    },
    text: {
        color: COLORS.tertiary,
        fontFamily: "Lexend_400Regular"
    },
    titleContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    descriptionContainer: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    // text: {
    //     color: "#FFFFFF",
    //     fontFamily: "Lexend_400Regular",
    //     marginLeft: 20,
    //     marginRight: 20,
    //     top: 20,
    //     justifyContent: "center",
    //     paddingBottom: 30,
    // },
    button: {
        width: 70,
        height: 40,
        marginTop: 50,
    },
    titleText: {
        fontSize: 30,
        // fontWeight: 'bold',
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: "Lexend_700Bold",
        marginLeft: 20,
        marginRight: 20,
    },
    teamImage: {
        width: 80,
        height: 80,
        padding: 80,
    },
    image: {
        width: 300,
        height: 250,
        left: 20,
        bottom: 20,
    },
    flatList: {
        backgroundColor: COLORS.primary,
    },
    text: {
        color: COLORS.tertiary,
        fontFamily: "Lexend_400Regular"
    },
})

export default IndividualProject;