import React, { useContext } from 'react';
import CheckboxTree from 'react-native-checkbox-tree';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {StyleSheet, View, Text} from 'react-native';
import {Color} from '../../infrastructuer/theme/colors.style';
import { BackgroundView, Padding } from '../../css/main.style'
import HeaderScComponent from '../../components/header2';
import { Card } from 'react-native-elements';
import { ProductContext } from '../../service/Products/Product.context';

const recursiveData = [
  {
    shopReportName: 'HamidReza',
    shopCode: '00001',
    shopType: '2',
    shopId: 1,
    title: 'HamidReza',
    childs: [
      {
        shopReportName: 'Name 2',
        shopCode: '00002',
        shopType: '3',
        shopId: 2,
        title: 'Name 2',
        childs: [
          {
            shopReportName: 'Name 3',
            shopCode: '00003',
            shopType: '4',
            shopId: 3,
            title: 'Name 3',
            childs: [
              {
                shopReportName: 'Name 4',
                shopCode: '00004',
                shopType: '4',
                shopId: 4,
                title: 'Name 4',
              },
              {
                shopReportName: 'Name 5',
                shopCode: '00005',
                shopType: '4',
                shopId: 5,
                title: 'Name 5',
                childs: [
                  {
                    shopReportName: 'Name 6',
                    shopCode: '00006',
                    shopType: '4',
                    shopId: 7,
                    title: 'Name 6',
                    childs: [
                      {
                        shopReportName: 'Name 7',
                        shopCode: '00007',
                        shopType: '4',
                        shopId: 7,
                        title: 'Name 7',
                      },
                    ],
                  },
                ],
              },
              {
                shopReportName: 'Name 8',
                shopCode: '00008',
                shopType: '4',
                shopId: 8,
                title: 'Name 8',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    shopReportName: 'HamidReza',
    shopCode: '00001',
    shopType: '2',
    shopId: 1,
    title: 'HamidReza',
    childs: [
      {
        shopReportName: 'Name 2',
        shopCode: '00002',
        shopType: '3',
        shopId: 2,
        title: 'Name 2',
        childs: [
          {
            shopReportName: 'Name 3',
            shopCode: '00003',
            shopType: '4',
            shopId: 3,
            title: 'Name 3',
            childs: [
              {
                shopReportName: 'Name 4',
                shopCode: '00004',
                shopType: '4',
                shopId: 4,
                title: 'Name 4',
              },
              {
                shopReportName: 'Name 5',
                shopCode: '00005',
                shopType: '4',
                shopId: 5,
                title: 'Name 5',
                childs: [
                  {
                    shopReportName: 'Name 6',
                    shopCode: '00006',
                    shopType: '4',
                    shopId: 7,
                    title: 'Name 6',
                    childs: [
                      {
                        shopReportName: 'Name 7',
                        shopCode: '00007',
                        shopType: '4',
                        shopId: 7,
                        title: 'Name 7',
                      },
                    ],
                  },
                ],
              },
              {
                shopReportName: 'Name 8',
                shopCode: '00008',
                shopType: '4',
                shopId: 8,
                title: 'Name 8',
              },
            ],
          },
        ],
      },
    ],
  },
];

function CategoriesFilterScreen({navigation}) {
  
  return (
    <BackgroundView>
    <HeaderScComponent navigation={navigation} title={'Categories'} details={'Delete All filters'}/>
      <CheckboxTree
        data={recursiveData}
        textField="title"
        childField="childs"
        textStyle={{color: 'black'}}
        iconColor="black"
        iconSize={30}
        openIcon={
          <View
            style={{
              borderColor: Color.brand.border,
              borderWidth: 1,
              width: 24,
              height: 24,
              borderRadius: 6,
              alignItems:'center',
              justifyContent:'center'
            }}>
              <View style={{
              backgroundColor: Color.brand.blue,
              width: 20,
              height: 20,
              borderRadius: 6,
              alignItems:'center',
              justifyContent:'center'
            }}>
              <AntDesign name="check" color={Color.brand.white}size={20} />
              </View>
            
          </View>
        }
        closeIcon={
          <View
          style={{
            borderColor: Color.brand.border,
            borderWidth: 1,
            width: 24,
            height: 24,
            borderRadius:6,
            alignItems:'center',
            justifyContent:'center'
          }}
          />
        }
        checkIcon={<View />}
        unCheckIcon={<View />}
        onSelect={item => {
          console.log(`Selected ${item.length} item`);
        }}
      />
      <Card
         containerStyle={{
            height: 70,
            width: `100%`,
            position: 'absolute',
            bottom: 15,
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: Color.brand.white,
          }}>
        <View
            style={{
              height: 50,
              width: `100%`,
              borderRadius: 10,
              alignSelf: 'center',
              justifyContent: 'center',
              borderColor: Color.brand.border,
              borderWidth:1,
              backgroundColor: Color.brand.white,
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 18,
                color: Color.brand.black,
              }}>
              {'View Products'}
            </Text>
          </View>
          </Card>
    </BackgroundView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
  },
  wrapItem: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  text: {
    fontSize: 18,
  },
  iconItem: {
    marginHorizontal: 8,
  },
});
export default CategoriesFilterScreen;
