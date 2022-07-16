import React, {useContext, useEffect, useState} from 'react';
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
  const [orders, setOrders] = useState(listOrderSale);
  const [search, setSearch] = useState('');
  const debouncedSearchTerm = useDebounce(search, 2000);
  useEffect(() => {
    setOrders(listOrderSale);
  }, [listOrderSale]);
  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
          searchProduct(value);
        }, delay);

        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay], // Only re-call effect if value or delay changes
    );

    return debouncedValue;
  }
  const updateSearch = (text: React.SetStateAction<string>) => {
    setSearch(text);
  };
  function searchProduct(text: string) {
    if (text == '' && listOrderSale.length > 0) {
      setOrders(listOrderSale);
    } else {
      const find = listOrderSale?.filter(el => {
        console.log('==============listOrderSale======================');
        console.log(
          Object.values(el).some(val =>
            String(val).toLowerCase().includes(text),
          ),
        );
        console.log('===============listOrderSale=====================');
        if (
          Object.values(el).some(val =>
            String(val).toLowerCase().includes(text),
          )
        ) {
          return Object.values(el).some(val =>
            String(val).toLowerCase().includes(text),
          );
        } else {
          const child = el?.orderSalePositions?.filter(xl => {
            if (xl?.productVariation != null) {
              console.log('====================================');
              console.log(
                Object.values(xl?.productVariation).some(val =>
                  String(val).toLowerCase().includes(text),
                ),
              );
              console.log('====================================');
              return Object.values(xl.productVariation).some(val =>
                String(val).toLowerCase().includes(text),
              );
            } else {
              return false;
            }
          });
          
          if (child.length>0) {
            return true;
          } else {
            return false;
          }
        }
      });

      setOrders(find);
    }
  }
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
              backgroundColor: Color.brand.blue,
              borderRadius: 15,
              height: 25,
              width: 180,
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
              value={item.total_price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={''}
              decimalScale={2}
              renderText={(value, props) => {
                return (
                  <Text style={{fontSize: 14, color: Color.brand.black}}>
                    {value?.replace('.', ',') + ' ' + '€'}
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
          <TouchableOpacity>
            <View
              style={{
                width: 162,
                height: 40,
                borderColor: Color.brand.border,
                borderWidth: 0,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Text style={{color: Color.brand.textGrey, fontSize: 14}}>
                {'View detail'}
              </Text> */}
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
          {orders.map(value => {
            return RenderListItem(value);
          })}
          {orders.length == 0 ? (
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
