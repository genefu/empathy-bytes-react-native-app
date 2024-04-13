import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import { COLORS } from './theme';

var textBorderColor = COLORS.primary;

function HomescreenButton(props) {
    textBorderColor = props.color;

    return (
        <View style={styles.test}>
            <Svg
                width="100%"
                height="100%"
                viewBox="0 0 274 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <Path
                    d="M.5 20C.5 9.23 9.23.5 20 .5h206.465a19.5 19.5 0 0114.079 6.008l27.353 28.542c7.021 7.326 7.25 18.812.527 26.412L240.595 92.92a19.5 19.5 0 01-14.605 6.58H20C9.23 99.5.5 90.77.5 80V20z"
                    stroke={textBorderColor}
                    strokeWidth={1.2}
                />
                
            </Svg>
            <TouchableOpacity style={styles.button} onPress={props.onPress}>
                <Image
                    style={styles.buttonImageIconStyle}
                    source={props.image}
                />
                {/*<View style={styles.CircleShapeView}></View>*/}

                <Text style={[styles.text, {color: props.color}]}>
                    {props.text}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        //borderColor: "#193054", Now given from props in HomeScreen
        // borderWidth: 2,
        // borderRadius: 40,
        //backgroundColor: "#B3A369",
        height: 130,
        width: 300,
        paddingLeft: 30,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    test: {
        height: 155,
        width: 375,
    },
    text: {
        paddingLeft: 30,
        fontSize: 27,
        textAlign: "left",
        fontFamily: "Lexend_400Regular",
        // borderWidth: 2,
        // borderColor: 'red',
    },
    buttonImageIconStyle: {
        paddingRight: 0,
        margin: 0,
        height: 70,
        width: 70,
        resizeMode: 'cover',
    },
    CircleShapeView: {
        //To make Circle Shape
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        backgroundColor: '#D9D9D9',
      },
})
export default HomescreenButton;