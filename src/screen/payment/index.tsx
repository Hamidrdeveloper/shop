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
import DropdownAlert from 'react-native-dropdownalert';

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
  const [selectPayment, setSelectPayment] = useState(0);
  const [error, setError] = useState(false);

  let dropDownAlertRef = React.useRef();

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

  useEffect(() => {
    if (error) {
      dropDownAlertRef.alertWithType('error', 'All fields must be filled');
      setError(false);
    }
  }, [error]);
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
              onClick={e => {
                setSelectPayment(e);
              }}
            />
            <Space lineH={50} />
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
                value={totalPrice}
                displayType={'text'}
                thousandSeparator={true}
                prefix={''}
                decimalScale={2}
                renderText={(value, props) => {
                  return <TextBlack>{value + ' ' + resultSymbol}</TextBlack>;
                }}
              />
            </ViewRow>
          </Padding>
          <Space lineH={100} />
        </ScrollView>
        <BottomViewBasket
          title={'Pey'}
          resultPrice={totalPrice}
          resultSymbol={resultSymbol}
          onClick={() => {
            if (selectPayment != 0) {
              let pay = {
                delivery_contact_group_id:
                  route.params.delivery_contact_group_id,
                description: route.params.description,
                invoice_contact_group_id: route.params.invoice_contact_group_id,
                payment_method_id: selectPayment,
                shipping_profile_id: '',
              };
              bulkAdd(pay);
              navigation.navigate('OrderProcessingScreen');
            }
          }}
        />
      </BackgroundView>
      <DropdownAlert
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
    </>
  );
}
