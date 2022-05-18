import React, {useContext, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native';
import {Card, Rating} from 'react-native-elements';
import {ArrowLeft, Filter, Heart, Search, Swap} from 'react-native-iconly';
import NumberFormat from 'react-number-format';
import {CheckSaveProduct} from '../../components/checkSaveProduct';
import FlatListCustom from '../../components/flatListCoustom';
import LineH from '../../components/lineH';
import LineW from '../../components/lineW';
import Indicator from '../../components/lodging/indicator';
import {HandleEvent, Padding} from '../../css/main.style';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import {BasketContext} from '../../service/Basket/Basket.context';
import {ProductContext} from '../../service/Products/Product.context';
import {IMAGE_ADDRESS} from '../../utils/adress.api';
import {
  Background,
  ButtonAddTo,
  ButtonCategoryAddTo,
  ImageOffer,
  LabelButton,
  SearchView,
  TextPriceOffer,
  TextPriceThroughOffer,
  TextPriceUnitOffer,
  TextProductOffer,
  TextReviewOffer,
  ViewOffer,
} from '../shop/style/shop.style';
const widthFull = Dimensions.get('screen').width;
export default function CategoryPageScreen({navigation, route}) {
  const [name, setName] = useState(route.params.data.name);
  const {categoryProductsItem, categoryLode} = useContext(ProductContext);
  const {addToBasket} = useContext(BasketContext);

  const [dataCategory, setDataCategory] = useState([
    {data: {flag: false}},
    {data: {flag: false}},
    {data: {flag: false}},
    {data: {flag: false}},
    {data: {flag: false}},
  ]);

  function _onPressHeart(index) {
    let value = [...dataCategory];
    value[index].data.flag = !value[index].data.flag;
    setDataCategory([]);
    setDataCategory(value);
  }
  function CategoryProductItem({item}) {
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
              <ImageOffer
               
                source={{uri: IMAGE_ADDRESS + item.product.file}}
              />
              <ViewOffer>
                <Rating imageSize={12} style={{paddingVertical: 10}} />
                <TextReviewOffer>{'(15 review)'}</TextReviewOffer>
              </ViewOffer>
              <Space lineH={5} />
              <TextProductOffer>{item.name}</TextProductOffer>
              <Space lineH={5} />
              <NumberFormat
                value={parseInt(item?.productVariationPrices[0].value).toFixed(
                  2,
                )}
                displayType={'text'}
                thousandSeparator={true}
                prefix={''}
                renderText={(value, props) => {
                  return (
                    <TextPriceOffer>
                      {value +
                        ' ' +
                        item?.productVariationPrices[0].price.currency.symbol}
                    </TextPriceOffer>
                  );
                }}
              />
              <Space lineH={5} />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <NumberFormat
                  value={parseInt(
                    item?.productVariationPrices[0].value,
                  ).toFixed(2)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={''}
                  renderText={(value, props) => {
                    return (
                      <TextPriceThroughOffer>
                        {value +
                          ' ' +
                          item?.productVariationPrices[0].price.symbol}
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
    <Background>
      <ScrollView>
        <Space lineH={35} />
        <SearchView
          placeholder="Search On Cleaning"
          searchIcon={() => (
            <ArrowLeft size={'medium'} primaryColor={Color.brand.textGrey} />
          )}
        />
        <Padding>
          <View style={{flexDirection: 'row'}}>
            <Filter
              size={'medium'}
              onPress={() => {
                navigation.navigate('FilterScreen');
              }}
              primaryColor={Color.brand.black}
            />
            <Space lineW={10} />
            <HandleEvent
              onPress={() => {
                navigation.navigate('FilterScreen');
              }}>
              <Text style={{color: Color.brand.black, fontSize: 14}}>
                {'Filter'}
              </Text>
            </HandleEvent>
            <Space lineW={30} />
            <Swap
              size={'medium'}
              onPress={() => {
                navigation.navigate('SortScreen');
              }}
              primaryColor={Color.brand.black}
            />
            <Space lineW={10} />
            <HandleEvent
              onPress={() => {
                navigation.navigate('SortScreen');
              }}>
              <Text style={{color: Color.brand.black, fontSize: 14}}>
                {'Popular'}
              </Text>
            </HandleEvent>
          </View>
          <Space lineH={30} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: Color.brand.textGry, fontSize: 16}}>
              {name}
            </Text>
            <Text style={{color: Color.brand.textGry, fontSize: 16}}>
              {`${categoryProductsItem?.length} Products`}
            </Text>
          </View>
          <FlatListCustom
            data={categoryProductsItem}
            renderItem={CategoryProductItem}
            numColumns={2}
            isLoading={categoryLode}
            initialNumToRender={5}
            windowSize={5}
          />
          {/* {[1,2,3,4,5,6,7,8,9,10,11].map(()=>{
            return
        })} */}
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 90,
              alignSelf: 'center',
            }}>
            <LineH />
          </View>
        </Padding>
        {/* <Indicator isVisible={categoryLode} /> */}
      </ScrollView>
    </Background>
  );
}
