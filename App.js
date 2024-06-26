
import {View,Text,Image, Button, StyleSheet} from "react-native"
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Screens/HomeScreen";
import SavedScreen from "./Screens/SavedScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import tempfile from "./Screens/tempfile";
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from "react";
import * as Font from 'expo-font'
import LanguageSelectScreen from "./Screens/LanguageSelectScreen";
import main_interface_for_speech from "./Screens/main_interface_for_speech";
SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TabNavigator = (props) =>{
  return(
    //<Tab.Navigator>
    <Tab.Navigator
    screenOptions={{headerShown:false}}>
      <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel:"Home",
        tabBarIcon:()=>{
          return <AntDesign name="home" size={24} color="black" />
        }
      }
      }
      >
      </Tab.Screen>
      <Tab.Screen
      name="Save"
      component={SavedScreen}
      options={{
        tabBarLabel:"Save",
        tabBarIcon:()=>{
          return <AntDesign name="save" size={24} color="black" />
        }
      }
      }
      >
      </Tab.Screen>
      <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarLabel:"Settings",
        tabBarIcon:()=>{
          return <Feather name="settings" size={24} color="black" />
        }
      }
      }
      >
      </Tab.Screen>
      <Tab.Screen
      name="Voice"
      component={tempfile}
      options={
        {
          tabBarLabel:"Voice to Text",
          tabBarIcon:()=>{
            return <MaterialIcons name="keyboard-voice" size={24} color="black" />
          }
        }
      }>

      </Tab.Screen>
    </Tab.Navigator>
  )
}
export default function App(props){

  const [appisLoaded,setappisLoaded] = useState(false);
  useEffect(()=>{
    const prepare = async()=>{
      try{
        await Font.loadAsync({
          black : require("./assets/font-pack/Poppins-Black.ttf")
        });
      }catch(e){
        console.log(e);
      }finally{
        setappisLoaded(true);
      }
    }
      prepare();
  },[]);

  const onLayout = useCallback(async()=>{
    if(appisLoaded){
      await SplashScreen.hideAsync();
    }
  },[appisLoaded]);

  if(!appisLoaded){
    return null;
  }
    return(
      <NavigationContainer>
      <View onLayout={onLayout} style={{flex:1,backgroundColor:"lightblue",justifyContent:"center"}}>
            <Stack.Navigator screenOptions={
              {
                headerTitleStyle:{
                }
              }
            }>
              <Stack.Group>
                <Stack.Screen
                  name="main"
                  component={TabNavigator}
                  options={{
                    headerTitle: "Translate",
                    headerTitleAlign:"center",
                    headerStyle:{
                      backgroundColor:"#4285F4"
                    },
                    headerTitleStyle:{
                      color:"white"
                    }
                  }} />
              </Stack.Group>
              <Stack.Group
              screenOptions={
                {
                  tabBarTilte:{
                    color:"#428F54"
                  }
                }
              }>
                <Stack.Screen
                name="LanguageSelect"
                component={LanguageSelectScreen}>

                </Stack.Screen>
              </Stack.Group>
            </Stack.Navigator>
      </View>
    </NavigationContainer>
  
    )
}

const styles = StyleSheet.create({
    view_stlye:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        fontSize:25,
    }
})