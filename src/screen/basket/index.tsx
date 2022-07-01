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
  padding:15px;
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
  function RenderPlus({product}) {
    return (
      <>
        <ViewPlus>
          <TouchableOpacity
            onPress={() => {
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
              navigation.navigate('DeliveryAddress_SCREEN', {type: 'Basket'});
            } else {
              setShowPopLogin(true);
            }
          }}>
          <ViewBasket>
            <TextItem style={{color: Color.brand.white}}>{'Next'}</TextItem>
          </ViewBasket>
        </TouchableOpacity>
        <NumberFormat
          value={parseInt(resultPrice).toFixed(2)}
          displayType={'text'}
          thousandSeparator={true}
          prefix={''}
          renderText={(value, props) => {
            return (
              <TextPriceBasketAbsolute>
                {value.substring(0, 8) + ' ' + resultSymbol}
              </TextPriceBasketAbsolute>
            );
          }}
        />
      </ViewBottomDetails>
    );
  }
  function _renderItemBasket({data}) {
    console.log(data);

    return (
      <ItemBasket>
        <View>
          <ImageSuggest source={{uri: IMAGE_ADDRESS + data.product.file}} />
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
            value={parseInt(data?.sale_price.value).toFixed(2)}
            displayType={'text'}
            thousandSeparator={true}
            prefix={''}
            renderText={(value, props) => {
              return (
                <TextPriceBasket>
                  {value +
                    ' ' +
                    data?.sale_price?.price?.currency?.symbol}
                </TextPriceBasket>
              );
            }}
          />
        </ViewCenter>
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
