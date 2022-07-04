import React, {useContext, useState} from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import RenderListItem from '../../components/picker/components/RenderListItem';
import {BackgroundView, Padding} from '../../css/main.style';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import {SearchView} from '../shop/style/shop.style';
const widthFull = Dimensions.get('window').width;
import styled from 'styled-components';
import {BasketContext} from '../../service/Basket/Basket.context';
import NumberFormat from 'react-number-format';
import {IMAGE_ADDRESS} from '../../utils/adress.api';
import {RelatedProductItem} from './realted';
import {ViewRow} from '../orderDetails/style/orderDetails.style';

export default function ProcessingView({navigation}) {
  const {listOrderSale} = useContext(BasketContext);

  const [search, setSearch] = useState('');
  const updateSearch = (text: React.SetStateAction<string>) => {
    setSearch(text);
  };
  function RenderListItem(item) {
    console.log('order-sale', item);
    {
      /* <View
              style={{
                borderWidth: 1,
                borderColor: Color.brand.colorButton,
                borderRadius: 8,
              }}>
              <Text style={{fontSize: 14, color: Color.brand.textGrey}}>
                {'Order No. :#'}
              </Text>
            </View> */
    }
    return (
      <>
        <ViewRow>
          <Text>
            <Text style={{fontSize: 14, color: Color.brand.textGrey}}>
              {'Order No. :#'}
            </Text>
            <Text style={{fontSize: 14, color: Color.brand.black}}>
              {item?.orderSalePositions.length > 0
                ? item?.orderSalePositions[0].order_sale_id
                : '0'}
            </Text>
          </Text>
          <View
            style={{
              backgroundColor: Color.brand.colorButton,
              borderRadius: 15,
              height: 30,
              width: 120,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 14, color: Color.brand.white}}>
              {'Waiting For Payment'}
            </Text>
          </View>
        </ViewRow>
        <Space lineH={15} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text>
            <Text style={{fontSize: 14, color: Color.brand.textGrey}}>
              {'Payment :'}
            </Text>
            <NumberFormat
              value={parseInt(item.total_price).toFixed(2)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={''}
              renderText={(value, props) => {
                return (
                  <Text style={{fontSize: 14, color: Color.brand.black}}>
                    {value + ' ' + '€'}
                  </Text>
                );
              }}
            />
          </Text>
          <Text>
            <Text style={{fontSize: 12, color: Color.brand.textGrey}}>
              {'Order Date :'}
            </Text>
            <Text style={{fontSize: 12, color: Color.brand.black}}>
              {new Date(item.order_date).toUTCString().toString()}
            </Text>
          </Text>
        </View>
        <Space lineH={10} />
        <View
          style={{
            flexDirection: 'row',

            width: '100%',
          }}>
          {item.orderSalePositions.map((value, index) => {
            if (index < 4) {
              return (
                <>
                  <View
                    style={{
                      width: 58,
                      height: 58,
                      borderColor: Color.brand.gryLight,
                      borderWidth: 1,
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {index < 3 ? (
                      <Image
                        style={{height: 48, width: 35}}
                        source={{
                          uri:
                            IMAGE_ADDRESS +
                            value.productVariation?.product?.file,
                        }}
                      />
                    ) : (
                      <Text style={{fontSize: 14, color: Color.brand.black}}>
                        {'+3'}
                      </Text>
                    )}
                  </View>
                  <Space lineW={5} />
                </>
              );
            }
          })}
        </View>
        <Space lineH={15} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('OrderDetails', {product: item});
            }}>
            <View
              style={{
                width: 162,
                height: 40,
                borderColor: Color.brand.border,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: Color.brand.textGrey, fontSize: 14}}>
                {'View detail'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('OrderDetails', {product: item});
            }}>
            <View
              style={{
                width: 165,
                height: 40,
                borderColor: Color.brand.colorButton,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: Color.brand.colorButton, fontSize: 14}}>
                {'View detail'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Space lineH={30} />
      </>
    );
  }
  const ViewEmpty = styled(View)`
  width:100%;
  height:100;
  border:3px dashed  #f00;
  border-color:${Color.brand.blue}
  justify-content:center;
  align-items:center;

  `;
  const TextEmpty = styled(Text)`
    color: ${Color.brand.black};
    font-size: 16;
  `;
  return (
    <>
      <View style={{width: widthFull}}>
        <SearchView
          placeholder="Search On Cleaning"
          searchIcon={() => <Icon color={'gry'} size={30} name="search1" />}
          onChangeText={(e: any) => updateSearch(e)}
          value={search}
        />
        <Space lineH={15} />
        <Padding>
          {listOrderSale.map(value => {
            return RenderListItem(value);
          })}
          {listOrderSale.length == 0 ? (
            <>
              <ViewEmpty>
                <TextEmpty>{'There is no Processing order!'}</TextEmpty>
              </ViewEmpty>
              <RelatedProductItem navigation={navigation} />
            </>
          ) : null}
        </Padding>
      </View>
    </>
  );
}
