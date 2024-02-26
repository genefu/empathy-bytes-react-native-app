import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen.js';
import HomeScreen from './app/screens/HomeScreen.js';
import ProjectsScreen from './app/screens/ProjectsScreen.js';
import TeamsScreen from './app/screens/TeamsScreen.js';
import IndividualTeam from "./app/screens/IndividualTeam.js";
import IndividualProject from "./app/screens/IndividualProject.js";
import AboutUs from "./app/screens/AboutUs.js";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Lexend_400Regular } from '@expo-google-fonts/lexend';
import ContactUs from './app/screens/ContactUs.js';

const Stack = createNativeStackNavigator();

export default function App() {
  //add any fonts here, they can be used globally
  const [fontsLoaded, fontError] = useFonts({
    Lexend_400Regular,
  });

  if (!fontsLoaded && !fontError) {
    return <Text> Loading... </Text>
  };
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen} 
          options={{animation: "fade", 
                    headerShadowVisible: false,
                    headerShown: false}}/>
        <Stack.Screen
          name="Home"
          component={HomeScreen} 
          options={{animation: "fade",
                    headerShadowVisible: false,
                    headerBackTitle:"Back",
                    headerShown: false}}/>
        <Stack.Screen
          name="Projects"
          component={ProjectsScreen} 
          options={{animation: "fade",
                    headerShadowVisible: false,
                    headerBackTitle:"Back",
                    headerShown: false}}/>
        <Stack.Screen
          name="Teams"
          component={TeamsScreen}
          options={{animation: "fade",
                    headerShadowVisible: false,
                    headerBackTitle:"Back",
                    headerShown: false}}/>
        <Stack.Screen
          name="Individual Team"
          component={IndividualTeam} 
          options={{animation: "fade",
                    headerShadowVisible: false,
                    headerBackTitle:"Back",
                    headerShown: false}}/>
        <Stack.Screen
          name="Individual Project"
          component={IndividualProject} 
          options={{animation: "fade",
                    headerShadowVisible: false,
                    headerBackTitle:"Back",
                    headerShown: false}}/>
        <Stack.Screen
          name="About Us"
          component={AboutUs} 
          options={{animation: "fade",
                    headerShadowVisible: false,
                    headerBackTitle:"Back",
                    headerShown: false}}/>   
        <Stack.Screen
          name="Contact Us"
          component={ContactUs} 
          options={{animation: "fade",
                    headerShadowVisible: false,
                    headerBackTitle:"Back",
                    headerShown: false}}/>                     
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
