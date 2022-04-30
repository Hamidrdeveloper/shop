import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';

export default function HeaderComponent({navigation}) {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          width: `100%`,
          height: 50,
          padding: 15,
          backgroundColor: Color.brand.white,
        }}>
        <Image
          style={{width: 30, height: 30}}
          resizeMode="contain"
          source={require('../../assets/image/arrow.png')}
        />
        <Space lineW={`70%`} />
        <TouchableOpacity onPress={()=>{navigation.navigate("Basket_SCREEN");}}>
        <Image
          style={{width: 28, height: 28}}
          resizeMode="contain"
          source={require('../../assets/image/Iconly-Light-Buy.png')}
        />
        </TouchableOpacity>
        <Space lineW={25} />

        <Image
          style={{width: 30, height: 30}}
          resizeMode="contain"
          source={require('../../assets/image/menu.png')}
        />
      </View>
    </>
  );
}
