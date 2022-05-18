import React from 'react';
import {
  TextItem,
  ViewBasket,
  ViewBottomDetails,
} from '../bottomDetails/style/BottomDetails.style';
import {TouchableOpacity, View} from 'react-native';
import {Color} from '../../infrastructuer/theme/colors.style';
export default function BottomViewBasket({
  navigation,
  title = 'Next',
  onClick,
  resultPrice,
}) {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: `100%`,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
      }}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: `100%`,
          height: 92,
          backgroundColor: `rgba(0,0,0,0.1)`,
        }}
      />
      <ViewBottomDetails>
        <TouchableOpacity
          onPress={() => {
            onClick();
          }}>
          <ViewBasket>
            <TextItem style={{color: Color.brand.white}}>{title}</TextItem>
          </ViewBasket>
        </TouchableOpacity>

        <TextItem>{resultPrice}</TextItem>
      </ViewBottomDetails>
    </View>
  );
}
