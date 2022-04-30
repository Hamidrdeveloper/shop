import React from 'react';
import {BackgroundView, Padding} from '../../css/main.style';
import {TitleStep} from '../shop/style/shop.style';
import {View, Text, Linking} from 'react-native';
import {IconlyProvider} from 'react-native-iconly';
import HeaderScComponent from '../../components/header2';
import RadioButton from '../../components/radioButton';
import {
  TextBlack,
  TextGray,
  TextRed,
  ViewRow,
} from '../orderDetails/style/orderDetails.style';
import {Space} from '../../infrastructuer/theme/space.style';
import LineW from '../../components/lineW';
import {Color} from '../../infrastructuer/theme/colors.style';
import BottomViewBasket from '../../components/bottomViewBasket';
import {Link} from '@react-navigation/native';
export default function PaymentScreen({navigation}) {
  return (
    <>
      <BackgroundView>
        <HeaderScComponent
          navigation={navigation}
          details={''}
          isProduct={false}
          IsText={true}
          title={'Payment Info'}
        />
        <Padding>
          <Text style={{fontSize: 20, color: Color.brand.black}}>
            {'Payment Method'}
          </Text>
          <RadioButton
            flexDirection={'column'}
            isImage={true}
            items={[
              {
                title: 'Credit card',
                description: `Order will be delivered between 3 - 5 business days`,
                id: 0,
                image: require('../../assets/image/cardcri.png'),
              },
              {
                title: 'Paypal',
                description: `Place your order before 6 pm and your items will be delivered`,
                id: 1,
                image: require('../../assets/image/paypal.png'),
              },
              {
                title: 'Electronic cash',
                description: `Place your order before 6 pm and your items will be delivered`,
                id: 1,
                image: require('../../assets/image/elctoro.png'),
              },
            ]}
            onClick={() => {
             
            }}
          />
          <Space lineH={80} />
          <ViewRow>
            <TextGray>{'Subtotal'}</TextGray>
            <TextBlack>{'999 €'}</TextBlack>
          </ViewRow>
          <Space lineH={10} />
          <ViewRow>
            <TextGray>{'Discount'}</TextGray>
            <TextRed>{'12 €'}</TextRed>
          </ViewRow>
          <Space lineH={15} />
          <ViewRow>
            <TextBlack>{'Total'}</TextBlack>
            <TextBlack>{'999 €'}</TextBlack>
          </ViewRow>
          <Space lineH={10} />
          <LineW />
          <Space lineH={10} />
          <ViewRow>
            <TextGray>{'Shipping'}</TextGray>
            <TextBlack>{'29 €'}</TextBlack>
          </ViewRow>
          <Space lineH={10} />
          <ViewRow>
            <TextBlack>{'Bag Total'}</TextBlack>
            <TextBlack>{'155,50 €'}</TextBlack>
          </ViewRow>
        </Padding>
        <BottomViewBasket
          title={'Pey'}
          onClick={() => {
            navigation.navigate("OrderProcessingScreen")
            Linking.openURL('http://paypal.com')}}
        />
      </BackgroundView>
    </>
  );
}
