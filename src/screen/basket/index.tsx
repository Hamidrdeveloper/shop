import React, {useContext, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Rating} from 'react-native-elements';
import {Card} from 'react-native-elements';
import {
  TextItem,
  TextItemOffer,
  ViewBasket,
  ViewBottomDetails,
  ViewDataOffer,
} from '../../components/bottomDetails/style/BottomDetails.style';
import {ViewCenter} from '../../components/coustom/itemWelcome/itemWelcome.style';
import {BackgroundView} from '../../css/main.style';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import {BasketContext} from '../../service/Basket/Basket.context';
import {ImageSuggest} from '../shop/style/shop.style';
import {IMAGE_ADDRESS} from '../../utils/adress.api';
import {
  Delete,
  NumberPlus,
  ViewPlus,
  Plus,
  ItemBasket,
  TextDetailBasket,
  TextPriceBasket,
  TextPriceBasketAbsolute,
  TextDetailBasketBlack,
} from './style/Basket.style';
import NumberFormat from 'react-number-format';
import {AuthContext} from '../../service/Auth/Auth.context';
import PopUpLogin from '../../components/popUpLogin';
import styled from 'styled-components';
const heightFull = Dimensions.get('screen').height;

const ViewBasketHigh = styled(View)`
  width: 100%;

  height: ${heightFull - 140};
`;

const ImageMenu = styled(Image)`
  width: 30;
  height: 30;
`;

const TextBasket = styled(Text)`
  font-size: 18;
  color: ${Color.brand.black};
`;

const MenuView = styled(View)`
  flex-direction: row;
  width: 100%;
  height: 50;
  padding: 15px;
`;

export default function BasketScreen({navigation}) {
  const [number, setNumber] = useState(1);
  const {
    basketsExited,
    resultPrice,
    resultSymbol,
    addToBasket,
    removeToBasket,
    bulkAdd,
  } = useContext(BasketContext);
  const {isLoginOpen} = useContext(AuthContext);
  const [showPopLogin, setShowPopLogin] = useState(false);
  const [showRule, setShowRule] = useState(false);
  function RenderPlus({product}) {
    return (
      <>
        <ViewPlus>
          <TouchableOpacity
            onPress={() => {
              setShowRule(false);
              setNumber(number - 1);
              removeToBasket(product);
            }}>
            <Card
              containerStyle={{
                width: 30,
                height: 30,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Delete source={require('../../assets/image/remove.png')} />
            </Card>
          </TouchableOpacity>
          <NumberPlus>{product.numberBasket}</NumberPlus>
          <TouchableOpacity
            onPress={() => {
              setShowRule(false);
              setNumber(number + 1);
              addToBasket(product);
            }}>
            <Card
              containerStyle={{
                width: 30,
                height: 30,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Plus source={require('../../assets/image/plusBsket.png')} />
            </Card>
          </TouchableOpacity>
        </ViewPlus>
      </>
    );
  }

  function BottomView() {
    return (
      <ViewBottomDetails>
        <TouchableOpacity
          onPress={() => {
            if (isLoginOpen) {
              if (basketsExited.length > 0 && !showRule) {
                navigation.navigate('DeliveryAddress_SCREEN', {type: 'Basket'});
              }
            } else {
              setShowPopLogin(true);
            }
          }}>
          <ViewBasket>
            <TextItem style={{color: Color.brand.white}}>{'Next'}</TextItem>
          </ViewBasket>
        </TouchableOpacity>
        <NumberFormat
          value={resultPrice}
          displayType={'text'}
          decimalScale={2}
          prefix={''}
          renderText={(value, props) => {
            return (
              <TextPriceBasketAbsolute>
                {value.replace('.', ',') + ' ' + resultSymbol}
              </TextPriceBasketAbsolute>
            );
          }}
        />
      </ViewBottomDetails>
    );
  }
  function _renderItemBasket({data}) {
    console.log(data);
    if (data?.min_order_quantity > data?.numberBasket) {
      setShowRule(true);
    }
    if (
      data?.max_order_quantity < data?.numberBasket &&
      data?.max_order_quantity != null
    ) {
      setShowRule(true);
    }
    let imageUrl;
    if (data?.productVariationFiles.length>0) {
      imageUrl = data?.productVariationFiles[0].file;
    } else {
      imageUrl = data?.product?.file;
    }
    return (
      <ItemBasket>
        <View>
          <ImageSuggest source={{uri: IMAGE_ADDRESS + imageUrl}} />
          <RenderPlus product={data} />
        </View>

        <ViewCenter>
          <View style={{height: 110}}>
            <TextDetailBasketBlack>{data.name}</TextDetailBasketBlack>
            <Space lineH={10} />
            <TextDetailBasket>{'2 Litre'}</TextDetailBasket>
            <Space lineH={10} />
            <TextDetailBasket>
              {`Category: ${data.productVariationCategories[0].name}`}
            </TextDetailBasket>
          </View>
          <NumberFormat
            value={data?.sale_price.value}
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={2}
            prefix={''}
            renderText={(value, props) => {
              return (
                <TextPriceBasket>
                  {value.replace('.', ',') + ' ' + '???'}
                </TextPriceBasket>
              );
            }}
          />
        </ViewCenter>
        {data?.max_order_quantity < data?.numberBasket &&
        data?.max_order_quantity != null ? (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 10,
              borderColor: Color.brand.red,
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
            }}>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                height: 25,
                color: Color.brand.red,
              }}>
              {`The maximum purchase of this product is ${data?.min_order_quantity} pieces`}
            </Text>
          </View>
        ) : null}
        {data?.min_order_quantity > data?.numberBasket ? (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 10,
              borderColor: Color.brand.red,
              borderWidth: 1,
              borderRadius: 5,
              padding: 5,
            }}>
            <Text
              style={{
                textAlign: 'center',
                textAlignVertical: 'center',
                height: 25,
                color: Color.brand.red,
              }}>
              {`The minimum purchase of this product is ${data?.min_order_quantity} pieces`}
            </Text>
          </View>
        ) : null}
      </ItemBasket>
    );
  }
  return (
    <>
      <BackgroundView>
        <ViewBasketHigh>
          <ScrollView>
            <MenuView>
              <ImageMenu
                resizeMode="contain"
                source={require('../../assets/image/menu.png')}
              />
              <Space lineW={'5%'} />
              <TextBasket>{'Basket'}</TextBasket>
            </MenuView>
            {basketsExited.map(data => {
              return <_renderItemBasket data={data} />;
            })}
            <Space lineH={50} />
          </ScrollView>
        </ViewBasketHigh>
        <BottomView />
        <PopUpLogin
          onClick={() => setShowPopLogin(false)}
          onClose={() => setShowPopLogin(false)}
          isVisible={showPopLogin}
          navigation={navigation}
        />
      </BackgroundView>
    </>
  );
}
