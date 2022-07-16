import React, {useContext, useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import NumberFormat from 'react-number-format';
import HeaderScComponent from '../../components/header2';
import LineW from '../../components/lineW';
import {BackgroundView, Padding} from '../../css/main.style';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import {BasketContext} from '../../service/Basket/Basket.context';
import {IMAGE_ADDRESS} from '../../utils/adress.api';
import {regexHtml} from '../../utils/main';
import {
  BoxNotValid,
  BoxValid,
  BoxValidBold,
  ButtonGrayItem,
  ButtonPoreItem,
  Center,
  ImageItemShop,
  ImageNotValid,
  ImageValid,
  ImageValidBold,
  LineNotValid,
  LineValid,
  TextBlack,
  TextBlackCenter,
  TextBlue,
  TextGray,
  TextGreen,
  TextPore,
  TextRed,
  ViewRow,
  ViewRowItem,
} from './style/orderDetails.style';

export default function OrderDetails({navigation, route}) {
  const [indexProcess, setIndexProcess] = useState(
    route.params.product.order_status_id,
  );
  const {addToBasket} = useContext(BasketContext);

  const [products, setProducts] = useState(route.params.product);
  const [total, setTotal] = useState('0');
  let arrayProcess = [
    {id: 1, image: require('../../assets/image/factororder.png')},
    {id: 3, image: require('../../assets/image/chatchorder.png')},
    {id: 4, image: require('../../assets/image/kargo.png')},
    {id: 4, image: require('../../assets/image/basketorder.png')},
    {id: 5, image: require('../../assets/image/barorder.png')},
    {id: 6, image: require('../../assets/image/carorder.png')},
  ];
  useEffect(() => {
    totalPrice();
  }, [products]);
  function totalPrice() {
    products.orderSalePositions.forEach(element => {
      setTotal(total + element?.price_value);
    });
  }

  
  function Process() {
    return (
      <>
        <ViewRow>
          <TextGreen>{'Stuck checking'}</TextGreen>
          {/* <TouchableOpacity
            onPress={() => {
              navigation.navigate('ReturnBackProduct');
            }}>
            <TextBlue>{'View details'}</TextBlue>
          </TouchableOpacity> */}
        </ViewRow>
        <Space lineH={20} />
        <ViewRow>
          {arrayProcess.map((value, index) => {
            return (
              <Center>
                {indexProcess >= value.id ? (
                  <>
                    {indexProcess == value.id ? (
                      <BoxValidBold>
                        <ImageValidBold source={value.image} />
                      </BoxValidBold>
                    ) : (
                      <BoxValid>
                        <ImageValid source={value.image} />
                      </BoxValid>
                    )}
                  </>
                ) : (
                  <>
                    <BoxNotValid>
                      <ImageNotValid source={value.image} />
                    </BoxNotValid>
                  </>
                )}
                {indexProcess > value.id ? <LineValid /> : <LineNotValid />}
              </Center>
            );
          })}
        </ViewRow>
      </>
    );
  }

  function renderItemShop(item) {
    console.log('renderItemShop', item);

    return (
      <>
        <ViewRowItem>
          <ImageItemShop
            source={{
              uri: IMAGE_ADDRESS + item?.productVariation?.product?.file,
            }}
            resizeMode={'contain'}
          />
          <Space lineW={15} />
          <View>
            <Space lineH={10} />
            <TextBlack>{item?.productVariation?.product?.name}</TextBlack>
            <Space lineH={10} />
            <TextGray>
              {'Category:' +
                item?.productVariation?.product?.productCategories[0].name}
            </TextGray>
            <Space lineH={10} />
            <ViewRowItem>
              <NumberFormat
                value={item?.price_value}
                displayType={'text'}
                thousandSeparator={true}
                prefix={''}
                decimalScale={2}
                renderText={(value, props) => {
                  return <TextGray>{value + ' '}</TextGray>;
                }}
              />
              <Space lineW={40} />
              <TextGray>
                {'Number : ' + item?.productVariation?.product?.number}
              </TextGray>
            </ViewRowItem>
          </View>
        </ViewRowItem>
        <Space lineH={10} />
        <ViewRow>
          <ButtonGrayItem>
            <TextBlackCenter>{'Rate & Review'}</TextBlackCenter>
          </ButtonGrayItem>
          {/* <ButtonPoreItem
            onPress={() => {
              addToBasket({...item, sale_price: item?.price_value});
            }}>
            <TextPore>{'Buy again'}</TextPore>
          </ButtonPoreItem> */}
        </ViewRow>
        <Space lineH={20} />
        <LineW />
      </>
    );
  }
  return (
    <BackgroundView>
      <ScrollView>
        <HeaderScComponent
          navigation={navigation}
          details={''}
          isProduct={false}
          IsText={false}
          title={'Order Detail'}
        />
        <Padding>
          <ViewRow>
            <TextGray>{'Order No. : '}</TextGray>
            <TextBlack>{`# ${products.number}`}</TextBlack>
          </ViewRow>
          <Space lineH={10} />
          <ViewRow>
            <TextGray>{'Order date. :'}</TextGray>
            <TextBlack>
              {' '}
              {new Date(products.order_date).toUTCString().toString()}
            </TextBlack>
          </ViewRow>
          <Space lineH={30} />
          <ViewRow>
            <TextGray>{'Transferee :'}</TextGray>
            <TextBlack>
              {products.user.person.first_name +
                ' ' +
                products.user.person.last_name}
            </TextBlack>
          </ViewRow>
          {/* <Space lineH={10} /> */}
          {/* <ViewRow>
            <TextGray>{'Mobile : '}</TextGray>
            <TextBlack>{"+989383051033"}</TextBlack>
          </ViewRow> */}
          <Space lineH={10} />
          <View>
            <TextGray>{'Delivery address: '}</TextGray>
            <Space lineH={10} />
            <TextBlack numberOfLines={2}>
              {products.deliveryContactGroup.address.address_complete.replace(
                regexHtml,
                ', ',
              )}
            </TextBlack>
          </View>
          <Space lineH={10} />
          <View>
            <TextGray>{'Invoice address: '}</TextGray>
            <Space lineH={10} />
            <TextBlack numberOfLines={2}>
              {products.invoiceContactGroup.address.address_complete.replace(
                regexHtml,
                ', ',
              )}
            </TextBlack>
          </View>
          <Space lineH={40} />
          <Process />
          <Space lineH={20} />
          {/* <ViewRow>
            <TextGray>{'Shipping : '}</TextGray>
            <TextBlack>{'10.5 €'}</TextBlack>
          </ViewRow>
          <Space lineH={10} />
          <ViewRow>
            <TextGray>{'Total Payment :'}</TextGray>
            <TextBlack>{'210.5 €'}</TextBlack>
          </ViewRow> */}
          <Space lineH={10} />
          <LineW />
          <Space lineH={10} />
          {products.orderSalePositions.map(item => {
            return renderItemShop(item);
          })}
          <Space lineH={30} />
          <ViewRow>
            <TextGray>{'Total Net'}</TextGray>
            <TextBlack>{products?.total_net_amount + ' €'}</TextBlack>
          </ViewRow>
          <Space lineH={10} />
          <ViewRow>
            <TextGray>{'VAT'}</TextGray>
            <TextRed>{products?.total_vat_amount + ' €'}</TextRed>
          </ViewRow>
          <Space lineH={15} />
          <ViewRow>
            <TextBlack>{'Sub Total'}</TextBlack>
            <TextBlack>{products?.total_price + ' €'}</TextBlack>
          </ViewRow>
          <Space lineH={10} />
          <LineW />
          {/* <Space lineH={10} />
          <ViewRow>
            <TextGray>{'Shipping'}</TextGray>
            <TextBlack>{'29 €'}</TextBlack>
          </ViewRow> */}
          <Space lineH={10} />
          <ViewRow>
            <TextBlack>{'Total Price'}</TextBlack>
            <TextBlack>{products?.total_price + ' €'}</TextBlack>
          </ViewRow>
        </Padding>
      </ScrollView>
    </BackgroundView>
  );
}
