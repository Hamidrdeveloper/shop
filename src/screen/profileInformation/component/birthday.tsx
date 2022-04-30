import React from 'react';
import {Text, TextInput, View} from 'react-native';
import BirthdayController from '../../../components/birthday/BirthdayController';
import {Color} from '../../../infrastructuer/theme/colors.style';
import {Space} from '../../../infrastructuer/theme/space.style';

export default function Birthday() {
  return (
    <>
      <View>
        <Text>{'Birthday'}</Text>
        <Space lineH={10} />
        <BirthdayController
          label={''}
          name={'birth_date'}
          setFormError={undefined}
        />
      </View>
    </>
  );
}
