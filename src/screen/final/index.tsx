import React, {useContext, useEffect, useState} from 'react';
import {BackgroundView, Padding} from '../../css/main.style';
import {TitleStep} from '../shop/style/shop.style';
import {IconlyProvider} from 'react-native-iconly';
import HeaderScComponent from '../../components/header2';
import RadioButton from '../../components/radioButton';
import {View, Text, Linking, ScrollView} from 'react-native';

import {
  TextBlack,
  TextGray,
  TextRed,
  ViewRow,
} from '../orderDetails/style/orderDetails.style';
import {BasketContext} from '../../service/Basket/Basket.context';
import {Space} from '../../infrastructuer/theme/space.style';
import BottomViewBasket from '../../components/bottomViewBasket';
import NumberFormat from 'react-number-format';
import LineW from '../../components/lineW';
import {Color} from '../../infrastructuer/theme/colors.style';
import {TextInput} from 'react-native-gesture-handler';
import CheckBox from '../../components/checkBox';
import DropdownAlert from 'react-native-dropdownalert';
export default function FinalScreen({navigation, route}) {
  const {
    totalPrice,
    shipping,
    resultSymbol,
    paymentMethodsFn,
    paymentMethods,
    bulkAdd,
    codePrice,
  } = useContext(BasketContext);
  let dropDownAlertRef = React.useRef();

  const [withdrawal, setWithdrawal] = useState(false);
  const [description, setDescription] = useState('');
  const [declaration, setDeclaration] = useState(false);
  const [conditions, setConditions] = useState(false);
  const [error, setError] = useState(false);

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
              {'Accept the rules'}
            </Text>
            <Space lineH={40} />
            <TextInput
              style={{
                width: '100%',
                height: 200,
                borderWidth: 1,
                borderColor: Color.brand.grey,
                borderRadius: 10,
                textAlign: 'left',
                textAlignVertical: 'top',
              }}
              onChangeText={e => setDescription(e)}
            />
            <Space lineH={15} />
            <ViewRow style={{justifyContent: 'flex-start'}}>
              <CheckBox onCheck={e => setWithdrawal(e)} />
              <Space lineW={10} />
              <Text>{'I have read and agree with Right of Withdrawal'}</Text>
            </ViewRow>
            <Space lineH={15} />
            <ViewRow style={{justifyContent: 'flex-start'}}>
              <CheckBox onCheck={e => setConditions(e)} />
              <Space lineW={10} />
              <Text>{'I have read and agree with Term of Conditions'}</Text>
            </ViewRow>
            <Space lineH={15} />
            <ViewRow style={{justifyContent: 'flex-start'}}>
              <CheckBox onCheck={e => setDeclaration(e)} />
              <Space lineW={10} />
              <Text>
                {'I have read and agree with Data protection declaration'}
              </Text>
            </ViewRow>
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
                decimalScale={2}
                prefix={''}
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
            if (withdrawal && conditions && declaration) {
              navigation.navigate('PaymentScreen_SCREEN', {
                address: route.params.address,
                delivery_contact_group_id:
                  route.params.delivery_contact_group_id,
                invoice_contact_group_id:
                  route.params.delivery_contact_group_id,
                description: description,
              });
              // Linking.openURL('http://paypal.com');
            } else {
              setError(true);
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
