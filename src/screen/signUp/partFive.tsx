import React, {useContext} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {Edit} from 'react-native-iconly';
import Avatar from '../../components/avatar';
import {BackgroundForm, ButtonColor, HandleEvent} from '../../css/main.style';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';
import {PartnerContext} from '../../service/Partner/Partner.context';
import {Partners} from '../../service/Partner/type';
const height = Dimensions.get('screen').height;
export default function PartFive({navigation, onChangeValue}) {
  const {partner, partnerIdFn} = useContext(PartnerContext);
  function onPressPartner(item: Partners) {
    console.log(item.id);

    partnerIdFn(item.id);
    navigation.navigate('PartnerDetailScreen');
  }
  const regex = /(<([^>]+)>)/gi;
  function renderItemPartner({item}): JSX.Element {
    console.log(item);

    return (
      <>
        <TouchableOpacity onPress={() => onPressPartner(item)}>
          <View style={{flexDirection: 'row'}}>
            <Avatar
              styled={{
                width: 80,
                height: 80,
                borderRadius: 80,
                alignSelf: 'center',
              }}
              src={item?.user?.avatar}
            />
            <Space lineW={15} />
            <View>
              <Text style={{fontSize: 17, color: Color.brand.black}}>
                {item?.firstName + ' ' + item?.lastName}
                <Text style={{fontSize: 12, color: Color.brand.green}}>
                  {'   ' + 'Level1'}
                </Text>
              </Text>
              <Text style={{fontSize: 12, color: Color.brand.textGrey}}>
                {item?.address_complete.replace(regex, ', ')}
              </Text>
              <Text style={{fontSize: 12, color: Color.brand.textGrey}}>
                {`Number Of Customers : ${item?.user_id} `}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <Space lineH={20} />
      </>
    );
  }
  return (
    <>
      <BackgroundForm height={height - 300}>
        <View style={{height: '100%'}}>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <Text style={{fontSize: 14, color: Color.brand.black}}>
              {'Your Location : England , London'}
            </Text>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Edit size={20} primaryColor={Color.brand.blue} />
              <Space lineW={5} />
              <Text style={{fontSize: 14, color: Color.brand.blue}}>
                {'Edit'}
              </Text>
            </View>
          </View>
          <Space lineH={20} />
          <FlatList
            keyExtractor={item => item.id}
            data={partner}
            renderItem={renderItemPartner}
            style={{height: 400, flexGrow: 0}}
          />
          {/* </ScrollView> */}
        </View>
      </BackgroundForm>
      <ButtonColor
        onPress={() => {
          onChangeValue();
        }}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 18,
            color: Color.brand.white,
          }}>
          {'Submit'}
        </Text>
      </ButtonColor>
    </>
  );
}
