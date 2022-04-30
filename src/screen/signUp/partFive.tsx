import React from 'react';
import {Image, ScrollView,Text, TextInput, View,TouchableOpacity} from 'react-native';
import {Edit} from 'react-native-iconly';
import {Color} from '../../infrastructuer/theme/colors.style';
import {Space} from '../../infrastructuer/theme/space.style';

export default function PartFive({navigation}) {
  function renderItemPartner() {
    return (
      <>
      <TouchableOpacity
      onPress={()=>{navigation.navigate("PartnerDetailScreen")}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{width: 80, height: 80}}
            source={require('../../assets/image/v3.png')}
          />
          <Space lineW={15} />
          <View>
            <Text style={{fontSize: 17, color: Color.brand.black}}>
              {'Tamara Vazha'}
              <Text style={{fontSize: 12, color: Color.brand.green}}>
                {'   ' + 'Level1'}
              </Text>
            </Text>
            <Text style={{fontSize: 12, color: Color.brand.textGrey}}>
              {'Location: London , England'}
            </Text>
            <Text style={{fontSize: 12, color: Color.brand.textGrey}}>
              {'Number Of Customers : 125 '}
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
      <View style={{height: `100%`}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: `100%`,
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
          {[1, 2, 3, 4, 5].map(() => {
            return renderItemPartner();
          })}
        </ScrollView>
      </View>
    </>
  );
}
