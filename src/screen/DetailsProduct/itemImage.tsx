import React from 'react';
import {Dimensions, Image, View} from 'react-native';
import ProgressiveImage from '../../components/progressiveImage';
import {IMAGE_ADDRESS} from '../../utils/adress.api';
import styled from 'styled-components';

const widthFull = Dimensions.get('screen').width;
const ViewFull = styled(View)`
  align-items: center;
  height: ${widthFull};
`;

export function ItemImage({file}) {
  console.log('product-variations', file);

  return (
    <>
      <Image
        resizeMode="contain"
        style={{height: '80%', width: Dimensions.get('screen').width}}
        source={{uri: IMAGE_ADDRESS + file}}
      />
    </>
  );
}
