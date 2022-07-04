import React, {useContext, useEffect, useState} from 'react';
import {BackgroundView, Padding} from '../../css/main.style';
import {TitleStep} from '../shop/style/shop.style';
import {View, Text, Linking, ScrollView} from 'react-native';
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
import {BasketContext} from '../../service/Basket/Basket.context';
import NumberFormat from 'react-number-format';
import {IMAGE_ADDRESS} from '../../utils/adress.api';
export default function PaymentScreen({navigation, route}) {
  const {
    totalPrice,
    shipping,
    resultSymbol,
    paymentMethodsFn,
    paymentMethods,
    bulkAdd,
    codePrice,
  } = useContext(BasketContext);
  const [dataPayment, setDataPayment] = useState([]);
  useEffect(() => {
    paymentMethodsFn();
  }, []);
  useEffect(() => {
    let array = [];
    paymentMethods?.map(res => {
      array.push({
        title: res?.name,
        description: '',
        id: res?.id,
        image: {uri: IMAGE_ADDRESS + res.file_path},
      });
    });
    setDataPayment(array);
  }, [paymentMethods]);
  return (
    <>
      <BackgroundView>
        <ScrollView>
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
              items={dataPayment}
              onClick={() => {}}
            />
            <Space lineH={50} />
            {/* <ViewRow>
              <TextGray>{'Subtotal'}</TextGray>
              <NumberFormat
                value={parseInt(resultPrice).toFixed(2)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={''}
                renderText={(value, props) => {
                  return <TextBlack>{value + ' ' + resultSymbol}</TextBlack>;
                }}
              />
            </ViewRow> */}
            {/* <Space lineH={10} /> */}
            <ViewRow>
              <TextGray>{'Discount'}</TextGray>
              <TextRed>{codePrice}</TextRed>
            </ViewRow>
            <Space lineH={10} />
            <ViewRow>
              <TextGray>{'Shipping'}</TextGray>
              <TextBlack>{shipping + ' €'}</TextBlack>
            </ViewRow>
            <Space lineH={10} />
            <LineW />
            <ViewRow>
              <TextBlack>{'Total'}</TextBlack>
              <NumberFormat
                value={parseInt(totalPrice).toFixed(2)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={''}
                renderText={(value, props) => {
                  return <TextBlack>{value + ' ' + resultSymbol}</TextBlack>;
                }}
              />
            </ViewRow>
           
           
            {/* <Space lineH={10} /> */}
            {/* <ViewRow>
              <TextBlack>{'Bag Total'}</TextBlack>
              <NumberFormat
                value={parseInt(totalPrice).toFixed(2)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={''}
                renderText={(value, props) => {
                  return <TextBlack>{value + ' ' + resultSymbol}</TextBlack>;
                }}
              />
            </ViewRow> */}
          </Padding>
          <Space lineH={100} />
        </ScrollView>
        <BottomViewBasket
          title={'Pey'}
          onClick={() => {
            bulkAdd(route.params.address);
            navigation.navigate('OrderProcessingScreen');
            Linking.openURL('http://paypal.com');
          }}
        />
      </BackgroundView>
    </>
  );
}
