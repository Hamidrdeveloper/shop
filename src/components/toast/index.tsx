import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import { Color } from '../../infrastructuer/theme/colors.style';
export default function Toast({text,show,renderToggleButton}) {
    
    const [visible, setVisible] = React.useState(true);
    function renderToggleButtonW ()  {
        return (<Button title='=ssssssss'onPress={() =>{
        setVisible(!visible)}}>
          TOGGLE POPOVER
        </Button>)
      }
    return (
        <View
        style={styles.backdrop}
        >
     
           {renderToggleButton()}
           {visible? <>
            <View style={[styles.triangle]} />
            <Text style={[styles.text]}>
              Welcome to UI Kitten 😻
            </Text>
           </> :null}
          
      
        </View>
      );
}
const styles = StyleSheet.create({
    content: {
      width:100,
      height:100,
      backgroundColor:"#000"
    },
    text:{
        width:300,
      height:30,
      alignSelf:'center',
      textAlign:"center",
      borderRadius:8,
      fontSize:16,
      textAlignVertical:'center',
      color:Color.brand.white,
      backgroundColor:Color.brand.blue
    },
    avatar: {
      marginHorizontal: 4,
    },
    backdrop: {
        width:`100%`,
        height:70,
      },
      triangle: {
        width: 0,
        height: 0,
        marginTop:5,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 15,
        alignSelf:'center',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: Color.brand.blue
      }
  });
