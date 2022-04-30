import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {ScrollView,TouchableOpacity} from 'react-native';
import {Rating} from 'react-native-elements';
import {Delete, IconlyProvider} from 'react-native-iconly';
import NumberFormat from 'react-number-format';
import {ViewOffer} from '../../components/bottomDetails/style/BottomDetails.style';
import {ViewCenter} from '../../components/coustom/itemWelcome/itemWelcome.style';
import HeaderScComponent from '../../components/header2';
import LineW from '../../components/lineW';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import {AddressContext} from '../../service/Address/Address.context';
import {IMAGE_ADDRESS} from '../../utils/adress.api';
import {
  ImageSuggest,
  TextReviewOffer,
  TextReviewSuggest,
} from '../shop/style/shop.style';

export default function MySave({navigation}) {
  const {saveAddresses,deleteAddressFn} = useContext(AddressContext);

  function _renderItemBasket(item): any {
    return (
      <>
        <View style={{width: `100%`, height: 140, flexDirection: 'row'}}>
          <View>
            <ImageSuggest
              style={{width: 105, height: 88}}
              source={{uri: IMAGE_ADDRESS + item.file}}
            />

            <Space lineH={15} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Rating
                type="custom"
                imageSize={12}
                ratingBackgroundColor={Color.brand.border}
              />
              <Space lineW={10} />
              <Text style={{color: Color.brand.textGrey}}>{'(15 review)'}</Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                color: Color.brand.black,

                fontSize: 18,
                width: `80%`,
              }}>
              {item.name}
            </Text>
            <Space lineH={10} />
            <View style={{flexDirection: 'row'}}>
              <NumberFormat
                value={parseInt(item.prices[0].value).toFixed(2)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={''}
                renderText={(value, props) => {
                  return (
                    <Text
                      style={{
                        color: Color.brand.black,
                        fontSize: 20,
                        width: 100,
                      }}>
                      {value + ' ' + item.prices[0].currency.symbol}
                    </Text>
                  );
                }}
              />
              <ViewOffer style={{width: 40, height: 25}}>
                <Text style={{color: Color.brand.white}}>{'30%'}</Text>
              </ViewOffer>
            </View>

            <Text
              style={{
                textDecorationLine: ' line-through',
                color: Color.brand.textGrey,
                fontSize: 18,
                width: 200,
              }}>
              {'60,0 €'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: 15,
              bottom: 15,
            }}>
            <Delete size={'medium'} primaryColor={`${Color.brand.textGrey}`} />

            <Space lineW={10} />
            <TouchableOpacity
            onPress={()=>{deleteAddressFn(item)}}>
            <Text style={{color: Color.brand.textGrey, fontSize: 14}}>
              {'Delete from list'}
            </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Space lineH={15} />
        <LineW />
        <Space lineH={15} />
      </>
    );
  }
  return (
    <>
      <ScrollView>
        <HeaderScComponent navigation={navigation} title={'My Saved'} />
        <View
          style={{
            width: `100%`,
            height: `100%`,
            paddingLeft: 15,
            paddingRight: 15,
            backgroundColor: Color.brand.white,
          }}>
          <Space lineH={15} />
          {saveAddresses.map(value => {
            return _renderItemBasket(value);
          })}
        </View>
      </ScrollView>
    </>
  );
}
function deleteAddressFn(item: any) {
  throw new Error('Function not implemented.');
}

