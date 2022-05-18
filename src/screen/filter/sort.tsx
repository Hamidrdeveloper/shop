import React, {useContext} from 'react';
import {useState} from 'react';
import {Text} from 'react-native';
import {View} from 'react-native';
import {Card, Icon, Slider} from 'react-native-elements';
import {
  ArrowRight,
  CaretRight,
  ChevronRight,
  CloseSquare,
  IconlyProvider,
} from 'react-native-iconly';
import HeaderScComponent from '../../components/header2';
import RightButton from '../../components/rightButton';
import RightSwitch from '../../components/rightSwitch';
import {BackgroundView, Padding} from '../../css/main.style';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import {SortOrder} from '../../service/Products/model';
import {ProductContext} from '../../service/Products/Product.context';

export default function SortScreen({navigation}) {
  const {searchProductsFn} = useContext(ProductContext);
  function onSort(type: string) {
    searchProductsFn(null, null, type);
    navigation.goBack();
  }

  return (
    <BackgroundView>
      <HeaderScComponent
        navigation={navigation}
        title={'Sort'}
        details={'Delete All filters'}
      />
      <Padding>
        <RightButton isIcon={false} title={'Popular'} navigation={navigation} />
        <Space lineH={15} />
        <RightButton
          isIcon={false}
          title={'Best Selling'}
          navigation={navigation}
        />
        <Space lineH={15} />

        <RightButton
          isIcon={false}
          title={'Cheapest'}
          navigation={navigation}
          onPress={() => {
            onSort({sort: 'DESC', 'productVariationPrices.value': 'ASC'});
          }}
        />
        <Space lineH={15} />

        <RightButton
          isIcon={false}
          title={'Most Expensive'}
          navigation={navigation}
          onPress={() => {
            onSort({sort: 'DESC', 'productVariationPrices.value': 'DESC'});
          }}
        />
        <Space lineH={15} />
        <RightButton isIcon={false} title={'Newest'} navigation={navigation} />
      </Padding>
    </BackgroundView>
  );
}
