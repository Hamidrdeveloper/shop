import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import Picker from '../../../components/picker/components/Picker';
import {Color} from '../../../infrastructuer/theme/colors.style';
import {Space} from '../../../infrastructuer/theme/space.style';
import {useController, UseControllerProps} from 'react-hook-form';
interface PickerProps extends UseControllerProps {
  label: string;
  name: string;
  defaultValue?: string;
  setFormError: Function;
}
export default function Gender(props: PickerProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      id: 1,
    },
    {
      id: 2,
    },
  ]);

  const {name, rules, defaultValue} = props;
  const {field} = useController({name, rules, defaultValue});
  function radioClick(id) {
    setValue(id);
    if (id === 1) {
      field.onChange('man');
    } else {
      field.onChange('female');
    }
  }
  return (
    <>
      <View>
        <Text>{'Gender'}</Text>
        <Space lineH={10} />
        <View
          style={{
            flexDirection: 'row',
            width: 300,
            justifyContent: 'space-around',
          }}>
          {items.map(val => {
            return (
              <View style={{flexDirection: 'row', width: 100}}>
                <TouchableOpacity
                  key={val.id}
                  onPress={() => radioClick(val.id)}>
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 12,
                      borderWidth: val.id == value ? 6 : 1,
                      borderColor:
                        val.id == value ? Color.brand.blue : Color.brand.border,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                  <Space lineW={15} />
                  <Text style={{color: Color.brand.black}}>
                    {val.id == 1 ? 'Male' : 'Female'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
}
