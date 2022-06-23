
import {Dimensions, FlatList, Text} from 'react-native';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-elements';
import NumberFormat from 'react-number-format';
import {Space} from '../../infrastructuer/theme/space.style';
import {
  ButtonCategoryAddTo,
  ImageOffer,
  LabelButton,
  TextPriceOffer,
  TextPriceThroughOffer,
  TextPriceUnitOffer,
  TextProductOffer,
  TextReviewOffer,
  TitleStep,
  ViewOffer,
} from '../shop/style/shop.style';
import {CheckSaveProduct} from '../../components/checkSaveProduct';
import {BasketContext} from '../../service/Basket/Basket.context';
import {ProductContext} from '../../service/Products/Product.context';
import {IMAGE_ADDRESS} from '../../utils/adress.api';
import LineH from '../../components/lineH';
import LineW from '../../components/lineW';
import {ArrowLeft, Filter, Heart, Search, Swap} from 'react-native-iconly';
import React,{useContext} from 'react';
import {Color} from '../../infrastructuer/theme/colors.style';

const widthFull = Dimensions.get('screen').width;

export function RelatedProductItem({navigation}) {
  const {productsItem} = useContext(ProductContext);
  const {addToBasket} = useContext(BasketContext);
  function _renderItem({item}) {
    return (
      <>
        <View style={{width: widthFull / 2}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Details_SCREEN');
            }}>
            <View
              style={{
                width: 144,
                height: 350,
                borderRadius: 8,
                padding: 5,
              }}>
              <ImageOffer source={{uri: IMAGE_ADDRESS + item.product.file}} />
              <ViewOffer>
                <Rating imageSize={12} style={{paddingVertical: 10}} />
                <TextReviewOffer>{'(15 review)'}</TextReviewOffer>
              </ViewOffer>
              <Space lineH={5} />
              <TextProductOffer>{item.name}</TextProductOffer>
              <Space lineH={5} />
              <NumberFormat
                value={parseInt(item?.productVariationPrices[0].value).toFixed(2)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={''}
                renderText={(value, props) => {
                  return (
                    <TextPriceOffer>
                      {value + ' ' + item?.productVariationPrices[0].price.currency.symbol}
                    </TextPriceOffer>
                  );
                }}
              />
              <Space lineH={5} />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <NumberFormat
                  value={parseInt(item?.productVariationPrices[0].value).toFixed(2)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={''}
                  renderText={(value, props) => {
                    return (
                      <TextPriceThroughOffer>
                        {value + ' ' + item?.productVariationPrices[0].price.currency.symbol}
                      </TextPriceThroughOffer>
                    );
                  }}
                />
                <ViewOffer
                  style={{
                    backgroundColor: Color.brand.red,
                    width: 35,
                    height: 21,
                    borderBottomRightRadius: 4,
                    borderTopRightRadius: 4,
                    borderTopLeftRadius: 4,
                    left: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: Color.brand.white, fontSize: 12}}>
                    {'30%'}
                  </Text>
                </ViewOffer>
              </View>

              <Space lineH={5} />
              <TextPriceUnitOffer>{'Price  unit : 3,522'}</TextPriceUnitOffer>
              <Space lineH={5} />
            </View>
          </TouchableOpacity>
          <LineW />

          <View style={{position: 'absolute', right: 10}}>
            <CheckSaveProduct item={item} />
          </View>

          <ButtonCategoryAddTo
            onPress={() => {
              addToBasket(item);
            }}>
            <LabelButton>{'Add to basket'}</LabelButton>
          </ButtonCategoryAddTo>
        </View>
      </>
    );
  }
  return (
    <>
     <Space lineH={50} />
        <TitleStep>{'Offers for you'}</TitleStep>
        <Space lineH={25} />
      <FlatList
            keyExtractor={index => index}
            data={productsItem}
            renderItem={_renderItem}
            numColumns={2}
            initialNumToRender={5}
            windowSize={5}
          />
    </>
  );
}
