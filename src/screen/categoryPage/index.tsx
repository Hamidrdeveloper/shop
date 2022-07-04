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
import styled from 'styled-components';

const TextPrcentOffer = styled(Text)`
  font-size: 12;
  color: ${Color.brand.white};
`;

const ViewPositionRight = styled(View)`
  position: absolute;
  right: 10;
`;

const ViewRowJust = styled(View)`
  flex-direction: row;
`;

const TextTopFilter = styled(Text)`
  font-size: 14;
`;

const TextNameAndCategory = styled(Text)`
  font-size: 16;
`;

const VeiwPostionLine = styled(View)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 90;
  align-self: center;
`;

const ViewOfferPlus = styled(ViewOffer)`
  width: 35;
  height: 21;
  border-bottom-right-radius: 4;
  border-top-right-radius: 4;
  border-top-left-radius: 4;
  left: 10;
  align-items: center;
  justify-content: center;
  background-color: ${Color.brand.red};
`;

const ViewRowPrice = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const ViewImageOffer = styled(View)`
  width: 144;
  height: 350;
  border-radius: 8;
  padding: 5px;
`;
const widthFull = Dimensions.get('screen').width;
export default function CategoryPageScreen({navigation, route}) {
  const [name, setName] = useState(route.params.data.name);
  const {categoryProductsItem, categoryLode,nameCategorySelect} = useContext(ProductContext);
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
            <ViewImageOffer>
              <ImageOffer source={{uri: IMAGE_ADDRESS + item.product.file}} />
              <ViewOffer>
                <Rating imageSize={12} style={{paddingVertical: 10}} />
                <TextReviewOffer>{'(15 review)'}</TextReviewOffer>
              </ViewOffer>
              <Space lineH={5} />
              <TextProductOffer>{item.name}</TextProductOffer>
              <Space lineH={5} />
              <NumberFormat
                value={parseInt(item?.sale_price.value).toFixed(
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
                        '€'}
                    </TextPriceOffer>
                  );
                }}
              />
              <Space lineH={5} />
              <ViewRowPrice>
                <NumberFormat
                  value={parseInt(
                    item?.sale_price.value,
                  ).toFixed(2)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={''}
                  renderText={(value, props) => {
                    return (
                      <TextPriceThroughOffer>
                        {value +
                          ' ' +
                          '€'}
                      </TextPriceThroughOffer>
                    );
                  }}
                />
                <ViewOfferPlus>
                  <TextPrcentOffer>{'30%'}</TextPrcentOffer>
                </ViewOfferPlus>
              </ViewRowPrice>

              <Space lineH={5} />
              <TextPriceUnitOffer>{'Price  unit : 3,522'}</TextPriceUnitOffer>
              <Space lineH={5} />
            </ViewImageOffer>
          </TouchableOpacity>
          <LineW />

          <ViewPositionRight>
            <CheckSaveProduct item={item} />
          </ViewPositionRight>

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
          <ViewRowJust>
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
              <TextTopFilter>{'Filter'}</TextTopFilter>
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
              <TextTopFilter>{nameCategorySelect}</TextTopFilter>
            </HandleEvent>
          </ViewRowJust>
          <Space lineH={30} />
          <ViewRowPrice>
            <TextNameAndCategory>{name}</TextNameAndCategory>
            <TextNameAndCategory>
              {`${categoryProductsItem?.length} Products`}
            </TextNameAndCategory>
          </ViewRowPrice>
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
          <VeiwPostionLine>
            <LineH />
          </VeiwPostionLine>
        </Padding>
        {/* <Indicator isVisible={categoryLode} /> */}
      </ScrollView>
    </Background>
  );
}
