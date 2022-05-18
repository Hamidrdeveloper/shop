import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {Rating, Card} from 'react-native-elements';
import NumberFormat from 'react-number-format';
import BottomDetails from '../../components/bottomDetails';
import HeaderComponent from '../../components/header';
import InputSymbol from '../../components/inputSymbol';
import {AppIntroSlider} from '../../components/introSlide';
import LineW from '../../components/lineW';
import Picker from '../../components/picker/components/Picker';
import FlatListSlide from '../../components/slideList';
import {BackgroundView} from '../../css/main.style';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import {CommentContext} from '../../service/Comment/Comment.context';
import {ProductContext} from '../../service/Products/Product.context';
import {IMAGE_ADDRESS} from '../../utils/adress.api';
import {
  ImageOffer,
  TextPriceOffer,
  TextPriceThroughOffer,
  TextPriceUnitOffer,
  TextProductOffer,
  ViewOffer,
} from '../shop/style/shop.style';
import {ItemImage} from './itemImage';
import PaginationCostume from './paginationCostume';
import {
  TextReviewOffer,
  TitleStep,
  ViewRate,
} from './style/DetailsProduct.styles';
import {TabShop} from './tabShop';

export default function DetailsProduct({navigation, route}) {
  const [product, setProduct] = useState(route.params.data);
  const imageConst = [{file: product.file}];
  const {productByID, relatedProductsItem} = useContext(ProductContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  function offerItem({item}) {
    return (
      <>
        <Card
          containerStyle={{
            width: 180,
            height: 280,
            margin: 8,
            borderRadius: 8,
            padding: 5,
          }}>
          <ImageOffer source={{uri: IMAGE_ADDRESS + item.file}} />
          <ViewOffer>
            <Rating imageSize={12} style={{paddingVertical: 10}} />
            <TextReviewOffer>{'(15 review)'}</TextReviewOffer>
          </ViewOffer>
          <Space lineH={5} />
          <TextProductOffer>{item.name}</TextProductOffer>
          <Space lineH={5} />
          <NumberFormat
            value={parseInt(item?.prices[0].value).toFixed(2)}
            displayType={'text'}
            thousandSeparator={true}
            prefix={''}
            renderText={(value, props) => {
              return (
                <TextPriceThroughOffer>
                  {value + ' ' + item?.prices[0].currency.symbol}
                </TextPriceThroughOffer>
              );
            }}
          />
          <Space lineH={5} />
          <NumberFormat
            value={parseInt(item?.prices[0].value).toFixed(2)}
            displayType={'text'}
            thousandSeparator={true}
            prefix={''}
            renderText={(value, props) => {
              return (
                <TextPriceOffer>
                  {value + ' ' + item?.prices[0].currency.symbol}
                </TextPriceOffer>
              );
            }}
          />
          <Space lineH={5} />
          <TextPriceUnitOffer>{'Price  unit : 3,522'}</TextPriceUnitOffer>
          <Space lineH={5} />
        </Card>
      </>
    );
  }
  function paginationCostume(i: number) {
    return (
      <>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {productByID?.productVariationFiles?.map((t, index) => {
            if (index != productByID?.productVariationFiles?.length) {
              return (
                <View
                  style={{
                    backgroundColor:
                      index == i
                        ? Color.brand.colorButton
                        : Color.brand.gryDLight,
                    marginLeft: 3,
                    borderRadius: index == i ? 35 : 12,
                    height: 12,
                    width: index == i ? 35 : 12,
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: index == i ? 0.8 : 0,
                    shadowRadius: index == i ? 2 : 0,
                    elevation: index == i ? 5 : 0,
                  }}
                />
              );
            }
          })}
        </View>
      </>
    );
  }

  return (
    <>
      <ScrollView>
        <BackgroundView>
          <HeaderComponent navigation={navigation} />
          <AppIntroSlider
            containerStyle={{
              width: `100%`,
              height: 280,
              backgroundColor: Color.brand.white,
            }}
            onSlideChange={newIndex => {
              //   console.log('newIndex', newIndex);
              //   setSlideIndex(newIndex);
            }}
            renderPagination={paginationCostume}
            renderItem={({item}) => ItemImage(item)}
            data={
              productByID?.productVariationFiles.length == 0
                ? imageConst
                : productByID?.productVariationFiles
            }
          />
          <View style={{height: '100%', paddingLeft: 15, paddingRight: 15}}>
            <TitleStep>{product.name}</TitleStep>
            <ViewRate>
              <Rating imageSize={18} style={{paddingVertical: 10}} />
              <Space lineW={10} />
              <TextReviewOffer>{'3.8'}</TextReviewOffer>
              <Space lineW={10} />
              <TextReviewOffer>{'(15 review)'}</TextReviewOffer>
            </ViewRate>
            <Space lineH={10} />
            <LineW />
            <Space lineH={15} />
            <ViewRate>
              <Text style={{fontSize: 18, color: Color.brand.black}}>
                {'Size :'}
              </Text>
              <Space lineW={40} />
              <InputSymbol
                containerStyle={{width: 100}}
                symbol={'CC'}
                onChange={() => {}}
              />
              <Space lineW={20} />
              <InputSymbol
                containerStyle={{width: 100}}
                symbol={'CC'}
                onChange={() => {}}
              />
            </ViewRate>
            <Space lineH={15} />
            <ViewRate>
              <Text style={{fontSize: 18, color: Color.brand.black}}>
                {'Option :'}
              </Text>
              <Space lineW={20} />
              <Picker
                containerStyle={{width: 220}}
                style={{borderColor: Color.brand.border}}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
            </ViewRate>
            <Space lineH={15} />
            <View style={{height: 400}}>
              <TabShop product={product} />
            </View>
            <TitleStep>{'Related Products'}</TitleStep>
            <Space lineH={15} />
            <FlatListSlide
              data={relatedProductsItem}
              renderItem={offerItem}
              snap={5}
              height={400}
            />
          </View>
        </BackgroundView>
      </ScrollView>
      <BottomDetails item={product} />
    </>
  );
}
