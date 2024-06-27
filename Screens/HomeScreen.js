
import {View,Text,Image, Button,Modal,ScrollView, StyleSheet} from "react-native"
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useState } from "react";
import LanguageSelectScreen from "./LanguageSelectScreen";
const req = null;
export default function HomeScreen(props){
    const [textVariable,setEnteredText] = useState("");
    const [resultVariable,setResultText] = useState("");
    const [showI,setshowI] = useState(false);


    return(
        <View style={styles.view_stlye}>
            <View style={styles.languageContainer}>
                <TouchableOpacity
                onPress={()=>props.navigation.navigate("LanguageSelect")}>
                    <Text style={styles.languageColor}>
                        English
                    </Text>
                </TouchableOpacity>
                <View>
                <AntDesign name="arrowright" size={24} color="black" />
                </View>
                <TouchableOpacity
                onPress={()=>console.log("Pressed")}>
                    <Text style={styles.languageColor}>
                        French
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inBuildContainer}>
                <TextInput 
                multiline
                placeholder="Enter the Text"
                onChangeText={(text)=>{
                    setEnteredText(text)
                    setResultText(text)
                    req=text;
                }}>
                </TextInput>

                <TouchableOpacity
                disabled={textVariable === ""}

                onPress={()=>{
                    console.log("Pressed")}}
                >
                    <View style={styles.inputIconStyle}>
                    <Feather 
                        name="arrow-right-circle" 
                        size={24} 
                        color= {textVariable !=="" ? "#4285F4": "black"} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.resultContainer}>
                <Text>
                    {req}
                </Text>

                <TouchableOpacity
                style={styles.resultText}
                disabled={resultVariable === ""}>
                        <Feather name="copy" size={24} color={resultVariable !==""? "#4285F4": "black"} />
                </TouchableOpacity>
            </View>
            <View
            style={styles.historyContainer}
            
            >
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view_stlye:{
        flex:1,
        fontSize:25,
    },
    languageContainer:{
        flexDirection:'row',
        justifyContent:"space-around",
        alignItems:"center",
        borderBottomColor:"lightgrey",
        borderBottomWidth:1,
        paddingVertical:15,
    },
    languageColor:{
        color:"#4285F4",
        letterSpacing:0.6,
    },
    inBuildContainer:{
        //justifyContent:"center",
        //alignItems:"center",
        
        textAlign:'center',
        paddingStart:40,
        borderBottomColor:"lightgrey",
        borderBottomWidth:1,
    },
    inputIconStyle:{
        height:75,
        flexDirection:'row',
        //justifyContent:'flex-end',
        alignSelf:'flex-end',
        marginTop:22,
        marginEnd:10,
    },
    resultContainer:{

        textAlign:'center',
        paddingStart:40,
        borderBottomColor:"lightgrey",
        borderBottomWidth:1,
    },
    resultText:{
        height:90,
        flexDirection:'row',
        //justifyContent:'flex-end',
        alignSelf:'flex-end',
        marginTop:30,
        marginEnd:10,

    },
    historyContainer:{
        backgroundColor:"lightgrey",
        flex:1,
    }
})
