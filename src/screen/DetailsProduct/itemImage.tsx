import React from 'react'
import { Dimensions, Image, View } from "react-native";
import { IMAGE_ADDRESS } from '../../utils/adress.api';
const widthFull = Dimensions.get('screen').width;

export function ItemImage({file}) {
  console.log('====================================');
  console.log(file,file);
  console.log('====================================');
    return (
      <View style={{width: widthFull, alignItems: 'center', height: `100%`}}>
        <Image
          resizeMode="contain"
          style={{height: `80%`, width: 300}}
          source={{uri:IMAGE_ADDRESS + file}}
        />
      </View>
    );
  }