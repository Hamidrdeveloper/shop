import React, { useState } from 'react';
import {Text, TextInput, View} from 'react-native';
import Picker from '../../../components/picker/components/Picker';
import {Color} from '../../../infrastructuer/theme/colors.style';
import {Space} from '../../../infrastructuer/theme/space.style';
export default function Country() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Apple', value: 'apple'},
      {label: 'Banana', value: 'banana'},
    ]);
  return (
    <>
      <View>
        <Text>{'Country'}</Text>
        <Space lineH={10} />
        <Picker
                containerStyle={{width:`100%`}}
                style={{borderColor: Color.brand.border,backgroundColor:Color.brand.f9}}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
              />
      </View>
    </>
  );
}
