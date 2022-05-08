import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {TextInputSign} from './style/signUp.style';
import {BackgroundForm, ButtonColor} from '../../css/main.style';
const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: 300,
    width: 300,
    backgroundColor: 'tomato',
  },
  map: {
    height: 300,
  },
  touchableContainer: {borderColor: 'black', borderWidth: 1.0, width: 60},
  touchable: {
    backgroundColor: 'blue',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiaGFtaWRyZGV2ZWxvcGVyIiwiYSI6ImNrOHp3eW4ybTBmamEzZnBydmtybmRrZnAifQ.neIu6a_sJjQycKnNxEdxkA',
);

export default function PartFour({onChangeValue}) {
  return (
    <>
      <BackgroundForm>
        <View style={{height: 500}}>
          <MapboxGL.MapView style={styles.map}>
            <MapboxGL.Camera
              zoomLevel={9}
              centerCoordinate={[-73.970895, 40.723279]}
            />
          </MapboxGL.MapView>
          <Space lineH={10} />
          <Text>
            <Text style={{fontSize: 14, color: Color.brand.textGrey}}>
              {'Your Location :'}
            </Text>
            <Text style={{fontSize: 16, color: Color.brand.black}}>
              {
                'Ltd. 30 Commercial Road  Fratton PORTSMOUTH Hampshire PO1 1AA  UNITED KINGDOM'
              }
            </Text>
          </Text>
          <Space lineH={30} />
          <Text style={{color: Color.brand.black}}>{'Your Postcode'}</Text>
          <Space lineH={10} />
          <TextInputSign
            placeholder={'Postal code'}
            placeholderTextColor={'#000'}
          />
        </View>
      </BackgroundForm>
      <ButtonColor
      style={{top:200}}
        onPress={() => {
          onChangeValue();
        }}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            color: Color.brand.white,
          }}>
          {'Submit'}
        </Text>
      </ButtonColor>
    </>
  );
}
