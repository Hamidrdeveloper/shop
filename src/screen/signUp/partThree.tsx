import React, { useEffect, useState } from 'react';
import {Text, TextInput, View} from 'react-native';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SignUpModel } from '../../service/Auth/model';
import { TextInputSign, ViewIcon, ViewRowTextInput } from './style/signUp.style';
import { Show } from 'react-native-iconly';

export default function PartThree({ onChangeValue = (value) => {}}) {
  const [passOne, setPassOne] = useState(SignUpModel.password);
  const [passTwo, setPassTwo] = useState(SignUpModel.password);
  const [showPassOne, setShowPassOne] = useState(true);
  const [showPassTwo, setShowPassTwo] = useState(true);
  function setPassword(){
  if(passOne==passTwo){
    SignUpModel.password=passOne;
  }else{
    // alert("Not")2
  }
  }
  useEffect(() => {
    if(passOne.length>5){
      setPassword();
      onChangeValue(true)
    }else{
      onChangeValue(false)
    }
    
  }, [passOne,passTwo])
  
  return (
    <>
      <Text style={{color: Color.brand.black}}>{'Password'}</Text>
      <Space lineH={10} />
      <ViewRowTextInput>
        <TextInputSign
         placeholder={"**********"}
         placeholderTextColor={"#000"}
         secureTextEntry={showPassOne}
          onChangeText={(e)=>{setPassOne(e)}}
        />
        <ViewIcon>
        <Show onPress={()=> setShowPassOne(!showPassOne)}size={"medium"} primaryColor={Color.brand.textGrey}/>
        </ViewIcon>
        </ViewRowTextInput>
      <Space lineH={20} />
      <Text style={{color: Color.brand.black}}>{'Confirm Password'}</Text>
      <Space lineH={10} />
      <ViewRowTextInput>
        <TextInputSign
         placeholder={"**********"}
         placeholderTextColor={"#000"}
         secureTextEntry={showPassTwo}
         onChangeText={(e)=>{setPassTwo(e)}}
        />
        <ViewIcon>
        <Show onPress={()=> setShowPassTwo(!showPassTwo)}size={"medium"} primaryColor={Color.brand.textGrey}/>
        </ViewIcon>
        </ViewRowTextInput>
      <Space lineH={20} />

      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            borderColor: Color.brand.border,
            borderWidth: 1,
            width: 20,
            height: 20,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: Color.brand.blue,
              width: 16,
              height: 16,
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign name="check" color={Color.brand.white} size={16} />
          </View>
        </View>
        <Space lineW={10} />
        <Text>
        <Text style={{color:Color.brand.textGrey,fontSize:18}}>{"I agree with the"}</Text>
        <Text style={{color:Color.brand.blue,fontSize:18}}>{" terms and conditions"}</Text>
        </Text>
      </View>
    </>
  );
}
