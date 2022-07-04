import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import HeaderComponent from '../../components/header';
import HeaderScComponent from '../../components/header2';
import {BackgroundView, Padding} from '../../css/main.style';
import {BasketContext} from '../../service/Basket/Basket.context';
import TabOrder from './tabOrder';

export default function OrderProcessingScreen({navigation}) {
  return (
    <BackgroundView>
      <ScrollView>
        <HeaderScComponent title={'Orders'} navigation={navigation} />

        <TabOrder navigation={navigation} />
      </ScrollView>
    </BackgroundView>
  );
}
