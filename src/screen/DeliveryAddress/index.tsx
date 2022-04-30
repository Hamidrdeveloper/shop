import React, {useContext, useEffect, useRef, useState} from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import {BottomSheet} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Call,
  Delete,
  Discovery,
  IconlyProvider,
  Location,
  MoreCircle,
  Swap,
  User,
} from 'react-native-iconly';
import BottomViewBasket from '../../components/bottomViewBasket';
import HeaderScComponent from '../../components/header2';
import LineW from '../../components/lineW';
import RadioButton from '../../components/radioButton';
import {BackgroundView, Padding} from '../../css/main.style';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import {
  DetailsAddress,
  Menu,
  TitleAddress,
  TitleAddressBlue,
  TitleAddressTitle,
  ViewItemAddress,
  ViewPopUp,
} from '../DeliveryAddress/style/myAddress.style';
import {
  TextBlack,
  TextGray,
  ViewRow,
} from '../orderDetails/style/orderDetails.style';
const height = Dimensions.get('screen').height;
import Storage from '../../utils/storeData/index';
import {KEY} from '../../utils/storeData/key';
import {AddressContext} from '../../service/Address/Address.context';
import DropdownAlert from 'react-native-dropdownalert';
import { BasketContext } from '../../service/Basket/Basket.context';
export default function DeliveryAddressScreen({navigation, route}) {
  const [isVisible, setIsVisible] = useState(false);
  const {getAddressFn, addressSelect} = useContext(AddressContext);
  const {bulkAdd} = useContext(BasketContext);
  let dropDownAlertRef = useRef();
  useEffect(() => {
    getAddressFn();
  }, []);

  const renderContent = () => (
    <>
      <TouchableOpacity onPress={() => setIsVisible(false)}>
        <View
          style={{
            height: height - 150,
            width: `100%`,
          }}
        />
      </TouchableOpacity>

      <ViewPopUp>
        <View style={{flexDirection: 'row'}}>
          <IconlyProvider
            set="broken"
            size={'medium'}
            primaryColor={Color.brand.black}
            secondaryColor={Color.brand.black}>
            <User primaryColor={`${Color.brand.black}`} />
          </IconlyProvider>
          <Space lineW={10} />
          <Text style={{color: Color.brand.black, fontSize: 16}}>
            {'Edit address'}
          </Text>
        </View>
        <Space lineH={10} />
        <LineW />
        <Space lineH={10} />
        <View style={{flexDirection: 'row'}}>
          <IconlyProvider
            set="broken"
            size={'medium'}
            primaryColor={Color.brand.textGrey}
            secondaryColor={Color.brand.textGrey}>
            <Delete primaryColor={`red`} />
          </IconlyProvider>
          <Space lineW={10} />
          <Text style={{color: `red`, fontSize: 16}}>{'Delete address'}</Text>
        </View>
      </ViewPopUp>
    </>
  );
  //   const sheetRef = React.useRef(null);

  function _renderItemAddress({title}) {
    return (
      <View>
        <Space lineH={10} />
        <TitleAddressTitle>{title}</TitleAddressTitle>
        <Space lineH={10} />
        <TitleAddress>{addressSelect?.address?.address1}</TitleAddress>
        <Space lineH={15} />
        <TitleAddressBlue>{'Edit or change address'}</TitleAddressBlue>
        <Space lineH={10} />
        <LineW />
      </View>
    );
  }
  const _fetchData = async (text, type) => {
    const response = await fetch('https://httpbin.org/uuid');
    const {uuid} = await response.json();
    dropDownAlertRef.alertWithType(type, text);
  };
  function nextStep() {
    if (addressSelect.address!=null) {
      navigation.navigate('PaymentScreen_SCREEN');
      bulkAdd(addressSelect.id);
    } else {
      _fetchData('please Add Address', 'error');
    }
  }
  return (
    <>
      <BackgroundView>
        <ScrollView>
          <HeaderScComponent navigation={navigation} title={'My addresses'} />

          <Padding>
            <Space lineH={15} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MyAddress_SCREEN', {type: 'Basket'});
              }}>
              <View style={{flexDirection: 'row'}}>
                <Location size={'medium'} primaryColor={Color.brand.blue} />
                <Space lineW={10} />
                <Text style={{color: Color.brand.blue, fontSize: 18}}>
                  {'Add new address'}
                </Text>
              </View>
            </TouchableOpacity>
            <Space lineH={30} />
            <_renderItemAddress title={'Invoice address'} />
            <Space lineH={15} />
            <_renderItemAddress title={'Delivery address'} />
            <RadioButton
              flexDirection={'column'}
              items={[
                {
                  title: 'Reguler Delivery',
                  description: `Order will be delivered between 3 - 5 business days`,
                  id: 0,
                },
                {
                  title: 'Express Delivery',
                  description: `Place your order before 6 pm and your items will be delivered`,
                  id: 1,
                },
              ]}
              onClick={() => {
                alert('hi');
              }}
            />
            <Space lineH={30} />
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
            <Space lineH={100} />
          </Padding>
        </ScrollView>
        <BottomViewBasket navigation={navigation} onClick={nextStep} />
        <DropdownAlert
          ref={ref => {
            if (ref) {
              dropDownAlertRef = ref;
            }
          }}
        />
      </BackgroundView>
    </>
  );
}
