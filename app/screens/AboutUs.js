import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from "react-native";
import { COLORS } from '../../constants/theme';
import BorderBox from '../../constants/BorderBox';
const windowWidth = Dimensions.get('window').width;
const imageHeight = 200;
const backHome = "<< back to home";

function AboutUs({navigation}) {
    return (
        <View style={styles.container}> 
            <Image
                    style={styles.image}
                    source={require('../../assets/teampic.jpeg')}
            />
            <ScrollView>
            <View style={styles.scrollContainer}> 
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.backText}>
                        {backHome}
                    </Text>
                </TouchableOpacity>
                
                <Text style={styles.titleText}>
						        Our Team
				        </Text>
                <View style={styles.boxGap}>
                    <BorderBox title={"What we do"} 
                        borderColor={COLORS.primary} 
                        titleColor={COLORS.primary} 
                        backroundColor={COLORS.tertiary} 
                        isCentered={false}>
                        <Text style={styles.text}>
                            Empathy Bytes VIP explores how multimedia and emerging technologies can enhance empathy and understanding as we create digital scholarship and improve access to resources.
                        </Text> 
                    </BorderBox>
                    {/* The developer bubble encapsulates the developers. Each headshot container view is a different person */}
                    <BorderBox title={"Developers"} 
                        borderColor={COLORS.secondary} 
                        titleColor={COLORS.secondary} 
                        backroundColor={COLORS.tertiary} 
                        isCentered={false}>
                        <View style={[styles.outlineBubble, styles.developerBubble]}>
                            <View style={styles.headshotContainer}>
                                <View style={styles.CircleShapeView}></View>
                                <Text style={{fontSize: 15, color: COLORS.primary, fontFamily: "Lexend_400Regular"}}>
                                    Name
                                </Text>
                                <Text style={{fontSize: 12, color: COLORS.primary, fontFamily: "Lexend_400Regular"}}>
                                    Role
                                </Text>
                            </View>
                            {/* */}
                            <View style={styles.headshotContainer}>
                                <View style={styles.CircleShapeView}></View>
                                <Text style={{fontSize: 15, color: COLORS.primary, fontFamily: "Lexend_400Regular"}}>
                                    Name
                                </Text>
                                <Text style={{fontSize: 12, color: COLORS.primary, fontFamily: "Lexend_400Regular"}}>
                                    Role
                                </Text>
                            </View>
                            {/* */}
                            <View style={styles.headshotContainer}>
                                <View style={styles.CircleShapeView}></View>
                                <Text style={{fontSize: 15, color: COLORS.primary, fontFamily: "Lexend_400Regular"}}>
                                    Name
                                </Text>
                                <Text style={{fontSize: 12, color: COLORS.primary, fontFamily: "Lexend_400Regular"}}>
                                    Role
                                </Text>
                            </View>
                            {/* */}
                            <View style={styles.headshotContainer}>
                                <View style={styles.CircleShapeView}></View>
                                <Text style={{fontSize: 15, color: COLORS.primary, fontFamily: "Lexend_400Regular"}}>
                                    Name
                                </Text>
                                <Text style={{fontSize: 12, color: COLORS.primary, fontFamily: "Lexend_400Regular"}}>
                                    Role
                                </Text>
                            </View>
                            {/* */}
                            <View style={styles.headshotContainer}>
                                <View style={styles.CircleShapeView}></View>
                                <Text style={{fontSize: 15, color: COLORS.primary, fontFamily: "Lexend_400Regular"}}>
                                    Name
                                </Text>
                                <Text style={{fontSize: 12, color: COLORS.primary, fontFamily: "Lexend_400Regular"}}>
                                    Role
                                </Text>
                            </View>
                            {/* */}
                            <View style={styles.headshotContainer}>
                                <View style={styles.CircleShapeView}></View>
                                <Text style={{fontSize: 15, color: COLORS.primary, fontFamily: "Lexend_400Regular"}}>
                                    Name
                                </Text>
                                <Text style={{fontSize: 12, color: COLORS.primary, fontFamily: "Lexend_400Regular"}}>
                                    Role
                                </Text>
                            </View>
                        </View>
                    </BorderBox>
                </View>
            </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        borderRadius: 10,        
    },
    scrollContainer: {
        flex: 1,
        alignItems: "center",
        paddingBottom: 30,
        width: windowWidth, 
        backgroundColor: "#FFFBE7", 
        borderRadius: 15,
        marginTop: imageHeight - 10,
    },
    headshotContainer: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    outlineBubble: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
    },
    developerBubble: {
        //height: 500,
        padding: 30,
    },
    titleText: {
        fontSize: 50,
        fontFamily: "Lexend_700Bold",
        color: COLORS.secondary,
        textAlign: "center",
        //fontWeight: 'bold',
        margin: 20,
    },
    captionText: {
        fontSize: 30,
        fontFamily: "Lexend_700Bold",
        color: COLORS.primary,
        zIndex: 1,
        position: 'absolute',
        top: -27,
        left: 20,
    },
    text: {
        color: COLORS.primary,
        textAlign: "left",
        margin: 20,
        fontFamily: "Lexend_400Regular",
    },
    backText: {
        color: COLORS.secondary,
        textAlign: "left",
        fontFamily: "Lexend_400Regular",
        marginTop: 10,

    },
    CircleShapeView: {
        //To make Circle Shape
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: COLORS.primary,
    },
    image: {
        height: imageHeight,
        width: windowWidth,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    /*colorGold: {
        color: "#B3A369",
        borderColor: "#B3A369",
    },
    colorBlue: {
        color: "#193054",
        borderColor: "#193054",
    },*/
    boxGap: {
        gap: 20,
    },
    backButton: {
        position: "absolute",
        left: 0,
    }
})

export default AboutUs;