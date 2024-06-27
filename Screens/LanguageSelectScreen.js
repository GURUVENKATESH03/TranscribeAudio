import React from "react"
import {View,Text,Image,StyleSheet, Modal} from "react-native"
import { ScrollView } from "react-native-gesture-handler";
export default function LanguageSelectScreen(){
    return(
        <View style={styles.view_stlye}>
            <ScrollView style={{
                width:350,
            }}>
                <View style={{
                    justifyContent:"center",
                    alignItems:"center",
                    marginStart:20,
                    paddingVertical:10
                }}>
                    <Text style={{
                        letterSpacing:0.6,
                        color:"#4285F4",
                        fontSize:20,
                        
                    }}>
                        English
                    </Text>
                    <Text>
                        English
                    </Text>
                    
                </View>
                </ScrollView>
            
        </View>
    )
}
const styles = StyleSheet.create({
    view_stlye:{
        flex:1,
        
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        fontSize:25,
    }
})