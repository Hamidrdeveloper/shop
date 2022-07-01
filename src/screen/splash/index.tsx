import React, {useContext, useEffect, useState} from 'react';
import {Image, View} from 'react-native';

import IndicatorBottom from '../../components/lodging/indicatorBottom';
import {MainContext} from '../../service/Main/Main.context';
import {ProfileContext} from '../../service/Profile/Profile.context';

export default function SplashScreen({navigation}) {
  const {onRunAllApi} = useContext(MainContext);
  const [login, setLogin] = useState(true);
  useEffect(() => {
    onRunAllApi();
    setTimeout(() => {
      navigation.replace('Bottom_SCREEN');
    }, 2000);
  }, []);

  return (
    <>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: `100%`,
          height: `100%`,
        }}>
        <Image
          resizeMode="contain"
          source={require('../../assets/image/cleafin_logo.png')}
          style={{width: 200, height: 200}}
        />

        <Image
          resizeMode="stretch"
          source={require('../../assets/image/Artboard.png')}
          style={{
            width: 200,
            height: 300,
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        />
        <Image
          resizeMode="stretch"
          source={require('../../assets/image/ArtboardLeft.png')}
          style={{
            width: 200,
            height: 300,
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}
        />
        <IndicatorBottom isVisible={login} />
      </View>
    </>
  );
}
