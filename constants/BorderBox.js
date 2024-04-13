import React from 'react';
import { View, Text, StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width;

// isCentered isn't implemented yet :(
const BorderBox = (props) => {
    return (
        <View style={[styles.borderBox, {borderColor: props.borderColor}]}> 
            <Text style={[styles.captionText, {color: props.titleColor, backgroundColor: props.backroundColor}]}>
              {props.title}
            </Text>
            {props.children}
        </View>
    );
}

export default BorderBox;

const styles = StyleSheet.create({
  borderBox: {
    borderWidth: 1.5,
    borderRadius: 35,
    width: windowWidth - 50,
    margin: 5,
  },
  captionText: {
    position: 'absolute',
    fontSize: 30,
    fontFamily: "Lexend_700Bold",
    zIndex: 1,
    position: 'absolute',
    top: -27,
    left: 20,
    paddingHorizontal: 5,
  },
})
