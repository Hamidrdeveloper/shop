import React, { ElementType } from 'react';
import { View } from 'react-native';
import { Dimensions, FlatList, ListRenderItemInfo } from 'react-native';

declare type Props<ItemT=any> = {
  renderItem: any,
    data: ReadonlyArray<ItemT> | null | undefined|any,
    snap:number,
    height:number
}
export default function FlatListSlide({renderItem,data,snap,height}:Props<any>) {
  return <>
     <FlatList
      data={data}
      renderItem={ renderItem}
      horizontal={true}
      numColumns={1}
      showsHorizontalScrollIndicator={false}
      style={{height:height,  flexGrow:0}}
      snapToInterval={Dimensions.get('window').width-snap} 
      snapToAlignment={'center'} 
     />
  </>;
}
