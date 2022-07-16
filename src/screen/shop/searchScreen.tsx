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
import LineH from '../../components/lineH';
import LineW from '../../components/lineW';
import Indicator from '../../components/lodging/indicator';
import {Padding} from '../../css/main.style';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import {BasketContext} from '../../service/Basket/Basket.context';
import { CommentContext } from '../../service/Comment/Comment.context';
import { goToScreenDetails } from '../../service/Products/Product.action';
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
export default function SearchPageScreen({
  value,
  onChange,
  onShow,
  navigation,
}) {
  const {
    categoryProductsItem,
    categoryLode,
    productByIdFn,
    relatedProductsFn,
  } = useContext(ProductContext);
  const {addToBasket} = useContext(BasketContext);
  const {getAllCommentIdFn} = useContext(CommentContext);

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
    let imageUrl;
    if (item?.productVariationFiles.length>0) {
      imageUrl = item?.productVariationFiles[0].file;
    } else {
      imageUrl = item?.product?.file;
    }
    return (
      <>
        <View style={{width: widthFull / 2}}>
          <TouchableOpacity
            onPress={() => {
              goToScreenDetails(
                navigation,
                item,
                productByIdFn,
                getAllCommentIdFn,
                relatedProductsFn,
              );
            }}>
            <View
              style={{
                width: 144,
                height: 280,
                borderRadius: 8,
                padding: 5,
              }}>
              <ImageOffer source={{uri: IMAGE_ADDRESS + imageUrl}} />
              <ViewOffer>
                <Rating
                  imageSize={12}
                  ratingCount={5}
                  readonly
                  startingValue={0}
                  style={{paddingVertical: 10}}
                />
                <TextReviewOffer>{`(${
                  item?.review_count == null ? 0 : item?.review_count
                } view)`}</TextReviewOffer>
              </ViewOffer>
              <Space lineH={5} />
              <TextProductOffer>{item.name}</TextProductOffer>
              <Space lineH={5} />
              <NumberFormat
                value={item?.sale_price.value}
                displayType={'text'}
                thousandSeparator={true}
                decimalScale={2}
                prefix={''}
                renderText={(value, props) => {
                  return (
                    <TextPriceOffer>
                      {value?.replace('.', ',') + ' ' + '€'}
                    </TextPriceOffer>
                  );
                }}
              />
              {/* <Space lineH={5} /> */}
              {/* <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <NumberFormat
                  value={parseInt(item?.sale_price.value)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={''}
                  renderText={(value, props) => {
                    return (
                      <TextPriceThroughOffer>
                        {value + ' ' + '€'}
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
              </View> */}

              <Space lineH={5} />
              {/* <TextPriceUnitOffer>{'Price  unit : 3,522'}</TextPriceUnitOffer>
              <Space lineH={5} /> */}
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
          onChangeText={value => onChange(value)}
          value={value}
          searchIcon={() => (
            <ArrowLeft
              size={'medium'}
              primaryColor={Color.brand.textGrey}
              onPress={() => onShow()}
            />
          )}
        />
        <Padding>
          <View style={{flexDirection: 'row'}}>
            <Filter size={'medium'} primaryColor={Color.brand.black} />
            <Space lineW={10} />
            <Text style={{color: Color.brand.black, fontSize: 14}}>
              {'Filter'}
            </Text>
            <Space lineW={30} />
            <Swap size={'medium'} primaryColor={Color.brand.black} />
            <Space lineW={10} />
            <Text style={{color: Color.brand.black, fontSize: 14}}>
              {'Popular'}
            </Text>
          </View>
          <Space lineH={30} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: Color.brand.textGry, fontSize: 16}}>{''}</Text>
            <Text style={{color: Color.brand.textGry, fontSize: 16}}>
              {`${categoryProductsItem?.length} Products`}
            </Text>
          </View>
          <FlatList
            keyExtractor={index => index}
            data={categoryProductsItem}
            renderItem={CategoryProductItem}
            numColumns={2}
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
        <Indicator isVisible={categoryLode} />
        <Space lineH={50} />
      </ScrollView>
    </Background>
  );
}
