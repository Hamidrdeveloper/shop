import React, {useContext, useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import Picker from '../../../components/picker/components/Picker';
import {Color} from '../../../infrastructuer/theme/colors.style';
import {Space} from '../../../infrastructuer/theme/space.style';
import {AuthContext} from '../../../service/Auth/Auth.context';
import {useController, UseControllerProps} from 'react-hook-form';
interface PickerProps extends UseControllerProps {
  label: string;
  name: string;
  defaultValue?: string;
  setFormError: Function;
}
export default function Language(props: PickerProps) {
  const {language} = useContext(AuthContext);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [valueLanguage, setValueLanguage] = useState(null);
  const {name, rules, defaultValue} = props;
  const {field} = useController({name, rules, defaultValue});
  useEffect(() => {
    if (valueLanguage) {
      field.onChange(valueLanguage);
    }
  }, [valueLanguage]);
  return (
    <>
      <View>
        <Text>{'Language'}</Text>
        <Space lineH={10} />
        <Picker
          containerStyle={{width: '100%'}}
          style={{
            borderColor: Color.brand.border,
            backgroundColor: Color.brand.f9,
          }}
          open={openLanguage}
          value={valueLanguage}
          items={language}
          setOpen={setOpenLanguage}
          setValue={setValueLanguage}
        />
      </View>
    </>
  );
}
